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

export type AggregateFormByUserProfileResponse = {
  __typename?: 'AggregateFormByUserProfileResponse';
  data: AggregateFormData;
  id: ProfileType;
};

export type AggregateFormData = {
  __typename?: 'AggregateFormData';
  glassKgs?: Maybe<Scalars['Float']>;
  metalKgs?: Maybe<Scalars['Float']>;
  organicKgs?: Maybe<Scalars['Float']>;
  paperKgs?: Maybe<Scalars['Float']>;
  plasticKgs?: Maybe<Scalars['Float']>;
};

export type CreateFormInput = {
  GLASS?: InputMaybe<ResidueInput>;
  METAL?: InputMaybe<ResidueInput>;
  ORGANIC?: InputMaybe<ResidueInput>;
  PAPER?: InputMaybe<ResidueInput>;
  PLASTIC?: InputMaybe<ResidueInput>;
};

export type CreateFormResponse = {
  __typename?: 'CreateFormResponse';
  form: Form;
  /** Field regarding informations on AWS S3 */
  s3?: Maybe<Array<S3>>;
};

export type CreateUserInput = {
  email: Scalars['String'];
  phoneNumber: Scalars['String'];
  profileType: ProfileType;
};

export type Form = {
  __typename?: 'Form';
  createdAt: Scalars['DateTime'];
  glassKgs?: Maybe<Scalars['Float']>;
  glassVideoFileName?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  metalKgs?: Maybe<Scalars['Float']>;
  metalVideoFileName?: Maybe<Scalars['String']>;
  organicKgs?: Maybe<Scalars['Float']>;
  organicVideoFileName?: Maybe<Scalars['String']>;
  paperKgs?: Maybe<Scalars['Float']>;
  paperVideoFileName?: Maybe<Scalars['String']>;
  plasticKgs?: Maybe<Scalars['Float']>;
  plasticVideoFileName?: Maybe<Scalars['String']>;
  user: User;
};

export type Me = {
  __typename?: 'Me';
  /** Auth0 User ID */
  authUserId: Scalars['String'];
  createdAt: Scalars['DateTime'];
  email: Scalars['String'];
  forms: Array<Form>;
  id: Scalars['ID'];
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
  aggregateFormByUserProfile: Array<AggregateFormByUserProfileResponse>;
  form: Form;
  formVideoUrlByResidue: Scalars['String'];
  forms: Array<Form>;
  me: Me;
  user: User;
  users: Array<User>;
};


export type QueryFormArgs = {
  formId: Scalars['String'];
};


export type QueryFormVideoUrlByResidueArgs = {
  formId: Scalars['String'];
  residueType: ResidueType;
};


export type QueryUserArgs = {
  userAuthId: Scalars['String'];
};

export type ResidueInput = {
  amount?: InputMaybe<Scalars['Float']>;
  videoFileName?: InputMaybe<Scalars['String']>;
};

/** Represents the residue type */
export enum ResidueType {
  Glass = 'GLASS',
  Metal = 'METAL',
  Organic = 'ORGANIC',
  Paper = 'PAPER',
  Plastic = 'PLASTIC'
}

export type S3 = {
  __typename?: 'S3';
  createUrl: Scalars['String'];
  fileName: Scalars['String'];
  residue: ResidueType;
};

export type UpdateUserInput = {
  email?: InputMaybe<Scalars['String']>;
  phoneNumber?: InputMaybe<Scalars['String']>;
  profileType?: InputMaybe<ProfileType>;
};

export type User = {
  __typename?: 'User';
  /** Auth0 User ID */
  authUserId: Scalars['String'];
  createdAt: Scalars['DateTime'];
  email: Scalars['String'];
  forms: Array<Form>;
  id: Scalars['ID'];
  lastLoginDate?: Maybe<Scalars['DateTime']>;
  phoneNumber: Scalars['String'];
  profileType: ProfileType;
};

export type _Service = {
  __typename?: '_Service';
  sdl?: Maybe<Scalars['String']>;
};

export type CreateFormMutationVariables = Exact<{
  GLASS?: InputMaybe<ResidueInput>;
  METAL?: InputMaybe<ResidueInput>;
  ORGANIC?: InputMaybe<ResidueInput>;
  PAPER?: InputMaybe<ResidueInput>;
  PLASTIC?: InputMaybe<ResidueInput>;
}>;


export type CreateFormMutation = { __typename?: 'Mutation', createForm: { __typename?: 'CreateFormResponse', s3?: Array<{ __typename?: 'S3', createUrl: string, fileName: string, residue: ResidueType }> | null } };

export type CreateUserMutationVariables = Exact<{
  profileType: ProfileType;
  phoneNumber: Scalars['String'];
  email: Scalars['String'];
}>;


