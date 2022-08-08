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

      {/* <div className="stat">
        <div className="stat-figure text-secondary">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="inline-block w-8 h-8 stroke-current"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 10V3L4 14h7v7l9-11h-7z"
            ></path>
          </svg>
        </div>
        <div className="stat-title">Page Views</div>
        <div className="stat-value text-secondary">2.6M</div>
        <div className="stat-desc">21% more than last month</div>
      </div>

      <div className="stat">
        <div className="stat-figure text-secondary">
          <div className="avatar online">
            <div className="w-16 rounded-full">
              <img src="https://placeimg.com/128/128/people" />
            </div>
          </div>
        </div>
        <div className="stat-value">86%</div>
        <div className="stat-title">Tasks done</div>
        <div className="stat-desc text-secondary">31 tasks remaining</div>
      </div> */}
    </div>
  );
};

export default StackedStats;
