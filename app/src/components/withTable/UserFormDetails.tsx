import { useMemo, useState } from 'react';
import { ResidueType } from 'src/graphql/generated/graphql';
import { USER_WASTE_TYPES } from 'src/utils/constants';
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

  const columns = useMemo<ColumnProps<any>>(() => {
    return [
      {
        key: 'id',
        title: 'Form ID',
      },
      ...USER_WASTE_TYPES.map((wasteType) => {
        return {
          key: wasteType.key,
          title: `${wasteType.value} Kgs`,
          cell: (form: FormDetail) => {
            const residueAmount = form.documents.find(
              (document) => document.residueType === wasteType.key
            );
            return <p>{`${residueAmount?.amount || 0} Kgs`}</p>;
          },
        };
      }),
    ];
  }, []);

  const dataByPage =
    formDetails?.slice((page - 1) * rowsCount, rowsCount * page) || [];

  return (
    <TableComponent<FormDetail>
      allData={formDetails || []}
      columns={columns as any}
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