export type CreateUserMutation = { __typename?: 'Mutation', createUser: { __typename?: 'User', authUserId: string, email: string, profileType: ProfileType, phoneNumber: string } };

export type AggregateFormTypesQueryVariables = Exact<{ [key: string]: never; }>;


export type AggregateFormTypesQuery = { __typename?: 'Query', aggregateFormByUserProfile: Array<{ __typename?: 'AggregateFormByUserProfileResponse', id: ProfileType, data: { __typename?: 'AggregateFormData', glassKgs?: number | null, metalKgs?: number | null, organicKgs?: number | null, paperKgs?: number | null, plasticKgs?: number | null } }> };

export type FormVideoUrlQueryVariables = Exact<{
  formId: Scalars['String'];
  residueType: ResidueType;
}>;


export type FormVideoUrlQuery = { __typename?: 'Query', formVideoUrlByResidue: string };

export type FormsQueryVariables = Exact<{ [key: string]: never; }>;


export type FormsQuery = { __typename?: 'Query', forms: Array<{ __typename?: 'Form', glassKgs?: number | null, glassVideoFileName?: string | null, metalKgs?: number | null, metalVideoFileName?: string | null, organicKgs?: number | null, organicVideoFileName?: string | null, paperKgs?: number | null, paperVideoFileName?: string | null, plasticKgs?: number | null, plasticVideoFileName?: string | null, user: { __typename?: 'User', phoneNumber: string, email: string } }> };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me: { __typename?: 'Me', authUserId: string, email: string, profileType: ProfileType, phoneNumber: string, permissions: Array<{ __typename?: 'Permissions', type: string }> } };

export type UsersQueryVariables = Exact<{ [key: string]: never; }>;


export type UsersQuery = { __typename?: 'Query', users: Array<{ __typename?: 'User', id: string, email: string, profileType: ProfileType, lastLoginDate?: any | null, phoneNumber: string, forms: Array<{ __typename?: 'Form', id: string, glassKgs?: number | null, glassVideoFileName?: string | null, metalKgs?: number | null, metalVideoFileName?: string | null, organicKgs?: number | null, organicVideoFileName?: string | null, paperKgs?: number | null, paperVideoFileName?: string | null, plasticKgs?: number | null, plasticVideoFileName?: string | null }> }> };


export const CreateFormDocument = gql`
    mutation CreateForm($GLASS: ResidueInput, $METAL: ResidueInput, $ORGANIC: ResidueInput, $PAPER: ResidueInput, $PLASTIC: ResidueInput) {
  createForm(
    data: {GLASS: $GLASS, METAL: $METAL, ORGANIC: $ORGANIC, PAPER: $PAPER, PLASTIC: $PLASTIC}
  ) {
    s3 {
      createUrl
      fileName
      residue
    }
  }
}
    `;
export type CreateFormMutationFn = Apollo.MutationFunction<CreateFormMutation, CreateFormMutationVariables>;

/**
 * __useCreateFormMutation__
 *
 * To run a mutation, you first call `useCreateFormMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateFormMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createFormMutation, { data, loading, error }] = useCreateFormMutation({
 *   variables: {
 *      GLASS: // value for 'GLASS'
 *      METAL: // value for 'METAL'
 *      ORGANIC: // value for 'ORGANIC'
 *      PAPER: // value for 'PAPER'
 *      PLASTIC: // value for 'PLASTIC'
 *   },
 * });
 */
export function useCreateFormMutation(baseOptions?: Apollo.MutationHookOptions<CreateFormMutation, CreateFormMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateFormMutation, CreateFormMutationVariables>(CreateFormDocument, options);
      }
export type CreateFormMutationHookResult = ReturnType<typeof useCreateFormMutation>;
export type CreateFormMutationResult = Apollo.MutationResult<CreateFormMutation>;
export type CreateFormMutationOptions = Apollo.BaseMutationOptions<CreateFormMutation, CreateFormMutationVariables>;
export const CreateUserDocument = gql`
    mutation CreateUser($profileType: ProfileType!, $phoneNumber: String!, $email: String!) {
  createUser(
    data: {profileType: $profileType, phoneNumber: $phoneNumber, email: $email}
  ) {
    authUserId
    email
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
 *      email: // value for 'email'
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
export const AggregateFormTypesDocument = gql`
    query AggregateFormTypes {
  aggregateFormByUserProfile {
    id
    data {
      glassKgs
      metalKgs
      organicKgs
      paperKgs
      plasticKgs
    }
  }
}
    `;

/**
 * __useAggregateFormTypesQuery__
 *
 * To run a query within a React component, call `useAggregateFormTypesQuery` and pass it any options that fit your needs.
 * When your component renders, `useAggregateFormTypesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAggregateFormTypesQuery({
 *   variables: {
 *   },
 * });
 */
