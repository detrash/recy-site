import * as Yup from 'yup';
import { ProfileType } from '../graphql/generated/graphql';
const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

export type RecyFormSchema = {
  [wasteType: string]: {
    amount: number;
    videoFile?: File[];
    invoicesFiles: File[];
  };
};

export type UserRegistrationSchema = {
  name: string;
  phoneNumber: string;
  profileType: ProfileType;
};

export interface ProfileFormSchema extends UserRegistrationSchema {
  email: string;
}

export const userRegistrationSchema = Yup.object({
  phoneNumber: Yup.string()
    .matches(phoneRegExp, 'Phone number is not valid')
    .required('Phone is required'),
  profileType: Yup.string().required('Profile Type is required'),
  name: Yup.string()
    .required('Name is required')
    .max(50, 'Maximum of 50 characters'),
});
