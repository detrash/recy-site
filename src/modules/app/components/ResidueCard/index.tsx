import classNames from 'classnames';
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

type ResidueCardProps = {
  color: 'primary' | 'secondary' | 'neutral';
  Icon: React.ForwardRefExoticComponent<any>;
  percent: number;
  title: string;
  value: number;
};

const ResidueCard: React.FC<ResidueCardProps> = ({
  color,
  Icon,
  percent,
  title,
  value,
}) => {
  const getCurrentColor = () => {
    if (color === 'primary') return '#0B5FFF';
    if (color === 'secondary') return '#2b9500';
    return '#191919';
  };
  return (
    <main className="py-4 px-6 rounded-xl shadow-lg bg-white border">
      <section
        className={classNames(
          'relative w-12 h-12 rounded-full flex items-center justify-center mb-5',
          {
            'bg-primary': color === 'primary',
            'bg-secondary': color === 'secondary',
            'bg-neutral': color === 'neutral',
          }
        )}
      >
        <Icon className="h-8 w-8 text-white" />
      </section>
      <section className="flex items-center justify-between">
        <div className="font-bold text-gray-900">
          <p className="text-sm sm:text-base">{title}</p>
          <h1 className="text-lg sm:text-2xl">{`${value} Kgs`}</h1>
        </div>

        <div className="w-14 h-14 sm:w-20 sm:h-20 font-bold">
          <CircularProgressbar
            value={percent}
            text={`${percent || 0}%`}
            styles={buildStyles({
              textColor: '#000',
              trailColor: '#fff',
              pathColor: getCurrentColor(),
              textSize: 24,
            })}
          />
        </div>
      </section>
    </main>
  );
};

export default ResidueCard;
