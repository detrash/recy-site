import * as Yup from 'yup';
import { ProfileType } from '../graphql/generated/graphql';
const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

export type RecyFormSchema = {
  [wasteType: string]: {
    amount: number;
    videoFile?: File;
  };
};

export type UserRegistrationSchema = {
  phoneNumber: string;
  profileType: ProfileType;
};

export const userRegistrationSchema = Yup.object({
  phoneNumber: Yup.string()
    .matches(phoneRegExp, 'Phone number is not valid')
    .required('Phone is required'),
  profileType: Yup.string().required('Profile Type is required'),
});