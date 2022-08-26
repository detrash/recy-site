import { format } from 'date-fns';
import { Article } from 'phosphor-react';
import { lazy, Suspense, useMemo, useState } from 'react';
import { UsersQuery } from 'src/graphql/generated/graphql';
import Modal from '../Modal';
import TableComponent, { ColumnProps } from '../Table';
const UserFormDetails = lazy(() => import('./UserFormDetails'));

export type UsersType = UsersQuery['users'][0];

type ActiveUsersTableProps = {
  users: UsersType[] | undefined;
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
  const [isOpen, setIsOpen] = useState(false);

  const dataByPage =
    users?.slice((page - 1) * rowsCount, rowsCount * page) || [];

  const columns = useMemo<ColumnProps<UsersType>>(() => {
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
    <>
      <TableComponent<UsersType>
        additionalFeature={(user) => (
          <>
            <button
              className="btn btn-sm text-white h-auto py-1 px-2 btn-neutral flex items-center gap-1 whitespace-nowrap"
              onClick={() => setIsOpen(true)}
            >
              <p>Forms</p>
              <Article className="hidden sm:block h-6 w-6" />
            </button>
            {isOpen && (
              <Suspense fallback={<p></p>}>
                <Modal
                  isOpen={isOpen}
                  setIsOpen={setIsOpen}
                  title="User Form Details"
                  content={
                    <UserFormDetails
                      hasVideoAccess
                      formDetails={user.forms}
                      hasError={hasError}
                      isLoading={isLoading}
                    />
                  }
                />
              </Suspense>
            )}
          </>
        )}
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
    </>
  );
};

export default ActiveUsersTable;
