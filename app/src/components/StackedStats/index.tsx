
import classNames from 'classnames';
import { useRouter } from 'next/router';
import { TrendDown, TrendUp } from 'phosphor-react';
import { ForwardRefExoticComponent } from 'react';
import SkeletonStackedStats from './Skeleton';

type StackedStatsProps = {
  isLoading?: boolean;
  percentIncrease?: {
    [key: string]: number;
  };
  stats: {
    id: string;
    label: string;
    value: string;
    icon: ForwardRefExoticComponent<any>;
  }[];
  comment?: string;
};

const StackedStats: React.FC<StackedStatsProps> = ({
  stats,
  percentIncrease,
  isLoading = false,
  comment,
}) => {
  const { locale } = useRouter();
  if (isLoading) {
    return <SkeletonStackedStats />;
  }

  const currentFormat = locale === 'en' ? 'en-US' : 'pt-BR';
  return (
    <div className="stats block divide-y-[1px] sm:inline-grid sm:divide-y-0 shadow w-full">
      {stats?.map((stat, index) => (
        <div className="stat" key={stat.label}>
          <div
            className={classNames('stat-figure', {
              'text-primary': index === 0,
              'text-secondary': index === 1,
            })}
          >
            <stat.icon className="inline-block w-8 h-8" />
          </div>
          <div className="stat-title">{stat.label}</div>
          <div
            className={classNames('stat-value', {
              'text-primary': index === 0,
              'text-secondary': index === 1,
            })}
          >
            {stat.id === 'CRECY'
              ? stat.value
              : new Intl.NumberFormat(currentFormat).format(+stat.value)}
          </div>
          {stat.id !== 'CRECY' && percentIncrease && (
            <div className="stat-desc">
              <span
                className={classNames('', {
                  'text-lime-700 font-bold': percentIncrease[stat.id] >= 0,
                  'text-red-700 font-bold': percentIncrease[stat.id] < 0,
                })}
              >
                {percentIncrease[stat.id] >= 0 ? (
                  <TrendUp className="inline-block w-5 h-5 mr-2" />
                ) : (
                  <TrendDown className="inline-block w-5 h-5 mr-2" />
                )}
                {new Intl.NumberFormat(currentFormat).format(
                  percentIncrease[stat.id]
                )}
                %
              </span>
              <span> {comment}</span>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default StackedStats;
