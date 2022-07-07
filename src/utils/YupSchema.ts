import * as Yup from 'yup';

export type ContactFormSchema = {
  emailAddress: string;
  message: string;
  name: string;
};
export const contactFormSchema = Yup.object({
  emailAddress: Yup.string()
    .email('Please provide a valid email address')
    .required('Email is required'),
  message: Yup.string().required('Message is required'),
  name: Yup.string().required('Name is required'),
});
