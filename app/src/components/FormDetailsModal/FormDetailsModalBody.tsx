import { Warning } from 'phosphor-react';
import { useMemo, useState } from 'react';
import {
  DocumentType,
  FormByIdQuery,
  ResidueType,
} from 'src/graphql/generated/graphql';
import { USER_WASTE_TYPES } from 'src/utils/constants';
import { CompactResidueCard } from '../CompactResidueCard';
import { FormActionButton } from './FormActionButton';
import { FormDetailsModalSkeleton } from './Skeleton';

type Residues = {
  [residue: string]: {
    amount: number;
    videoFileName: string | null | undefined;
    invoiceFileName: string | null | undefined;
  };
};

type FormDetailsModalBodyProps = {
  formData: FormByIdQuery | undefined;
  isLoading: boolean;
};

export const FormDetailsModalBody: React.FC<FormDetailsModalBodyProps> = ({
  formData,
  isLoading,
}) => {
  const [selectedResidueCard, setSelectedResidueCard] = useState<ResidueType>();

  const formattedResidues: Residues = useMemo(() => {
    if (formData) {
      return {
        [ResidueType.Glass]: {
          amount: formData.form.glassKgs,
          videoFileName: formData.form.glassVideoFileName,
          invoiceFileName: formData.form.glassInvoiceFileName,
        },
        [ResidueType.Metal]: {
          amount: formData.form.metalKgs,
          videoFileName: formData.form.metalVideoFileName,
          invoiceFileName: formData.form.metalInvoiceFileName,
        },
        [ResidueType.Organic]: {
          amount: formData.form.organicKgs,
          videoFileName: formData.form.organicVideoFileName,
          invoiceFileName: formData.form.organicInvoiceFileName,
        },
        [ResidueType.Paper]: {
          amount: formData.form.paperKgs,
          videoFileName: formData.form.paperVideoFileName,
          invoiceFileName: formData.form.paperInvoiceFileName,
        },
        [ResidueType.Plastic]: {
          amount: formData.form.plasticKgs,
          videoFileName: formData.form.plasticVideoFileName,
          invoiceFileName: formData.form.plasticInvoiceFileName,
        },
      };
    }
    return {} as Residues;
  }, [formData]);

  if (!formData || isLoading) {
    return <FormDetailsModalSkeleton />;
  }

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
          residueType={selectedResidueCard!}
          documentType={DocumentType.Video}
          isDisabled={
            !(
              selectedResidueCard &&
              formattedResidues[selectedResidueCard]?.videoFileName
            )
          }
        />
        <FormActionButton
          formId={formData.form.id}
          residueType={selectedResidueCard!}
          documentType={DocumentType.Invoice}
          isDisabled={
            !(
              selectedResidueCard &&
              formattedResidues[selectedResidueCard]?.invoiceFileName
            )
          }
        />
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        {formattedResidues &&
          USER_WASTE_TYPES.map((wasteType) => (
            <CompactResidueCard
              key={wasteType.key}
              isActive={selectedResidueCard === wasteType.key}
              setValue={setSelectedResidueCard}
              residueType={formattedResidues[wasteType.key]}
              wasteInfo={wasteType}
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
