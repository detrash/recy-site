import classNames from 'classnames';
import { Form, FormikProps } from 'formik';
import { useTranslation } from 'next-i18next';
import * as R from 'ramda';
import { USER_ROLE_TYPES } from 'src/utils/constants';
import { UserRegistrationSchema } from 'src/utils/YupSchema';
import Input from '../Input';
import Radio from '../Radio';

interface RegisterUserProps extends FormikProps<UserRegistrationSchema> {
  isCreatingUser: boolean;
}

const RegisterUser: React.FC<RegisterUserProps> = ({
  errors,
  isCreatingUser,
  values,
  setFieldValue,
}) => {
  const { t } = useTranslation();
  return (
    <Form className="flex flex-col flex-1 gap-4 sm:gap-12">
      <section className="mb-3 sm:m-0">
        <h2 className="text-2xl sm:text-3xl mb-1 text-gray-800 font-bold antialiased leading-relaxed">
          {t('onboarding:complete_information')}
        </h2>
        <p className="text-sm text-gray-600">{t('onboarding:detrash_rules')}</p>
      </section>

      <section className="grid grid-cols-6 gap-3">
        <div className="col-span-6 sm:col-span-3">
          <Input
            label={t('common:preffered_name')}
            name="name"
            placeholder={t('common:type_name')}
            required
          />
        </div>
        <div className="col-span-6 sm:col-span-3">
          <Input
            label={t('common:phone_number')}
            name="phoneNumber"
            placeholder={t('common:type_number')}
            required
          />
        </div>
      </section>

      <section>
        <h2 className="text-sm pb-1 uppercase font-bold mb-4 border-b-[1px]">
          {t('onboarding:select_profile')}:
        </h2>
        <div className="grid sm:grid-cols-3 gap-3">
          {USER_ROLE_TYPES.map((userType) => (
            <Radio
              key={userType.key}
              id={userType.key}
              setValue={(value) => setFieldValue('profileType', value)}
              value={t(`common:${userType.key.toLowerCase()}`)}
              isActive={userType.key === values.profileType}
              imLabel={t('common:im')}
            />
          ))}
        </div>
      </section>

      <div className="flex items-end justify-center mt-auto">
        <button
          type="submit"
          disabled={!R.isEmpty(errors)}
          className={classNames(
            'btn btn-primary text-white no-animation w-full sm:w-auto',
            {
              'loading btn-disabled': isCreatingUser,
            }
          )}
        >
          {isCreatingUser
            ? t('onboarding:creating_user')
            : t('onboarding:confirm')}
        </button>
      </div>
    </Form>
  );
};

export default RegisterUser;