export function useAggregateFormTypesQuery(baseOptions?: Apollo.QueryHookOptions<AggregateFormTypesQuery, AggregateFormTypesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AggregateFormTypesQuery, AggregateFormTypesQueryVariables>(AggregateFormTypesDocument, options);
      }
export function useAggregateFormTypesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AggregateFormTypesQuery, AggregateFormTypesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AggregateFormTypesQuery, AggregateFormTypesQueryVariables>(AggregateFormTypesDocument, options);
        }
export type AggregateFormTypesQueryHookResult = ReturnType<typeof useAggregateFormTypesQuery>;
export type AggregateFormTypesLazyQueryHookResult = ReturnType<typeof useAggregateFormTypesLazyQuery>;
export type AggregateFormTypesQueryResult = Apollo.QueryResult<AggregateFormTypesQuery, AggregateFormTypesQueryVariables>;
export const FormVideoUrlDocument = gql`
    query FormVideoUrl($formId: String!, $residueType: ResidueType!) {
  formVideoUrlByResidue(formId: $formId, residueType: $residueType)
}
    `;

/**
 * __useFormVideoUrlQuery__
 *
 * To run a query within a React component, call `useFormVideoUrlQuery` and pass it any options that fit your needs.
 * When your component renders, `useFormVideoUrlQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFormVideoUrlQuery({
 *   variables: {
 *      formId: // value for 'formId'
 *      residueType: // value for 'residueType'
 *   },
 * });
 */
export function useFormVideoUrlQuery(baseOptions: Apollo.QueryHookOptions<FormVideoUrlQuery, FormVideoUrlQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FormVideoUrlQuery, FormVideoUrlQueryVariables>(FormVideoUrlDocument, options);
      }
export function useFormVideoUrlLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FormVideoUrlQuery, FormVideoUrlQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FormVideoUrlQuery, FormVideoUrlQueryVariables>(FormVideoUrlDocument, options);
        }
export type FormVideoUrlQueryHookResult = ReturnType<typeof useFormVideoUrlQuery>;
export type FormVideoUrlLazyQueryHookResult = ReturnType<typeof useFormVideoUrlLazyQuery>;
export type FormVideoUrlQueryResult = Apollo.QueryResult<FormVideoUrlQuery, FormVideoUrlQueryVariables>;
export const FormsDocument = gql`
    query Forms {
  forms {
    glassKgs
    glassVideoFileName
    metalKgs
    metalVideoFileName
    organicKgs
    organicVideoFileName
    paperKgs
    paperVideoFileName
    plasticKgs
    plasticVideoFileName
    user {
      phoneNumber
      email
    }
  }
}
    `;

/**
 * __useFormsQuery__
 *
 * To run a query within a React component, call `useFormsQuery` and pass it any options that fit your needs.
 * When your component renders, `useFormsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFormsQuery({
 *   variables: {
 *   },
 * });
 */
export function useFormsQuery(baseOptions?: Apollo.QueryHookOptions<FormsQuery, FormsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FormsQuery, FormsQueryVariables>(FormsDocument, options);
      }
export function useFormsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FormsQuery, FormsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FormsQuery, FormsQueryVariables>(FormsDocument, options);
        }
export type FormsQueryHookResult = ReturnType<typeof useFormsQuery>;
export type FormsLazyQueryHookResult = ReturnType<typeof useFormsLazyQuery>;
export type FormsQueryResult = Apollo.QueryResult<FormsQuery, FormsQueryVariables>;
export const MeDocument = gql`
    query Me {
  me {
    authUserId
    email
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
export const UsersDocument = gql`
    query Users {
  users {
    id
    email
    profileType
    lastLoginDate
    phoneNumber
    forms {
      id
      glassKgs
      glassVideoFileName
      metalKgs
      metalVideoFileName
      organicKgs
      organicVideoFileName
      paperKgs
      paperVideoFileName
      plasticKgs
      plasticVideoFileName
    }
  }
}
    `;

/**
 * __useUsersQuery__
 *
 * To run a query within a React component, call `useUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUsersQuery({
 *   variables: {
 *   },
 * });
 */
export function useUsersQuery(baseOptions?: Apollo.QueryHookOptions<UsersQuery, UsersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UsersQuery, UsersQueryVariables>(UsersDocument, options);
      }
export function useUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UsersQuery, UsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UsersQuery, UsersQueryVariables>(UsersDocument, options);
        }
export type UsersQueryHookResult = ReturnType<typeof useUsersQuery>;
export type UsersLazyQueryHookResult = ReturnType<typeof useUsersLazyQuery>;
export type UsersQueryResult = Apollo.QueryResult<UsersQuery, UsersQueryVariables>;