import { sub } from 'date-fns';
import { useEffect, useMemo, useState } from 'react';
import { useMeLazyQuery } from 'src/graphql/generated/graphql';
import { getResiduesSum } from 'src/utils/getResiduesSum';

export const useUserStatsComparison = () => {
  const [percentIncrease, setPercentIncreate] = useState<{
    [key: string]: number;
  }>({
    RESIDUES: 0,
    FORMS: 0,
  });

  const [fetchLatestForms, { loading: loadingNew }] = useMeLazyQuery({
    fetchPolicy: 'no-cache',
  });
  const [fetchOldestForms, { loading: loadingOld }] = useMeLazyQuery({
    fetchPolicy: 'no-cache',
  });

  const dates = useMemo(() => {
    const today = new Date();
    const past30Days = sub(today, { months: 1 });
    const past60Days = sub(past30Days, { months: 1 });

    return { today, past30Days, past60Days };
  }, []);

  useEffect(() => {
    const loadForms = async () => {
      const [{ data: newestData }, { data: oldestData }] = await Promise.all([
        fetchLatestForms({
          variables: {
            FILTERS: {
              createdAt: {
                lt: dates.today,
                gte: dates.past30Days,
              },
            },
          },
        }),

        fetchOldestForms({
          variables: {
            FILTERS: {
              createdAt: {
                lt: dates.past30Days,
                gte: dates.past60Days,
              },
            },
          },
        }),
      ]);

      if (newestData && oldestData) {
        const totalNewForms = newestData.me.forms.length || 1;
        const totalOldForms = oldestData.me.forms.length || 1;

        const formsPercentIncrease =
          ((totalNewForms - totalOldForms) / totalOldForms) * 100;
        const formsFormattedPercent = parseFloat(
          formsPercentIncrease.toFixed(1)
        );

        const totalNewResiduesAmount = getResiduesSum(newestData.me.forms) || 1;
        const totalOldResiduesAmount = getResiduesSum(oldestData.me.forms) || 1;

        const residuespercentIncrease =
          ((totalNewResiduesAmount - totalOldResiduesAmount) /
            totalOldResiduesAmount) *
          100;
        const residuesFormattedPercent = parseFloat(
          residuespercentIncrease.toFixed(1)
        );

        setPercentIncreate({
          FORMS: formsFormattedPercent,
          RESIDUES: residuesFormattedPercent,
        });
      }
    };

    if (dates) {
      loadForms();
    }
  }, [dates, fetchLatestForms, fetchOldestForms]);

  return { percentIncrease, isLoading: loadingNew || loadingOld };
};
