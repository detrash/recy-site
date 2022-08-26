import classNames from 'classnames';
import { ForwardRefExoticComponent } from 'react';
import SkeletonStackedStats from './Skeleton';

type StackedStatsProps = {
  isLoading: boolean;
  stats: {
    label: string;
    value: string;
    icon: ForwardRefExoticComponent<any>;
  }[];
};

const StackedStats: React.FC<StackedStatsProps> = ({ stats, isLoading }) => {
  if (isLoading) {
    return <SkeletonStackedStats />;
  }

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
            {stat.value}
          </div>
          <div className="stat-desc">0% more than last month</div>
        </div>
      ))}
    </div>
  );
};

export default StackedStats;
