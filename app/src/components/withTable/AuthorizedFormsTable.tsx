import classNames from 'classnames';
import { Article, Check, X } from 'phosphor-react';
import { useEffect, useMemo, useState } from 'react';
import {
  FormsQuery,
  useAuthorizeFormMutation,
} from 'src/graphql/generated/graphql';
import { FormDetailsModal } from '../FormDetailsModal';
import Modal from '../Modal';
import { Select } from '../Select';
import TableComponent, { ColumnProps } from '../Table';

export type FormsType = FormsQuery['forms'][0];

type AuthorizedFormsTableProps = {
  forms: FormsType[] | undefined;
  isLoading: boolean;
  hasError: boolean;
};

type AuthorizeFormActionType = {
  form: FormsType;
  status: boolean;
};

type AuthorizationModalProps = {
  authorizationForm: AuthorizeFormActionType;
  onCloseModal: () => void;
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

const AuthorizationModal: React.FC<AuthorizationModalProps> = ({
  authorizationForm,
  onCloseModal,
}) => {
  const [authorizeFormMutation, { loading }] = useAuthorizeFormMutation();

  const handleOnFormAuthorization = () => {
    authorizeFormMutation({
      variables: {
        FORM_ID: authorizationForm.form.id,
        FORM_STATUS: authorizationForm.status,
      },
    });
    onCloseModal();
  };

  return (
    <div>
      <p className="text-sm">
        You are about to{' '}
        {authorizationForm.status ? (
          <span className="text-success">approve</span>
        ) : (
          <span className="text-error">decline</span>
        )}{' '}
        the form issued by {authorizationForm?.form.user.email}. Are you sure?
      </p>

      <p className="text-sm font-bold">This action is irreversible</p>
      <div className="flex items-center justify-end gap-3 mt-4">
        <button onClick={onCloseModal} className="btn btn-outline">
          CANCEL
        </button>
        <button
          className={classNames('btn btn-primary text-white', {
            'btn-disabled loading': loading,
          })}
          onClick={handleOnFormAuthorization}
        >
          CONFIRM
        </button>
      </div>
    </div>
  );
};

const AuthorizedFormsTable: React.FC<AuthorizedFormsTableProps> = ({
  forms,
  isLoading,
  hasError,
}) => {
  const [page, setPage] = useState(1);
  const [rowsCount, setRowsCount] = useState(5);
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState<'Authorization' | 'Details'>(
    'Authorization'
  );

  const [authorizedFormAction, setAuthorizedFormAction] =
    useState<AuthorizeFormActionType>();
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

  const onFormAuthorization = (form: FormsType, status: boolean) => {
    setAuthorizedFormAction({
      form,
      status,
    });
    setModalType('Authorization');
    setModalOpen(true);
  };

  const onFormDetails = (form: FormsType) => {
    setAuthorizedFormAction({
      form,
      status: false,
    });
    setModalType('Details');
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
        // Random property
        key: 'glassKgs',
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
        headerPosition: 'center',
        cell(form) {
          if (
            form.isFormAuthorizedByAdmin === null ||
            form.isFormAuthorizedByAdmin === undefined
          ) {
            return (
              <div className="flex items-center justify-center gap-2 ml-auto">
                <button
                  onClick={() => onFormAuthorization(form, true)}
                  className="btn btn-sm btn-success"
                >
                  Approve
                </button>
                <button
                  onClick={() => onFormAuthorization(form, false)}
                  className="btn btn-sm btn-error"
                >
                  Decline
                </button>
              </div>
            );
          }
          return (
            <>
              {form.isFormAuthorizedByAdmin ? (
                <div className="flex items-center justify-center gap-1 text-success">
                  <Check className="h-6 w-6" aria-hidden="true" />
                  <p>Approved</p>
                </div>
              ) : (
                <div className="flex items-center justify-center gap-1 text-error">
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
      />

      <Modal
        isOpen={isModalOpen}
        onCloseModal={() => setModalOpen(false)}
        title={
          modalType === 'Authorization'
            ? 'Confirm form authorization'
            : `Form #${authorizedFormAction?.form.id}`
        }
        content={
          modalType === 'Authorization' ? (
            <AuthorizationModal
              authorizationForm={authorizedFormAction!}
              onCloseModal={() => setModalOpen(false)}
            />
          ) : (
            <FormDetailsModal formId={authorizedFormAction?.form.id!} />
          )
        }
        footer={
          modalType === 'Authorization' ? (
            <></>
          ) : (
            <button
              className="btn btn-primary text-white w-full sm:w-auto"
              onClick={() => setModalOpen(false)}
            >
              CLOSE
            </button>
          )
        }
      />
    </>
  );
};

export default AuthorizedFormsTable;
