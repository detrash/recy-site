import { Form, FormikProps } from 'formik';
import { ContactFormSchema } from '../../utils/YupSchema';
import Input from '../Input';

const ContactForm: React.FC<FormikProps<ContactFormSchema>> = () => {
  return (
    <section className="relative bg-gray-100">
      <div className="absolute left-0 right-0 m-auto w-px p-px h-20 bg-gray-200 transform -translate-y-1/2"></div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="py-12 md:py-20 mb-3">
          <div className="max-w-3xl mx-auto text-center pb-12 md:pb-16">
            <h1 className="h2 mb-4 text-neutral">Get in touch</h1>
            <p className="text-xl text-gray-600">Send us a message</p>
          </div>

          <Form>
            <div className="grid grid-cols-6 gap-3">
              <div className="col-span-6 sm:col-span-3">
                <Input
                  label="Name"
                  name="name"
                  placeholder="Enter your name"
                  required
                />
              </div>
              <div className="col-span-6 sm:col-span-3">
                <Input
                  label="Email"
                  name="emailAddress"
                  placeholder="Enter your email address"
                  required
                />
              </div>
              <div className="col-span-6">
                <Input
                  inputType="textarea"
                  label="Message"
                  name="message"
                  placeholder="Enter your message"
                  required
                />
              </div>
            </div>
            <div className="mt-6 w-full">
              <button className="btn btn-neutral block text-white w-full">
                Send
              </button>
            </div>
          </Form>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
