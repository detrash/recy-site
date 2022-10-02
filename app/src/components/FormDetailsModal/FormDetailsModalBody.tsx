import dynamic from 'next/dynamic';
import { Warning } from 'phosphor-react';
import { useState } from 'react';
import { FormByIdQuery } from 'src/graphql/generated/graphql';
import { USER_WASTE_TYPES } from 'src/utils/constants';
import { CompactResidueCard } from '../CompactResidueCard';
import { FormDetailsModalSkeleton } from './Skeleton';

const FormActionButton = dynamic(() => import('./FormActionButton'), {
  ssr: false,
});

export type ResidueDocument = Partial<FormByIdQuery['form']['documents'][0]>;

type FormDetailsModalBodyProps = {
  formData: FormByIdQuery | undefined;
  isLoading: boolean;
};

export const FormDetailsModalBody: React.FC<FormDetailsModalBodyProps> = ({
  formData,
  isLoading,
}) => {
  const [selectedResidueCard, setSelectedResidueCard] =
    useState<ResidueDocument>();

  if (!formData || isLoading) {
    return <FormDetailsModalSkeleton />;
  }

  const formattedResidues: ResidueDocument[] = USER_WASTE_TYPES.map(
    (wasteType) => {
      const currentWaste = formData.form.documents.find(
        (document) => document.residueType === wasteType.key
      );

      if (currentWaste) return currentWaste;

      return {
        amount: 0,
        residueType: wasteType.key,
        invoicesFileName: [],
        videoFileName: null,
      };
    }
  );

  return (
    <div>
      <section className="grid sm:grid-cols-2 gap-2 mb-5 overflow-auto">
        <p>
          Wallet Address:{' '}
          <span className="font-bold">
            {formData.form.walletAddress || 'No wallet submitted'}
          </span>
        </p>

        <p>
          Email Address:{' '}
          <span className="font-bold">{formData.form.user.email}</span>
        </p>
      </section>

      <div className="grid grid-cols-1 sm:flex sm:items-center gap-2 mb-2">
        <FormActionButton
          formId={formData.form.id}
          residueType={selectedResidueCard?.residueType!}
          documentType="VIDEO"
          isDisabled={
            !(selectedResidueCard && selectedResidueCard?.videoFileName)
          }
        />
        <FormActionButton
          formId={formData.form.id}
          residueType={selectedResidueCard?.residueType!}
          documentType="INVOICES"
          isDisabled={
            !(
              selectedResidueCard &&
              selectedResidueCard?.invoicesFileName?.length
            )
          }
        />
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        {formattedResidues &&
          formattedResidues.map((residue) => (
            <CompactResidueCard
              key={residue.residueType}
              isActive={
                selectedResidueCard?.residueType === residue.residueType
              }
              setValue={setSelectedResidueCard}
              residueData={residue}
            />
          ))}
      </div>
      <div className="flex items-center gap-2 my-2">
        <Warning className="text-warning w-6 h-6" weight="fill" />
        <h2 className="text-sm">
          Select the residue type above in order to download Video and Invoices
          if available
        </h2>
      </div>
    </div>
  );
};
