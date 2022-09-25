import { useMemo, useState } from 'react';
import { ResidueType } from 'src/graphql/generated/graphql';
import TableComponent, { ColumnProps } from '../Table';
import { UsersType } from './ActiveUsersTable';

type FormDetail = UsersType['forms'][0];

type UserFormDetailsProps = {
  formDetails: FormDetail[];
  isLoading?: boolean;
  hasError?: boolean;
};

type ResidueCellProps = {
  amount: number;
  fileName: string | null | undefined;
  id: string;
  residueType: ResidueType;
};

const UserFormDetails: React.FC<UserFormDetailsProps> = ({
  formDetails,
  hasError = false,
  isLoading = false,
}) => {
  const [page, setPage] = useState(1);
  const [rowsCount, setRowsCount] = useState(5);

  const columns = useMemo<ColumnProps<FormDetail>>(() => {
    return [
      {
        key: 'id',
        title: 'Form ID',
      },
      {
        key: 'glassKgs',
        title: 'Glass Kgs',
        cell: (form) => {
          return <p>{`${form.glassKgs} Kgs`}</p>;
        },
      },
      {
        key: 'metalKgs',
        title: 'Metal Kgs',
        cell: (form) => {
          return <p>{`${form.metalKgs} Kgs`}</p>;
        },
      },
      {
        key: 'organicKgs',
        title: 'Organic Kgs',
        cell: (form) => {
          return <p>{`${form.organicKgs} Kgs`}</p>;
        },
      },
      {
        key: 'paperKgs',
        title: 'Paper Kgs',
        cell: (form) => {
          return <p>{`${form.paperKgs} Kgs`}</p>;
        },
      },
      {
        key: 'plasticKgs',
        title: 'Plastic Kgs',
        cell: (form) => {
          return <p>{`${form.plasticKgs} Kgs`}</p>;
        },
      },
    ];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const dataByPage =
    formDetails?.slice((page - 1) * rowsCount, rowsCount * page) || [];

  return (
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
  );
};

export default UserFormDetails;
