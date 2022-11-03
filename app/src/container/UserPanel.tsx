import { format } from 'date-fns';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { Article, Coin, Recycle, TrendUp } from 'phosphor-react';
import { useMemo } from 'react';
import StackedStats from 'src/components/StackedStats';
import { useRECYBalance } from 'src/hooks/useRECYBalance';
import { useUserStatsComparison } from 'src/hooks/useUserStatsComparison';
import { getResiduesSum } from 'src/utils/getResiduesSum';
import { useBalance } from 'wagmi';
import ResidueCard from '../components/ResidueCard';
import SubmitFormCard from '../components/SubmitFormCard';
import UserFormDetails from '../components/withTable/UserFormDetails';
import { MeQuery, ResidueType } from '../graphql/generated/graphql';
import { USER_WASTE_TYPES } from '../utils/constants';
import { UserPanelSkeleton } from './UserPanelSkeleton';

type PrivatePanelProps = {
  user: MeQuery | undefined;
  isLoading: boolean;
};

const UserPanel: React.FC<PrivatePanelProps> = ({ user, isLoading }) => {
  const { percentIncrease, isLoading: isLoadingStats } =
    useUserStatsComparison();

  const { t } = useTranslation();
  const { locale } = useRouter();

  const { data, isLoading: isLoadingRecyBalance } = useRECYBalance();

  const highlitedPanel = useMemo(() => {
    if (user) {
      const totalForms = user?.me.forms;
      const totalAmountResiduesReported = getResiduesSum(user.me.forms);
      return [
        {
          id: 'RESIDUES',
          icon: Recycle,
          label: t('dashboard:total_residues_reported'),
          value: String(totalAmountResiduesReported),
        },
        {
          id: 'FORMS',
          icon: Article,
          label: t('dashboard:total_forms_submitted'),
          value: String(totalForms?.length),
        },
        {
          id: 'CRECY',
          icon: Coin,
          label: t('dashboard:total_crecy_earned'),
          value: data ? Number(data.formatted).toFixed(2) : '-',
        },
      ];
    }

    return [];
  }, [user, t, data]);

  const highlitedItems = useMemo(() => {
    return user?.me?.forms?.reduce(
      (totalAmountResidue, currentForm) => {
        currentForm.documents.forEach((document) => {
          totalAmountResidue[document.residueType] += document.amount;
          totalAmountResidue.Total += document.amount;
        });

        return totalAmountResidue;
      },
      {
        [ResidueType.Glass]: 0,
        [ResidueType.Metal]: 0,
        [ResidueType.Organic]: 0,
        [ResidueType.Paper]: 0,
        [ResidueType.Plastic]: 0,
        Total: 0,
      }
    );
  }, [user?.me.forms]);

  const currentDateFormat = locale === 'en' ? 'MM/dd/yyyy' : 'dd/MM/yyyy';

  const lastLoginDate = user?.me.lastLoginDate
    ? format(new Date(user?.me.lastLoginDate), `${currentDateFormat} HH:mm`)
    : '';

  if (isLoading || !user || isLoadingStats) {
    return <UserPanelSkeleton />;
  }

  return (
    <div className="flex flex-col gap-3">
      <section className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-xl sm:text-3xl text-gray-900 font-bold">
          {`${t('dashboard:welcome_to_app')}${user?.me.name}`}
        </h2>
        <p className="text-gray-900 text-sm sm:text-base">{`${t(
          'dashboard:last_login'
        )}${lastLoginDate}`}</p>
      </section>
      <StackedStats
        percentIncrease={percentIncrease}
        stats={highlitedPanel}
        comment={t('dashboard:past_30_days')}
        isLoading={isLoadingRecyBalance}
      />
      <div className="grid grid-cols-6 gap-3">
        <div className="flex-1 col-span-6 sm:col-span-4">
          <h2 className="text-xl sm:text-2xl tracking-wide leading-relaxed font-bold mb-4">
            {t('dashboard:residues_reported')}
          </h2>
          <div className="grid grid-cols-6 gap-3">
            {highlitedItems &&
              Object.entries(highlitedItems).map(
                ([residueType, residueValue], index) => {
                  const currentItem = USER_WASTE_TYPES.find(
                    (wasteType) => wasteType.key === residueType
                  );
                  const percent = (
                    (residueValue / highlitedItems.Total) *
                    100
                  ).toFixed(1);
                  return (
                    <div
                      key={residueType}
                      className="col-span-3 sm:col-span-3 md:col-span-2"
                    >
                      {currentItem ? (
                        <ResidueCard
                          value={residueValue}
                          Icon={currentItem.Icon}
                          color={index % 2 === 0 ? 'primary' : 'secondary'}
                          percent={Number(percent)}
                          title={t(`common:${currentItem.value.toLowerCase()}`)}
                        />
                      ) : (
                        <ResidueCard
                          value={residueValue}
                          Icon={TrendUp}
                          color="neutral"
                          percent={100}
                          title="Total"
                        />
                      )}
                    </div>
                  );
                }
              )}
          </div>
        </div>

        <SubmitFormCard
          userProfileType={user?.me.profileType}
          buttonLabel={t('common:submit_report_button')}
          description={t('common:submit_report_description')}
          notAllowedLabel={t('common:not_allowed_submit_form')}
          title={t('common:submit_report_title')}
        />
      </div>
      <div className="py-4 px-6 bg-white shadow rounded-md flex-1">
        <h2 className="text-xl sm:text-2xl tracking-wide leading-relaxed font-bold mb-8">
          {t('dashboard:forms_submitted')}
        </h2>
        <UserFormDetails formDetails={user?.me.forms} />
      </div>
    </div>
  );
};

export default UserPanel;
