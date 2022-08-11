import { useFormVideoUrlLazyQuery } from '@modules/app/graphql/generated/graphql';
import Modal from '@shared/components/Modal';
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

const UserFormDetails: React.FC<UserFormDetailsProps> = ({
  formDetails,
  hasError,
  isLoading,
  isOpen,
  setIsOpen,
}) => {
  const [page, setPage] = useState(1);
  const [rowsCount, setRowsCount] = useState(5);
  const [useFormVideoUrlQuery, { loading }] = useFormVideoUrlLazyQuery();

  const loadVideoAndOpen = async (formId: string) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { data } = await useFormVideoUrlQuery({ variables: { formId } });

    if (data) {
      window.open(data.formVideoUrl.formVideoUrl, '_blank');
    }
  };

  const columns = useMemo<ColumnProps<FormDetail>>(() => {
    return [
      {
        key: 'glassKgs',
        title: 'Glass Kgs',
      },
      {
        key: 'metalKgs',
        title: 'Metal Kgs',
      },
      {
        key: 'organicKgs',
        title: 'Organic Kgs',
      },
      {
        key: 'paperKgs',
        title: 'Paper Kgs',
      },
      {
        key: 'plasticKgs',
        title: 'Plastic Kgs',
      },
      {
        key: 'recyclerVideoFileName',
        title: 'Uploaded Video',
        cell: (form) => {
          if (!form.recyclerVideoFileName) return <p></p>;
          return (
            <button
              className="btn btn-sm text-white h-auto py-1 px-2 btn-primary flex items-center gap-1 mx-auto"
              onClick={() => loadVideoAndOpen(form.id)}
            >
              <Download className="h-6 w-6" />
            </button>
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

export default UserFormDetails;
