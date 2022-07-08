import ContactForm from '@src/components/ContactForm';
import {
  ContactFormSchema,
  contactFormSchema,
  INITIAL_FORM_VALUES,
} from '@src/utils/YupSchema';
import { Formik } from 'formik';

const PrivacyPolicy: React.FC = () => {
  const handleSubmitContactForm = (formData: ContactFormSchema) => {
    console.log(formData);
  };
  return (
    <main className="flex-grow">
      <section>
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="pt-32 pb-12 md:pt-40 md:pb-20">
            <div className="max-w-3xl mx-auto text-center pb-4">
              <h2 className="h2 mb-4">Privacy Policy</h2>
            </div>

            <div className="max-w-3xl mx-auto">
              <div className="gap-y-4 flex flex-col">
                <p className="text-xl font-semibold">
                  DeTrash Wallet for iOS & Android
                </p>
                <p className="text-sm">
                  DeTrash Wallet app is built as an Open Source app. This
                  SERVICE is provided by DeTrash at no cost and is intended for
                  use as is.
                </p>
                <p className="text-sm">
                  This page is used to inform visitors regarding our policies
                  with the collection, use, and disclosure of Personal
                  Information if anyone decided to use our Service.
                </p>
                <p className="text-sm">
                  If you choose to use our Service, then you agree to the
                  collection and use of information in relation to this policy.
                  The Personal Information that we collect is used for providing
                  and improving the Service. We will not use or share your
                  information with anyone except as described in this Privacy
                  Policy.
                </p>
                <p className="text-sm">
                  The terms used in this Privacy Policy have the same meanings
                  as in our Terms and Conditions, which is accessible at DeTrash
                  unless otherwise defined in this Privacy Policy.
                </p>
                <p className="text-xl font-semibold">
                  Information Collection and Use
                </p>

                <p className="text-sm">
                  The terms used in this Privacy Policy have the same meanings
                  as in our Terms and Conditions, which is accessible at DeTrash
                  unless otherwise defined in this Privacy Policy.
                </p>
                <p className="text-sm">
                  For a better experience, while using our Service, we may
                  require you to provide us with certain personally identifiable
                  information. The information that we request will be retained
                  by us and used as described in this privacy policy.
                </p>
                <p className="text-sm">
                  The app does use third party services that may collect
                  information used to identify you.
                </p>

                <p className="text-sm">
                  Link to privacy policy of third party service providers used
                  by the app - Google Play Services
                </p>

                <p className="text-xl font-semibold">Log Data</p>

                <p className="text-sm">
                  We want to inform you that whenever you use our Service, in a
                  case of an error in the app we collect data and information
                  (through third party products) on your phone called Log Data.
                  This Log Data may include information such as your device
                  Internet Protocol (&quot;IP&quot;) address, device name,
                  operating system version, the configuration of the app when
                  utilizing our Service, the time and date of your use of the
                  Service, and other statistics.
                </p>
                <p className="text-xl font-semibold">Cookies</p>
                <p className="text-sm">
                  Cookies are files with a small amount of data that are
                  commonly used as anonymous unique identifiers. These are sent
                  to your browser from the websites that you visit and are
                  stored on your device&apos;s internal memory.
                </p>
                <p className="text-sm">
                  This Service does not use these “cookies” explicitly. However,
                  the app may use third party code and libraries that use
                  &quot;cookies&quot; to collect information and improve their
                  services. You have the option to either accept or refuse these
                  cookies and know when a cookie is being sent to your device.
                  If you choose to refuse our cookies, you may not be able to
                  use some portions of this Service.
                </p>
                <p className="text-xl font-semibold">Service Providers</p>
                <p className="text-sm">
                  We may employ third-party companies and individuals due to the
                  following reasons:
                </p>
                <ul>
                  <li className="text-sm">To facilitate our Service;</li>
                  <li className="text-sm">
                    To provide the Service on our behalf;
                  </li>
                  <li className="text-sm">To facilitate our Service;</li>
                  <li className="text-sm">
                    To perform Service-related services; or
                  </li>
                  <li className="text-sm">
                    To assist us in analyzing how our Service is used.
                  </li>
                </ul>
                <p className="text-sm">
                  We want to inform users of this Service that these third
                  parties have access to your Personal Information. The reason
                  is to perform the tasks assigned to them on our behalf.
                  However, they are obligated not to disclose or use the
                  information for any other purpose.
                </p>

                <p className="text-xl font-semibold">Security</p>
                <p className="text-sm">
                  We value your trust in providing us your Personal Information,
                  thus we are striving to use commercially acceptable means of
                  protecting it. But remember that no method of transmission
                  over the internet, or method of electronic storage is 100%
                  secure and reliable, and we cannot guarantee its absolute
                  security.
                </p>
                <p className="text-xl font-semibold">Links to Other Sites</p>
                <p className="text-sm">
                  This Service may contain links to other sites. If you click on
                  a third-party link, you will be directed to that site. Note
                  that these external sites are not operated by us. Therefore,
                  we strongly advise you to review the Privacy Policy of these
                  websites. We have no control over and assume no responsibility
                  for the content, privacy policies, or practices of any
                  third-party sites or services.
                </p>

                <p className="text-xl font-semibold">Children&apos;s Privacy</p>
                <p className="text-sm">
                  These Services do not address anyone under the age of 18. We
                  do not knowingly collect personally identifiable information
                  from children under 18. In the case we discover that a child
                  under 18 has provided us with personal information, we
                  immediately delete this from our servers. If you are a parent
                  or guardian and you are aware that your child has provided us
                  with personal information, please contact us so that we will
                  be able to do necessary actions.
                </p>

                <p className="text-xl font-semibold">
                  Changes to This Privacy Policy
                </p>
                <p className="text-sm">
                  We may update our Privacy Policy from time to time. Thus, you
                  are advised to review this page periodically for any changes.
                  We will notify you of any changes by posting the new Privacy
                  Policy on this page. These changes are effective immediately
                  after they are posted on this page.
                </p>

                <p className="text-xl font-semibold">Contact Us</p>
                <p className="text-sm">
                  If you have any questions or suggestions about our Privacy
                  Policy, do not hesitate to contact us at{' '}
                  <u>
                    <a
                      className="text-primary"
                      href="mailto:phil@detrashtoken.com"
                    >
                      phil@detrashtoken.com
                    </a>
                  </u>
                  .
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Formik
        initialValues={INITIAL_FORM_VALUES}
        validationSchema={contactFormSchema}
        onSubmit={handleSubmitContactForm}
      >
        {(formikProps) => <ContactForm {...formikProps} />}
      </Formik>
    </main>
  );
};

export default PrivacyPolicy;
