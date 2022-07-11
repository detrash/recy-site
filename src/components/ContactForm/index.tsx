import { Form, FormikProps } from 'formik';
import Input from '@src/components/Input';
import { ContactFormSchema } from '@src/utils/YupSchema';
import { HomePageData } from '@src/graphql/queries';

interface CTAProps extends FormikProps<ContactFormSchema> {
  pageItems: HomePageData;
}

const ContactForm: React.FC<CTAProps> = ({ pageItems }) => {
  return (
    <section className="relative bg-gray-100">
      <div className="absolute left-0 right-0 m-auto w-px p-px h-20 bg-gray-200 transform -translate-y-1/2"></div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="py-12 md:py-20 mb-3">
          <div className="max-w-3xl mx-auto text-center pb-12 md:pb-16">
            <h1 className="h2 mb-4 text-neutral">
              {pageItems.formContactTitle}
            </h1>
            <p className="text-xl text-gray-600">
              {pageItems.formContactSubTitle}
            </p>
          </div>

          <Form>
            <div className="grid grid-cols-6 gap-3">
              <div className="col-span-6 sm:col-span-3">
                <Input
                  label="Name"
                  name="name"
                  placeholder={pageItems.namePlaceholder}
                  required
                />
              </div>
              <div className="col-span-6 sm:col-span-3">
                <Input
                  label="Email"
                  name="emailAddress"
                  placeholder={pageItems.emailPlaceholder}
                  required
                />
              </div>
              <div className="col-span-6">
                <Input
                  inputType="textarea"
                  label="Message"
                  name="message"
                  placeholder={pageItems.messagePlaceholder}
                  required
                />
              </div>
            </div>
            <div className="mt-6 w-full">
              <button className="btn btn-neutral block text-white w-full">
                {pageItems.formContactButton}
              </button>
            </div>
          </Form>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
