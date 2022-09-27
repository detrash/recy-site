import classNames from 'classnames';
import { useState } from 'react';
import { useAuthorizeFormMutation } from 'src/graphql/generated/graphql';

type FormDetailsModalFooter = {
  formId: string;
  isFormAuthorizedByAdmin: boolean;
  isLoading: boolean;
  onFormAudit: () => void;
};

export const FormDetailsModalFooter: React.FC<FormDetailsModalFooter> = ({
  formId,
  isFormAuthorizedByAdmin,
  onFormAudit,
  isLoading,
}) => {
  const [authorizeFormMutation] = useAuthorizeFormMutation();

  const [authorizationStatus, setAuthorizationStatus] = useState<
    'Verified' | 'Not Verified'
  >();

  const hasValidatedForm =
    isFormAuthorizedByAdmin !== null && isFormAuthorizedByAdmin !== undefined;

  const handleOnFormAuthorization = async (status: boolean) => {
    setAuthorizationStatus(status ? 'Verified' : 'Not Verified');
    const { data } = await authorizeFormMutation({
      variables: {
        FORM_ID: formId,
        FORM_STATUS: status,
      },
    });
    if (data) {
      setTimeout(() => {
        onFormAudit();
      }, 1);
    }
  };

  const getFormStatusText = () => {
    if (hasValidatedForm) {
      if (isFormAuthorizedByAdmin) {
        return <span className="font-bold text-success">Approved</span>;
      }
      return <span className="font-bold text-error">Denied</span>;
    }
    return <span className="font-bold text-gray-400">Pending</span>;
  };

  if (isLoading) {
    return (
      <div className="animate-pulse flex flex-1 gap-2">
        <div className="rounded bg-slate-200 h-5 w-1/4"></div>
        <div className="rounded bg-slate-200 h-5 w-1/4"></div>
      </div>
    );
  }
  return (
    <section className="flex flex-1 justify-between items-center">
      <h2 className="text-sm sm:text-base">Status: {getFormStatusText()}</h2>

      {!hasValidatedForm && (
        <div className="flex items-center justify-center gap-2">
          <button
            onClick={() => handleOnFormAuthorization(false)}
            className={classNames('btn btn-error', {
              'btn-disabled': !!authorizationStatus,
              loading: authorizationStatus === 'Not Verified',
            })}
          >
            Decline
          </button>
          <button
            onClick={() => handleOnFormAuthorization(true)}
            className={classNames('btn btn-success', {
              'btn-disabled': !!authorizationStatus,
              loading: authorizationStatus === 'Verified',
            })}
          >
            Approve
          </button>
        </div>
      )}
    </section>
  );
};
