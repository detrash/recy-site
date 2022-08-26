import StackedStats from '@modules/app/components/StackedStats';
import { format } from 'date-fns';
import { Article, Coin, Recycle, TrendUp } from 'phosphor-react';
import { useMemo } from 'react';
import ResidueCard from '../components/ResidueCard';
import SubmitFormCard from '../components/SubmitFormCard';
import UserFormDetails from '../components/withTable/UserFormDetails';
import { MeQuery, ResidueType } from '../graphql/generated/graphql';
import { USER_WASTE_TYPES } from '../utils/constants';

type PrivatePanelProps = {
  user: MeQuery | undefined;
};

const UserPanel: React.FC<PrivatePanelProps> = ({ user }) => {
  const highlitedPanel = useMemo(() => {
    const totalForms = user?.me.forms;
    const totalAmountResiduesReported = user?.me?.forms?.reduce(
      (totalAmount, currentForm) => {
        return (totalAmount +=
          currentForm.glassKgs +
          currentForm.metalKgs +
          currentForm.organicKgs +
          currentForm.paperKgs +
          currentForm.plasticKgs);
      },
      0
    );
    return [
      {
        icon: Recycle,
        label: 'Total Residues Kgs Reported',
        value: String(totalAmountResiduesReported),
      },
      {
        icon: Article,
        label: 'Total Forms Submitted',
        value: String(totalForms?.length),
      },
      {
        icon: Coin,
        label: 'Total cRECY Earned',
        value: '0',
      },
    ];
  }, [user?.me.forms]);

  const highlitedItems = useMemo(() => {
    return user?.me?.forms?.reduce(
      (totalAmountResidue, currentForm) => {
        totalAmountResidue.GLASS += currentForm.glassKgs;
        totalAmountResidue.METAL += currentForm.metalKgs;
        totalAmountResidue.ORGANIC += currentForm.organicKgs;
        totalAmountResidue.PAPER += currentForm.paperKgs;
        totalAmountResidue.PLASTIC += currentForm.plasticKgs;
        totalAmountResidue.Total +=
          currentForm.glassKgs +
          currentForm.metalKgs +
          currentForm.organicKgs +
          currentForm.paperKgs +
          currentForm.plasticKgs;

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

  const lastLoginDate = user?.me.lastLoginDate
    ? format(new Date(user?.me.lastLoginDate), 'MM/dd/yyyy HH:mm')
    : '';

  return (
    <div className="flex flex-col gap-3">
      <section className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-xl sm:text-3xl text-gray-900 font-bold">{`Welcome, ${user?.me.name}`}</h2>
        <p className="text-gray-900 text-sm sm:text-base">{`Last login: ${lastLoginDate}`}</p>
      </section>
      <StackedStats isLoading={false} stats={highlitedPanel} />
      <div className="grid grid-cols-6 gap-3">
        <div className="flex-1 col-span-6 sm:col-span-4">
          <h2 className="text-xl sm:text-2xl tracking-wide leading-relaxed font-bold mb-8">
            Total Residues reported so far
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
                          title={currentItem.value}
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

        <SubmitFormCard userProfileType={user?.me.profileType!} />
      </div>
      <div className="py-4 px-6 bg-white shadow rounded-md flex-1">
        <h2 className="text-xl sm:text-2xl tracking-wide leading-relaxed font-bold mb-8">
          Forms submitted
        </h2>
        <UserFormDetails formDetails={user?.me.forms!} hasVideoAccess={false} />
      </div>
    </div>
  );
};

export default UserPanel;
