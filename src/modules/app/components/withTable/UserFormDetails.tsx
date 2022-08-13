import {
  ResidueType,
  useFormVideoUrlLazyQuery,
} from '@modules/app/graphql/generated/graphql';
import Modal from '@shared/components/Modal';
import classNames from 'classnames';
import { Download } from 'phosphor-react';
import { useMemo, useState } from 'react';
import TableComponent, { ColumnProps } from '../Table';
import { UsersType } from './ActiveUsersTable';

type FormDetail = UsersType['forms'][0];

type UserFormDetailsProps = {
  formDetails: FormDetail[];
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  isLoading: boolean;
  hasError: boolean;
};

type ResidueCellProps = {
  amount: number;
  fileName: string | null | undefined;
  id: string;
  residueType: ResidueType;
};

const UserFormDetails: React.FC<UserFormDetailsProps> = ({
  formDetails,
  hasError,
  isLoading,
  isOpen,
  setIsOpen,
}) => {
  const [page, setPage] = useState(1);
  const [rowsCount, setRowsCount] = useState(5);

  const columns = useMemo<ColumnProps<FormDetail>>(() => {
    return [
      {
        key: 'glassKgs',
        title: 'Glass Kgs',
        cell: (form) => {
          return (
            <ResidueCell
              amount={form.glassKgs}
              fileName={form.glassVideoFileName}
              id={form.id}
              residueType={ResidueType.Glass}
            />
          );
        },
      },
      {
        key: 'metalKgs',
        title: 'Metal Kgs',
        cell: (form) => {
          return (
            <ResidueCell
              amount={form.metalKgs}
              fileName={form.metalVideoFileName}
              id={form.id}
              residueType={ResidueType.Metal}
            />
          );
        },
      },
      {
        key: 'organicKgs',
        title: 'Organic Kgs',
        cell: (form) => {
          return (
            <ResidueCell
              amount={form.organicKgs}
              fileName={form.organicVideoFileName}
              id={form.id}
              residueType={ResidueType.Organic}
            />
          );
        },
      },
      {
        key: 'paperKgs',
        title: 'Paper Kgs',
        cell: (form) => {
          return (
            <ResidueCell
              amount={form.paperKgs}
              fileName={form.paperVideoFileName}
              id={form.id}
              residueType={ResidueType.Paper}
            />
          );
        },
      },
      {
        key: 'plasticKgs',
        title: 'Plastic Kgs',
        cell: (form) => {
          return (
            <ResidueCell
              amount={form.plasticKgs}
              fileName={form.plasticVideoFileName}
              id={form.id}
              residueType={ResidueType.Plastic}
            />
          );
        },
      },
    ];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const dataByPage =
    formDetails?.slice((page - 1) * rowsCount, rowsCount * page) || [];

  return (
    <>
      <Modal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        title="User Form Details"
        content={
          <TableComponent<FormDetail>
            allData={formDetails || []}
            columns={columns}
            data={dataByPage}
            error={hasError}
            isLoading={isLoading}
            onPageChange={(newPage) => setPage(newPage)}
            page={page}
            rowsCount={rowsCount}
            setRowsCount={(newRowsCount) => {
              setPage(1);
              setRowsCount(newRowsCount);
            }}
            totalCount={formDetails?.length || 0}
          />
        }
      />
    </>
  );
};

const ResidueCell: React.FC<ResidueCellProps> = ({
  amount,
  fileName,
  id,
  residueType,
}) => {
  const [downloadedVideo, setDownloadedVideo] = useState<ResidueType>();
  const [useFormVideoUrlQuery, { loading }] = useFormVideoUrlLazyQuery();

  const loadVideoAndOpen = async (formId: string, residueType: ResidueType) => {
    setDownloadedVideo(residueType);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { data } = await useFormVideoUrlQuery({
      variables: { formId, residueType },
    });

    if (data) {
      window.open(data.formVideoUrlByResidue, '_blank');
    }
  };

  const isDownloadingVideo = downloadedVideo === residueType && loading;

  return (
    <div className="flex gap-1 items-center">
      <p>{`${amount} Kgs`}</p>
      {fileName && (
        <button
          className={classNames(
            'btn btn-sm text-white h-auto py-1 px-2 btn-primary',
            {
              'loading btn-disabled': isDownloadingVideo,
            }
          )}
          onClick={() => loadVideoAndOpen(id, residueType)}
        >
          <Download className="h-6 w-6" />
        </button>
      )}
    </div>
  );
};

export default UserFormDetails;
