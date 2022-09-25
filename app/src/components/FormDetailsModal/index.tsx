import classNames from 'classnames';
import { DownloadSimple, Warning } from 'phosphor-react';
import { useMemo, useState } from 'react';
import {
  DocumentType,
  ResidueType,
  useFormByIdQuery,
  useFormDocumentsUrlByResidueLazyQuery,
} from 'src/graphql/generated/graphql';
import { USER_WASTE_TYPES } from 'src/utils/constants';
import { CompactResidueCard } from '../CompactResidueCard';
import { FormDetailsModalSkeleton } from './Skeleton';

type FormActionButtonProps = {
  formId: string;
  isDisabled: boolean;
  documentType: DocumentType;
  residueType: ResidueType;
};

type Residues = {
  [residue: string]: {
    amount: number;
    videoFileName: string | null | undefined;
    invoiceFileName: string | null | undefined;
  };
};

const FormActionButton: React.FC<FormActionButtonProps> = ({
  formId,
  isDisabled,
  documentType,
  residueType,
}) => {
  const [useFormDocumentsUrlByResidueQuery, { loading: isDownloadingFile }] =
    useFormDocumentsUrlByResidueLazyQuery();

  const loadVideoAndOpen = async () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { data } = await useFormDocumentsUrlByResidueQuery({
      variables: { formId, residueType, documentType },
    });

    if (data) {
      window.open(data.formDocumentsUrlByResidue, '_blank');
    }
  };

  return (
    <button
      className={classNames(
        'btn btn-sm btn-primary text-white flex items-center gap-1',
        {
          'btn-disabled': isDisabled,
          'loading btn-disabled': isDownloadingFile,
        }
      )}
      onClick={loadVideoAndOpen}
    >
      <DownloadSimple className="w-6 h-6" />
      <p>Download {documentType}</p>
    </button>
  );
};

export const FormDetailsModal: React.FC<{ formId: string }> = ({ formId }) => {
  const [selectedResidueCard, setSelectedResidueCard] = useState<ResidueType>();

  const { data, loading } = useFormByIdQuery({
    variables: {
      FORM_ID: formId,
    },
  });

  const formattedResidues: Residues = useMemo(() => {
    if (data) {
      return {
        [ResidueType.Glass]: {
          amount: data.form.glassKgs,
          videoFileName: data.form.glassVideoFileName,
          invoiceFileName: data.form.glassInvoiceFileName,
        },
        [ResidueType.Metal]: {
          amount: data.form.metalKgs,
          videoFileName: data.form.metalVideoFileName,
          invoiceFileName: data.form.metalInvoiceFileName,
        },
        [ResidueType.Organic]: {
          amount: data.form.organicKgs,
          videoFileName: data.form.organicVideoFileName,
          invoiceFileName: data.form.organicInvoiceFileName,
        },
        [ResidueType.Paper]: {
          amount: data.form.paperKgs,
          videoFileName: data.form.paperVideoFileName,
          invoiceFileName: data.form.paperInvoiceFileName,
        },
        [ResidueType.Plastic]: {
          amount: data.form.plasticKgs,
          videoFileName: data.form.plasticVideoFileName,
          invoiceFileName: data.form.plasticInvoiceFileName,
        },
      };
    }
    return {} as Residues;
  }, [data]);

  if (!data || loading) {
    return <FormDetailsModalSkeleton />;
  }

  return (
    <div>
      <section className="grid sm:grid-cols-2 gap-2 mb-5">
        <p>
          Wallet Address:{' '}
          <span className="font-bold">
            {data.form.walletAddress || 'No wallet submitted'}
          </span>
        </p>

        <p>
          Email Address:{' '}
          <span className="font-bold">{data.form.user.email}</span>
        </p>
      </section>

      <div className="grid grid-cols-1 sm:flex sm:items-center gap-2 mb-2">
        <FormActionButton
          formId={formId}
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
          formId={formId}
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
