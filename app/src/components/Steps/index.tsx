import { memo } from 'react';
import { useFormContext } from 'src/context/formContext';

const Steps: React.FC = () => {
  const { wasteTypes, wasteTypesStep } = useFormContext();

  const currentStepIndex = wasteTypes.indexOf(wasteTypesStep);

  const processedSteps = wasteTypes.slice(0, currentStepIndex);
  const incomingSteps = wasteTypes.slice(currentStepIndex + 1);
  return (
    <section className="relative flex justify-center items-center gap-2">
      {processedSteps.map((processedStep) => (
        <span key={processedStep} className="flex h-3 w-3 relative">
          <span className="relative inline-flex rounded-full h-3 w-3 bg-success"></span>
        </span>
      ))}
      <span className="flex h-3 w-3 relative">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-3 w-3 bg-sky-500"></span>
      </span>
      {incomingSteps.map((incomingStep) => (
        <span key={incomingStep} className="flex h-3 w-3 relative">
          <span className="relative inline-flex rounded-full h-3 w-3 bg-gray-200"></span>
        </span>
      ))}
    </section>
  );
};

export default memo(Steps);
