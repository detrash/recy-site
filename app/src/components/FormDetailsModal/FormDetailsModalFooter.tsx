import classNames from 'classnames';
import { useTranslation } from 'next-i18next';
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
  const { t } = useTranslation();
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
        return (
          <span className="font-bold text-success">{t('admin:approved')}</span>
        );
      }
      return <span className="font-bold text-error">{t('admin:denied')}</span>;
    }
    return (
      <span className="font-bold text-gray-400">{t('admin:pending')}</span>
    );
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
      <h2 className="text-sm sm:text-base">
        {t('admin:status')}: {getFormStatusText()}
      </h2>

      {!hasValidatedForm && (
        <div className="flex items-center justify-center gap-2">
          <button
            onClick={() => handleOnFormAuthorization(false)}
            className={classNames('btn btn-error', {
              'btn-disabled': !!authorizationStatus,
              loading: authorizationStatus === 'Not Verified',
            })}
          >
            {t('admin:decline')}
          </button>
          <button
            onClick={() => handleOnFormAuthorization(true)}
            className={classNames('btn btn-success', {
              'btn-disabled': !!authorizationStatus,
              loading: authorizationStatus === 'Verified',
            })}
          >
            {t('admin:approve')}
          </button>
        </div>
      )}
    </section>
  );
};
