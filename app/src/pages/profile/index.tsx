import { Formik } from 'formik';
import { toast } from 'react-toastify';
import DashboardHeader from 'src/components/Header';
import ProfilePanel from 'src/container/ProfilePanel';
import {
  MeQuery,
  ProfileType,
  useUpdateUserMutation,
} from 'src/graphql/generated/graphql';
import { getAdminAccess } from 'src/utils/getAdminAccess';
import { userSSRMethods } from 'src/utils/userSSRMethods';
import { ProfileFormSchema, userRegistrationSchema } from 'src/utils/YupSchema';

interface ProfileProps {
  data: MeQuery;
}

const Profile: React.FC<ProfileProps> = ({ data }) => {
  const isAdmin = getAdminAccess(data!);

  const [updateUser, { loading }] = useUpdateUserMutation();

  const handleUpdateUser = async (formData: ProfileFormSchema) => {
    const { data: updatedUser } = await updateUser({ variables: formData });

    if (updatedUser) {
      toast.success('User updated sucessfully', {
        position: 'bottom-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  return (
    <main className="flex flex-col min-h-screen">
      <DashboardHeader
        userProfileType={data?.me.profileType!}
        isAdmin={isAdmin}
      />
      <section className="sm:py-12 bg-gray-100 flex flex-1 justify-center">
        <div className="sm:max-w-2xl max-h-full flex flex-1 bg-white p-4 sm:p-8 sm:rounded-xl sm:shadow-2xl sm:border-2">
          <Formik
            initialValues={{
              email: '',
              name: '',
              phoneNumber: '',
              profileType: '' as ProfileType,
            }}
            validationSchema={userRegistrationSchema}
            onSubmit={handleUpdateUser}
          >
            {(formikProps) => (
              <ProfilePanel
                isUpdatingUser={loading}
                data={data}
                {...formikProps}
              />
            )}
          </Formik>
        </div>
      </section>
    </main>
  );
};

export const getServerSideProps = userSSRMethods.checkUserAccess;

export default Profile;
