import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
  _Any: any;
  _FieldSet: any;
  link__Import: any;
};

export type CreateFormInput = {
  fileName?: InputMaybe<Scalars['String']>;
  glassKgs?: InputMaybe<Scalars['Float']>;
  metalKgs?: InputMaybe<Scalars['Float']>;
  organicKgs?: InputMaybe<Scalars['Float']>;
  paperKgs?: InputMaybe<Scalars['Float']>;
  plasticKgs?: InputMaybe<Scalars['Float']>;
};

export type CreateFormResponse = {
  __typename?: 'CreateFormResponse';
  form: Form;
  /** Field regarding informations on AWS S3 */
  s3?: Maybe<S3>;
};

export type CreateUserInput = {
  phoneNumber: Scalars['String'];
  profileType: ProfileType;
};

export type Form = {
  __typename?: 'Form';
  createdAt: Scalars['DateTime'];
  formId: Scalars['ID'];
  glassKgs?: Maybe<Scalars['Float']>;
  metalKgs?: Maybe<Scalars['Float']>;
  organicKgs?: Maybe<Scalars['Float']>;
  paperKgs?: Maybe<Scalars['Float']>;
  plasticKgs?: Maybe<Scalars['Float']>;
  recyclerVideoFileName?: Maybe<Scalars['String']>;
  user: User;
};

export type FormVideoUrl = {
  __typename?: 'FormVideoUrl';
  formVideoUrl: Scalars['String'];
};

export type Me = {
  __typename?: 'Me';
  /** Auth0 User ID */
  authUserId: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  forms: Array<Form>;
  lastLoginDate?: Maybe<Scalars['DateTime']>;
  permissions: Array<Permissions>;
  phoneNumber: Scalars['String'];
  profileType: ProfileType;
};

export type Mutation = {
  __typename?: 'Mutation';
  createForm: CreateFormResponse;
  createUser: User;
  updateUser: User;
};


export type MutationCreateFormArgs = {
  data: CreateFormInput;
};


export type MutationCreateUserArgs = {
  data: CreateUserInput;
};


export type MutationUpdateUserArgs = {
  data: UpdateUserInput;
};

export type Permissions = {
  __typename?: 'Permissions';
  type: Scalars['String'];
};

/** Represents the user type */
export enum ProfileType {
  Hodler = 'HODLER',
  Recycler = 'RECYCLER',
  WasteGenerator = 'WASTE_GENERATOR'
}

export type Query = {
  __typename?: 'Query';
  _service: _Service;
  form: Form;
  formVideoUrl: FormVideoUrl;
  forms: Array<Form>;
  me: Me;
  user: User;
  users: Array<User>;
};


export type QueryFormArgs = {
  formId: Scalars['String'];
};


export type QueryFormVideoUrlArgs = {
  formId: Scalars['String'];
};


export type QueryUserArgs = {
  userAuthId: Scalars['String'];
};

export type S3 = {
  __typename?: 'S3';
  createUrl?: Maybe<Scalars['String']>;
  fileName?: Maybe<Scalars['String']>;
};

export type UpdateUserInput = {
  phoneNumber?: InputMaybe<Scalars['String']>;
  profileType?: InputMaybe<ProfileType>;
};

export type User = {
  __typename?: 'User';
  /** Auth0 User ID */
  authUserId: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  forms: Array<Form>;
  lastLoginDate?: Maybe<Scalars['DateTime']>;
  phoneNumber: Scalars['String'];
  profileType: ProfileType;
};

export type _Service = {
  __typename?: '_Service';
  sdl?: Maybe<Scalars['String']>;
};

export type CreateUserMutationVariables = Exact<{
  profileType: ProfileType;
  phoneNumber: Scalars['String'];
}>;


export type CreateUserMutation = { __typename?: 'Mutation', createUser: { __typename?: 'User', authUserId: string, profileType: ProfileType, phoneNumber: string } };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me: { __typename?: 'Me', authUserId: string, profileType: ProfileType, phoneNumber: string, permissions: Array<{ __typename?: 'Permissions', type: string }> } };


export const CreateUserDocument = gql`
    mutation CreateUser($profileType: ProfileType!, $phoneNumber: String!) {
  createUser(data: {profileType: $profileType, phoneNumber: $phoneNumber}) {
    authUserId
    profileType
    phoneNumber
  }
}
    `;
export type CreateUserMutationFn = Apollo.MutationFunction<CreateUserMutation, CreateUserMutationVariables>;

/**
 * __useCreateUserMutation__
 *
 * To run a mutation, you first call `useCreateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUserMutation, { data, loading, error }] = useCreateUserMutation({
 *   variables: {
 *      profileType: // value for 'profileType'
 *      phoneNumber: // value for 'phoneNumber'
 *   },
 * });
 */
export function useCreateUserMutation(baseOptions?: Apollo.MutationHookOptions<CreateUserMutation, CreateUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateUserMutation, CreateUserMutationVariables>(CreateUserDocument, options);
      }
export type CreateUserMutationHookResult = ReturnType<typeof useCreateUserMutation>;
export type CreateUserMutationResult = Apollo.MutationResult<CreateUserMutation>;
export type CreateUserMutationOptions = Apollo.BaseMutationOptions<CreateUserMutation, CreateUserMutationVariables>;
export const MeDocument = gql`
    query Me {
  me {
    authUserId
    profileType
    phoneNumber
    permissions {
      type
    }
  }
}
    `;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;