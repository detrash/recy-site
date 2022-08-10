import { ProfileType } from '@modules/app/graphql/generated/graphql';
import { format } from 'date-fns';
import { useMemo, useState } from 'react';
import TableComponent, { ColumnProps } from '../Table';

type UsersQuery = {
  id: string;
  email: string;
  profileType: ProfileType;
  lastLoginDate?: any | null;
  phoneNumber: string;
};

type ActiveUsersTableProps = {
  users: UsersQuery[] | undefined;
  isLoading: boolean;
  hasError: boolean;
};

const ActiveUsersTable: React.FC<ActiveUsersTableProps> = ({
  users,
  isLoading,
  hasError,
}) => {
  const [page, setPage] = useState(1);
  const [rowsCount, setRowsCount] = useState(5);

  const dataByPage =
    users?.slice((page - 1) * rowsCount, rowsCount * page) || [];

  const columns = useMemo<ColumnProps<UsersQuery>>(() => {
    return [
      {
        key: 'email',
        title: 'Email',
      },
      {
        key: 'profileType',
        title: 'User Type',
      },
      {
        key: 'phoneNumber',
        title: 'Phone Number',
      },
      {
        key: 'lastLoginDate',
        title: 'Last Login',
        cell: (user) => {
          if (!user?.lastLoginDate) {
            return <p>Never</p>;
          }

          return (
            <p>{format(new Date(user.lastLoginDate), 'MM/dd/yyyy HH:mm')}</p>
          );
        },
      },
    ];
  }, []);

  return (
    <TableComponent<UsersQuery>
      allData={users || []}
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
      totalCount={users?.length || 0}
    />
  );
};

export default ActiveUsersTable;
