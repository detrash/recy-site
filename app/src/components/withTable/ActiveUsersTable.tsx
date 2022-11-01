import { format } from 'date-fns';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { Article } from 'phosphor-react';
import { useMemo, useState } from 'react';
import { UsersQuery } from 'src/graphql/generated/graphql';
import Modal from '../Modal';
import TableComponent, { ColumnProps } from '../Table';
import UserFormDetails from './UserFormDetails';

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
  const { t } = useTranslation();
  const { locale } = useRouter();

  const [page, setPage] = useState(1);
  const [rowsCount, setRowsCount] = useState(5);
  const [currentUser, setCurrentUser] = useState<UsersType>();

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
        title: t('admin:user_type'),
        cell: (user) => {
          return <p>{t(`common:${user.profileType.toLowerCase()}`)}</p>;
        },
      },
      {
        key: 'phoneNumber',
        title: t('admin:phone_number'),
      },
      {
        key: 'lastLoginDate',
        title: t('admin:last_login'),
        cell: (user) => {
          if (!user?.lastLoginDate) {
            return <p>Never</p>;
          }
          const currentLocale = locale === 'en' ? 'MM/dd/yyyy' : 'dd/MM/yyyy';
          return (
            <p>
              {format(new Date(user.lastLoginDate), `${currentLocale} HH:mm`)}
            </p>
          );
        },
      },
    ];
  }, [locale, t]);

  return (
    <>
      <TableComponent<UsersType>
        additionalFeature={(user) => (
          <button
            className="btn btn-sm text-white h-auto py-1 px-2 btn-neutral flex items-center gap-1 whitespace-nowrap"
            onClick={() => setCurrentUser(user)}
          >
            <p>{t('admin:forms')}</p>
            <Article className="hidden sm:block h-6 w-6" />
          </button>
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

      {currentUser && (
        <Modal
          isOpen={!!currentUser}
          onCloseModal={() => setCurrentUser(undefined)}
          title={t('admin:user_form_details')}
          content={
            <UserFormDetails
              formDetails={currentUser.forms}
              hasError={hasError}
              isLoading={isLoading}
            />
          }
          footer={<></>}
        />
      )}
    </>
  );
};

export default ActiveUsersTable;
