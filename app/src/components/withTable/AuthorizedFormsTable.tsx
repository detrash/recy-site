import { format } from 'date-fns';
import { Article, Check, Gear, X } from 'phosphor-react';
import { useEffect, useMemo, useState } from 'react';
import { FormsQuery } from 'src/graphql/generated/graphql';
import { FormDetailsModal } from '../FormDetailsModal';
import { Select } from '../Select';
import TableComponent, { ColumnProps } from '../Table';

export type FormsType = FormsQuery['forms'][0];

type AuthorizedFormsTableProps = {
  forms: FormsType[] | undefined;
  isLoading: boolean;
  hasError: boolean;
};

enum AuthorizationFilterTypes {
  ALL = 'All',
  CONCLUED = 'Conclued',
  PENDING = 'Pending',
}
const AUTHORIZATION_FILTERS = [
  AuthorizationFilterTypes.ALL,
  AuthorizationFilterTypes.CONCLUED,
  AuthorizationFilterTypes.PENDING,
];

const AuthorizedFormsTable: React.FC<AuthorizedFormsTableProps> = ({
  forms,
  isLoading,
  hasError,
}) => {
  const [page, setPage] = useState(1);
  const [rowsCount, setRowsCount] = useState(5);
  const [isModalOpen, setModalOpen] = useState(false);

  const [selectedForm, setSelectedForm] = useState<FormsType>();
  const [selectedFilter, setSelectedFilter] =
    useState<AuthorizationFilterTypes>(AuthorizationFilterTypes.PENDING);
  const [formsByFilter, setFormsByFilter] = useState<FormsType[] | undefined>(
    []
  );

  useEffect(() => {
    setPage(1);
    switch (selectedFilter) {
      case AuthorizationFilterTypes.CONCLUED: {
        setFormsByFilter(
          forms?.filter(
            (form) =>
              form.isFormAuthorizedByAdmin !== null &&
              form.isFormAuthorizedByAdmin !== undefined
          )
        );
        return;
      }
      case AuthorizationFilterTypes.PENDING: {
        setFormsByFilter(
          forms?.filter(
            (form) =>
              form.isFormAuthorizedByAdmin === null ||
              form.isFormAuthorizedByAdmin === undefined
          )
        );
        return;
      }
      default: {
        setFormsByFilter(forms);
      }
    }
  }, [forms, selectedFilter]);

  const dataByPage =
    formsByFilter?.slice((page - 1) * rowsCount, rowsCount * page) || [];

  const onFormDetails = (form: FormsType) => {
    setSelectedForm(form);
    setModalOpen(true);
  };

  const columns = useMemo<ColumnProps<FormsType>>(() => {
    return [
      {
        key: 'user',
        title: 'Issued By',
        cell(form) {
          return <p>{form.user.email}</p>;
        },
      },
      {
        key: 'createdAt',
        title: 'Created At',
        cell: (form) => {
          return <p>{format(new Date(form.createdAt), 'dd/MM/yyyy HH:mm')}</p>;
        },
      },
      {
        // Random property
        key: 'documents',
        title: 'Form details',
        cell(form) {
          return (
            <button
              onClick={() => onFormDetails(form)}
              className="btn btn-sm py-1 px-2 btn-ghost flex items-center gap-1 whitespace-nowrap"
            >
              <p>See Form Details</p>
              <Article className="hidden sm:block h-6 w-6" />
            </button>
          );
        },
      },
      {
        key: 'isFormAuthorizedByAdmin',
        title: 'Status',
        cell(form) {
          if (
            form.isFormAuthorizedByAdmin === null ||
            form.isFormAuthorizedByAdmin === undefined
          ) {
            return <h2 className="text-gray-400">Pending</h2>;
          }
          return (
            <>
              {form.isFormAuthorizedByAdmin ? (
                <div className="flex items-center gap-1 text-lime-600">
                  <Check className="h-6 w-6" aria-hidden="true" />
                  <p>Approved</p>
                </div>
              ) : (
                <div className="flex items-center gap-1 text-red-700">
                  <X className="h-6 w-6" aria-hidden="true" />
                  <p>Denied</p>
                </div>
              )}
            </>
          );
        },
      },
    ];
  }, []);

  return (
    <>
      <TableComponent<FormsType>
        allData={formsByFilter || []}
        columns={columns}
        hasSearch={false}
        filtersElement={
          <Select
            items={AUTHORIZATION_FILTERS}
            selected={selectedFilter}
            setSelected={setSelectedFilter}
          />
        }
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
        totalCount={formsByFilter?.length || 0}
        additionalFeature={(form) => {
          if (form.formMetadataUrl) {
            return (
              <a
                className="btn btn-sm btn-ghost py-1 px-2 btn-neutral flex items-center gap-1 whitespace-nowrap"
                href={form.formMetadataUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <p>NFT metadata</p>
                <Gear className="hidden sm:block h-6 w-6" />
              </a>
            );
          }
          return <></>;
        }}
      />

      {selectedForm && (
        <FormDetailsModal
          formId={selectedForm.id}
          isModalOpen={isModalOpen}
          setModalOpen={setModalOpen}
        />
      )}
    </>
  );
};

export default AuthorizedFormsTable;
