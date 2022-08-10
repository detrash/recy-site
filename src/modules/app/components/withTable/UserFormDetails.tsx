import Modal from '@shared/components/Modal';
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
          return <button className="btn btn-primary">Download Video</button>;
        },
      },
    ];
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
