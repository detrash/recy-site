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
};

export type AggregateFormByUserProfileResponse = {
  __typename?: 'AggregateFormByUserProfileResponse';
  data: Array<AggregateFormData>;
  id: Scalars['String'];
};

export type AggregateFormData = {
  __typename?: 'AggregateFormData';
  amount: Scalars['Float'];
  residueType: ResidueType;
};

export type CreateFormInput = {
  GLASS?: InputMaybe<ResidueInput>;
  METAL?: InputMaybe<ResidueInput>;
  ORGANIC?: InputMaybe<ResidueInput>;
  PAPER?: InputMaybe<ResidueInput>;
  PLASTIC?: InputMaybe<ResidueInput>;
  TEXTILE?: InputMaybe<ResidueInput>;
  LANDFILL_WASTE?: InputMaybe<ResidueInput>;
  walletAddress?: InputMaybe<Scalars['String']>;
};

export type CreateFormResponse = {
  __typename?: 'CreateFormResponse';
  form: Form;
  /** Field regarding informations on AWS S3 */
  s3?: Maybe<Array<S3>>;
};

export type CreateUserInput = {
  email: Scalars['String'];
  name: Scalars['String'];
  phoneNumber: Scalars['String'];
  profileType: ProfileType;
};

export type Document = {
  __typename?: 'Document';
  amount: Scalars['Float'];
  createdAt: Scalars['DateTime'];
  form: Form;
  id: Scalars['ID'];
  invoicesFileName: Array<Scalars['String']>;
  residueType: ResidueType;
  videoFileName?: Maybe<Scalars['String']>;
};

export type FilterOptions = {
  gt?: InputMaybe<Scalars['DateTime']>;
  gte?: InputMaybe<Scalars['DateTime']>;
  lt?: InputMaybe<Scalars['DateTime']>;
  lte?: InputMaybe<Scalars['DateTime']>;
};

export type Form = {
  __typename?: 'Form';
  createdAt: Scalars['DateTime'];
  documents: Array<Document>;
  formMetadataUrl?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  isFormAuthorizedByAdmin?: Maybe<Scalars['Boolean']>;
  user: User;
  walletAddress?: Maybe<Scalars['String']>;
};

export type ListFiltersInput = {
  createdAt?: InputMaybe<FilterOptions>;
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
  name: Scalars['String'];
  permissions: Array<Permissions>;
  phoneNumber: Scalars['String'];
  profileType: ProfileType;
};


export type MeFormsArgs = {
  filter?: InputMaybe<ListFiltersInput>;
};

export type Mutation = {
  __typename?: 'Mutation';
  authorizeForm: Form;
  createForm: CreateFormResponse;
  createFormMetadata: SubmitNftResponse;
  createUser: User;
  submitFormImage: Scalars['String'];
  updateUser: User;
};


export type MutationAuthorizeFormArgs = {
  formId: Scalars['String'];
  isFormAuthorized: Scalars['Boolean'];
};


export type MutationCreateFormArgs = {
  data: CreateFormInput;
};


export type MutationCreateFormMetadataArgs = {
  formId: Scalars['String'];
};


export type MutationCreateUserArgs = {
  data: CreateUserInput;
};


export type MutationSubmitFormImageArgs = {
  formId: Scalars['String'];
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
  aggregateFormByUserProfile: Array<AggregateFormByUserProfileResponse>;
  documentInvoicesUrlByResidue: Array<Scalars['String']>;
  documentVideoUrlByResidue: Scalars['String'];
  form: Form;
  forms: Array<Form>;
  me: Me;
  user: User;
  users: Array<User>;
};


export type QueryDocumentInvoicesUrlByResidueArgs = {
  formId: Scalars['String'];
  residueType: ResidueType;
};


export type QueryDocumentVideoUrlByResidueArgs = {
  formId: Scalars['String'];
  residueType: ResidueType;
};


export type QueryFormArgs = {
  formId: Scalars['String'];
};


export type QueryFormsArgs = {
  filter?: InputMaybe<ListFiltersInput>;
};


export type QueryUserArgs = {
  userAuthId: Scalars['String'];
};


export type QueryUsersArgs = {
  filter?: InputMaybe<ListFiltersInput>;
};

export type ResidueInput = {
  amount?: InputMaybe<Scalars['Float']>;
  invoicesFileName: Array<Scalars['String']>;
  videoFileName?: InputMaybe<Scalars['String']>;
};

/** Represents the residue type */
export enum ResidueType {
  Glass = 'GLASS',
  Metal = 'METAL',
  Organic = 'ORGANIC',
  Paper = 'PAPER',
  Plastic = 'PLASTIC',
  Textile = 'TEXTILE',
  Landfill_Waste = 'LANDFILL_WASTE'
}

export type S3 = {
  __typename?: 'S3';
  invoicesCreateUrl: Array<Scalars['String']>;
  invoicesFileName: Array<Scalars['String']>;
  residue: ResidueType;
  videoCreateUrl?: Maybe<Scalars['String']>;
  videoFileName?: Maybe<Scalars['String']>;
};

export type SubmitNftResponse = {
  __typename?: 'SubmitNFTResponse';
  body: Scalars['String'];
  createMetadataUrl: Scalars['String'];
};

export type UpdateUserInput = {
  email?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
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
  name: Scalars['String'];
  phoneNumber: Scalars['String'];
  profileType: ProfileType;
};


export type UserFormsArgs = {
  filter?: InputMaybe<ListFiltersInput>;
};

export type AuthorizeFormMutationVariables = Exact<{
  FORM_ID: Scalars['String'];
  FORM_STATUS: Scalars['Boolean'];
}>;


export type AuthorizeFormMutation = { __typename?: 'Mutation', authorizeForm: { __typename?: 'Form', id: string, isFormAuthorizedByAdmin?: boolean | null } };

export type CreateFormMutationVariables = Exact<{
  GLASS?: InputMaybe<ResidueInput>;
  METAL?: InputMaybe<ResidueInput>;
  ORGANIC?: InputMaybe<ResidueInput>;
  PAPER?: InputMaybe<ResidueInput>;
  PLASTIC?: InputMaybe<ResidueInput>;
  TEXTILE?: InputMaybe<ResidueInput>;
  LANDFILL?: InputMaybe<ResidueInput>;
  WALLET_ADDRESS?: InputMaybe<Scalars['String']>;
}>;


export type CreateFormMutation = { __typename?: 'Mutation', createForm: { __typename?: 'CreateFormResponse', s3?: Array<{ __typename?: 'S3', residue: ResidueType, videoCreateUrl?: string | null, videoFileName?: string | null, invoicesCreateUrl: Array<string>, invoicesFileName: Array<string> }> | null } };

export type CreateNftMutationVariables = Exact<{
  FORMID: Scalars['String'];
}>;


export type CreateNftMutation = { __typename?: 'Mutation', createFormMetadata: { __typename?: 'SubmitNFTResponse', body: string, createMetadataUrl: string } };

export type CreateUserMutationVariables = Exact<{
  email: Scalars['String'];
  name: Scalars['String'];
  phoneNumber: Scalars['String'];
  profileType: ProfileType;
}>;


export type CreateUserMutation = { __typename?: 'Mutation', createUser: { __typename?: 'User', authUserId: string, email: string, profileType: ProfileType, phoneNumber: string } };

export type SubmitFormImageMutationVariables = Exact<{
  FORM_ID: Scalars['String'];
}>;


export type SubmitFormImageMutation = { __typename?: 'Mutation', submitFormImage: string };

export type UpdateUserMutationVariables = Exact<{
  email: Scalars['String'];
  name: Scalars['String'];
  phoneNumber: Scalars['String'];
  profileType: ProfileType;
}>;


export type UpdateUserMutation = { __typename?: 'Mutation', updateUser: { __typename?: 'User', authUserId: string, email: string, profileType: ProfileType, phoneNumber: string } };

export type AggregateFormTypesQueryVariables = Exact<{ [key: string]: never; }>;


export type AggregateFormTypesQuery = { __typename?: 'Query', aggregateFormByUserProfile: Array<{ __typename?: 'AggregateFormByUserProfileResponse', id: string, data: Array<{ __typename?: 'AggregateFormData', amount: number, residueType: ResidueType }> }> };

export type DocumentInvoicesUrlByResidueQueryVariables = Exact<{
  formId: Scalars['String'];
  residueType: ResidueType;
}>;


export type DocumentInvoicesUrlByResidueQuery = { __typename?: 'Query', documentInvoicesUrlByResidue: Array<string> };

export type DocumentVideoUrlByResidueQueryVariables = Exact<{
  formId: Scalars['String'];
  residueType: ResidueType;
}>;


export type DocumentVideoUrlByResidueQuery = { __typename?: 'Query', documentVideoUrlByResidue: string };

export type FormByIdQueryVariables = Exact<{
  FORM_ID: Scalars['String'];
}>;


export type FormByIdQuery = { __typename?: 'Query', form: { __typename?: 'Form', id: string, isFormAuthorizedByAdmin?: boolean | null, formMetadataUrl?: string | null, walletAddress?: string | null, createdAt: any, documents: Array<{ __typename?: 'Document', id: string, residueType: ResidueType, amount: number, videoFileName?: string | null, invoicesFileName: Array<string> }>, user: { __typename?: 'User', phoneNumber: string, email: string } } };

export type FormsQueryVariables = Exact<{
  FILTERS?: InputMaybe<ListFiltersInput>;
}>;


export type FormsQuery = { __typename?: 'Query', forms: Array<{ __typename?: 'Form', id: string, isFormAuthorizedByAdmin?: boolean | null, formMetadataUrl?: string | null, walletAddress?: string | null, createdAt: any, documents: Array<{ __typename?: 'Document', id: string, residueType: ResidueType, amount: number, videoFileName?: string | null, invoicesFileName: Array<string> }>, user: { __typename?: 'User', phoneNumber: string, email: string } }> };

export type MeQueryVariables = Exact<{
  FILTERS?: InputMaybe<ListFiltersInput>;
}>;


export type MeQuery = { __typename?: 'Query', me: { __typename?: 'Me', authUserId: string, email: string, name: string, profileType: ProfileType, lastLoginDate?: any | null, phoneNumber: string, permissions: Array<{ __typename?: 'Permissions', type: string }>, forms: Array<{ __typename?: 'Form', id: string, isFormAuthorizedByAdmin?: boolean | null, formMetadataUrl?: string | null, walletAddress?: string | null, createdAt: any, documents: Array<{ __typename?: 'Document', id: string, residueType: ResidueType, amount: number, videoFileName?: string | null, invoicesFileName: Array<string> }> }> } };

export type UsersQueryVariables = Exact<{
  FILTERS?: InputMaybe<ListFiltersInput>;
}>;


export type UsersQuery = { __typename?: 'Query', users: Array<{ __typename?: 'User', id: string, email: string, profileType: ProfileType, lastLoginDate?: any | null, phoneNumber: string, forms: Array<{ __typename?: 'Form', id: string, isFormAuthorizedByAdmin?: boolean | null, formMetadataUrl?: string | null, walletAddress?: string | null, createdAt: any, documents: Array<{ __typename?: 'Document', id: string, residueType: ResidueType, amount: number, videoFileName?: string | null, invoicesFileName: Array<string> }> }> }> };


export const AuthorizeFormDocument = gql`
    mutation AuthorizeForm($FORM_ID: String!, $FORM_STATUS: Boolean!) {
  authorizeForm(formId: $FORM_ID, isFormAuthorized: $FORM_STATUS) {
    id
    isFormAuthorizedByAdmin
  }
}
    `;
export type AuthorizeFormMutationFn = Apollo.MutationFunction<AuthorizeFormMutation, AuthorizeFormMutationVariables>;

/**
 * __useAuthorizeFormMutation__
 *
 * To run a mutation, you first call `useAuthorizeFormMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAuthorizeFormMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [authorizeFormMutation, { data, loading, error }] = useAuthorizeFormMutation({
 *   variables: {
 *      FORM_ID: // value for 'FORM_ID'
 *      FORM_STATUS: // value for 'FORM_STATUS'
 *   },
 * });
 */
export function useAuthorizeFormMutation(baseOptions?: Apollo.MutationHookOptions<AuthorizeFormMutation, AuthorizeFormMutationVariables>) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<AuthorizeFormMutation, AuthorizeFormMutationVariables>(AuthorizeFormDocument, options);
}
export type AuthorizeFormMutationHookResult = ReturnType<typeof useAuthorizeFormMutation>;
export type AuthorizeFormMutationResult = Apollo.MutationResult<AuthorizeFormMutation>;
export type AuthorizeFormMutationOptions = Apollo.BaseMutationOptions<AuthorizeFormMutation, AuthorizeFormMutationVariables>;
export const CreateFormDocument = gql`
    mutation CreateForm($GLASS: ResidueInput, $METAL: ResidueInput, $ORGANIC: ResidueInput, $PAPER: ResidueInput, $PLASTIC: ResidueInput,$TEXTILE: ResidueInput, $LANDFILL_WASTE: ResidueInput,  $WALLET_ADDRESS: String) {
  createForm(
    data: {GLASS: $GLASS, METAL: $METAL, ORGANIC: $ORGANIC, PAPER: $PAPER, PLASTIC: $PLASTIC, TEXTILE: $TEXTILE, LANDFILL_WASTE: $LANDFILL_WASTE, walletAddress: $WALLET_ADDRESS}
  ) {
    s3 {
      residue
      videoCreateUrl
      videoFileName
      invoicesCreateUrl
      invoicesFileName
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
 *      WALLET_ADDRESS: // value for 'WALLET_ADDRESS'
 *   },
 * });
 */
export function useCreateFormMutation(baseOptions?: Apollo.MutationHookOptions<CreateFormMutation, CreateFormMutationVariables>) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<CreateFormMutation, CreateFormMutationVariables>(CreateFormDocument, options);
}
export type CreateFormMutationHookResult = ReturnType<typeof useCreateFormMutation>;
export type CreateFormMutationResult = Apollo.MutationResult<CreateFormMutation>;
export type CreateFormMutationOptions = Apollo.BaseMutationOptions<CreateFormMutation, CreateFormMutationVariables>;
export const CreateNftDocument = gql`
    mutation CreateNFT($FORMID: String!) {
  createFormMetadata(formId: $FORMID) {
    body
    createMetadataUrl
  }
}
    `;
export type CreateNftMutationFn = Apollo.MutationFunction<CreateNftMutation, CreateNftMutationVariables>;

/**
 * __useCreateNftMutation__
 *
 * To run a mutation, you first call `useCreateNftMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateNftMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createNftMutation, { data, loading, error }] = useCreateNftMutation({
 *   variables: {
 *      FORMID: // value for 'FORMID'
 *   },
 * });
 */
export function useCreateNftMutation(baseOptions?: Apollo.MutationHookOptions<CreateNftMutation, CreateNftMutationVariables>) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<CreateNftMutation, CreateNftMutationVariables>(CreateNftDocument, options);
}
export type CreateNftMutationHookResult = ReturnType<typeof useCreateNftMutation>;
export type CreateNftMutationResult = Apollo.MutationResult<CreateNftMutation>;
export type CreateNftMutationOptions = Apollo.BaseMutationOptions<CreateNftMutation, CreateNftMutationVariables>;
export const CreateUserDocument = gql`
    mutation CreateUser($email: String!, $name: String!, $phoneNumber: String!, $profileType: ProfileType!) {
  createUser(
    data: {email: $email, name: $name, phoneNumber: $phoneNumber, profileType: $profileType}
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
 *      email: // value for 'email'
 *      name: // value for 'name'
 *      phoneNumber: // value for 'phoneNumber'
 *      profileType: // value for 'profileType'
 *   },
 * });
 */
export function useCreateUserMutation(baseOptions?: Apollo.MutationHookOptions<CreateUserMutation, CreateUserMutationVariables>) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<CreateUserMutation, CreateUserMutationVariables>(CreateUserDocument, options);
}
export type CreateUserMutationHookResult = ReturnType<typeof useCreateUserMutation>;
export type CreateUserMutationResult = Apollo.MutationResult<CreateUserMutation>;
export type CreateUserMutationOptions = Apollo.BaseMutationOptions<CreateUserMutation, CreateUserMutationVariables>;
export const SubmitFormImageDocument = gql`
    mutation SubmitFormImage($FORM_ID: String!) {
  submitFormImage(formId: $FORM_ID)
}
    `;
export type SubmitFormImageMutationFn = Apollo.MutationFunction<SubmitFormImageMutation, SubmitFormImageMutationVariables>;

/**
 * __useSubmitFormImageMutation__
 *
 * To run a mutation, you first call `useSubmitFormImageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSubmitFormImageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [submitFormImageMutation, { data, loading, error }] = useSubmitFormImageMutation({
 *   variables: {
 *      FORM_ID: // value for 'FORM_ID'
 *   },
 * });
 */
export function useSubmitFormImageMutation(baseOptions?: Apollo.MutationHookOptions<SubmitFormImageMutation, SubmitFormImageMutationVariables>) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<SubmitFormImageMutation, SubmitFormImageMutationVariables>(SubmitFormImageDocument, options);
}
export type SubmitFormImageMutationHookResult = ReturnType<typeof useSubmitFormImageMutation>;
export type SubmitFormImageMutationResult = Apollo.MutationResult<SubmitFormImageMutation>;
export type SubmitFormImageMutationOptions = Apollo.BaseMutationOptions<SubmitFormImageMutation, SubmitFormImageMutationVariables>;
export const UpdateUserDocument = gql`
    mutation UpdateUser($email: String!, $name: String!, $phoneNumber: String!, $profileType: ProfileType!) {
  updateUser(
    data: {email: $email, name: $name, phoneNumber: $phoneNumber, profileType: $profileType}
  ) {
    authUserId
    email
    profileType
    phoneNumber
  }
}
    `;
export type UpdateUserMutationFn = Apollo.MutationFunction<UpdateUserMutation, UpdateUserMutationVariables>;

/**
 * __useUpdateUserMutation__
 *
 * To run a mutation, you first call `useUpdateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserMutation, { data, loading, error }] = useUpdateUserMutation({
 *   variables: {
 *      email: // value for 'email'
 *      name: // value for 'name'
 *      phoneNumber: // value for 'phoneNumber'
 *      profileType: // value for 'profileType'
 *   },
 * });
 */
export function useUpdateUserMutation(baseOptions?: Apollo.MutationHookOptions<UpdateUserMutation, UpdateUserMutationVariables>) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<UpdateUserMutation, UpdateUserMutationVariables>(UpdateUserDocument, options);
}
export type UpdateUserMutationHookResult = ReturnType<typeof useUpdateUserMutation>;
export type UpdateUserMutationResult = Apollo.MutationResult<UpdateUserMutation>;
export type UpdateUserMutationOptions = Apollo.BaseMutationOptions<UpdateUserMutation, UpdateUserMutationVariables>;
export const AggregateFormTypesDocument = gql`
    query AggregateFormTypes {
  aggregateFormByUserProfile {
    id
    data {
      amount
      residueType
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
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<AggregateFormTypesQuery, AggregateFormTypesQueryVariables>(AggregateFormTypesDocument, options);
}
export function useAggregateFormTypesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AggregateFormTypesQuery, AggregateFormTypesQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<AggregateFormTypesQuery, AggregateFormTypesQueryVariables>(AggregateFormTypesDocument, options);
}
export type AggregateFormTypesQueryHookResult = ReturnType<typeof useAggregateFormTypesQuery>;
export type AggregateFormTypesLazyQueryHookResult = ReturnType<typeof useAggregateFormTypesLazyQuery>;
export type AggregateFormTypesQueryResult = Apollo.QueryResult<AggregateFormTypesQuery, AggregateFormTypesQueryVariables>;
export const DocumentInvoicesUrlByResidueDocument = gql`
    query DocumentInvoicesUrlByResidue($formId: String!, $residueType: ResidueType!) {
  documentInvoicesUrlByResidue(formId: $formId, residueType: $residueType)
}
    `;

/**
 * __useDocumentInvoicesUrlByResidueQuery__
 *
 * To run a query within a React component, call `useDocumentInvoicesUrlByResidueQuery` and pass it any options that fit your needs.
 * When your component renders, `useDocumentInvoicesUrlByResidueQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useDocumentInvoicesUrlByResidueQuery({
 *   variables: {
 *      formId: // value for 'formId'
 *      residueType: // value for 'residueType'
 *   },
 * });
 */
export function useDocumentInvoicesUrlByResidueQuery(baseOptions: Apollo.QueryHookOptions<DocumentInvoicesUrlByResidueQuery, DocumentInvoicesUrlByResidueQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<DocumentInvoicesUrlByResidueQuery, DocumentInvoicesUrlByResidueQueryVariables>(DocumentInvoicesUrlByResidueDocument, options);
}
export function useDocumentInvoicesUrlByResidueLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<DocumentInvoicesUrlByResidueQuery, DocumentInvoicesUrlByResidueQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<DocumentInvoicesUrlByResidueQuery, DocumentInvoicesUrlByResidueQueryVariables>(DocumentInvoicesUrlByResidueDocument, options);
}
export type DocumentInvoicesUrlByResidueQueryHookResult = ReturnType<typeof useDocumentInvoicesUrlByResidueQuery>;
export type DocumentInvoicesUrlByResidueLazyQueryHookResult = ReturnType<typeof useDocumentInvoicesUrlByResidueLazyQuery>;
export type DocumentInvoicesUrlByResidueQueryResult = Apollo.QueryResult<DocumentInvoicesUrlByResidueQuery, DocumentInvoicesUrlByResidueQueryVariables>;
export const DocumentVideoUrlByResidueDocument = gql`
    query DocumentVideoUrlByResidue($formId: String!, $residueType: ResidueType!) {
  documentVideoUrlByResidue(formId: $formId, residueType: $residueType)
}
    `;

/**
 * __useDocumentVideoUrlByResidueQuery__
 *
 * To run a query within a React component, call `useDocumentVideoUrlByResidueQuery` and pass it any options that fit your needs.
 * When your component renders, `useDocumentVideoUrlByResidueQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useDocumentVideoUrlByResidueQuery({
 *   variables: {
 *      formId: // value for 'formId'
 *      residueType: // value for 'residueType'
 *   },
 * });
 */
export function useDocumentVideoUrlByResidueQuery(baseOptions: Apollo.QueryHookOptions<DocumentVideoUrlByResidueQuery, DocumentVideoUrlByResidueQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<DocumentVideoUrlByResidueQuery, DocumentVideoUrlByResidueQueryVariables>(DocumentVideoUrlByResidueDocument, options);
}
export function useDocumentVideoUrlByResidueLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<DocumentVideoUrlByResidueQuery, DocumentVideoUrlByResidueQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<DocumentVideoUrlByResidueQuery, DocumentVideoUrlByResidueQueryVariables>(DocumentVideoUrlByResidueDocument, options);
}
export type DocumentVideoUrlByResidueQueryHookResult = ReturnType<typeof useDocumentVideoUrlByResidueQuery>;
export type DocumentVideoUrlByResidueLazyQueryHookResult = ReturnType<typeof useDocumentVideoUrlByResidueLazyQuery>;
export type DocumentVideoUrlByResidueQueryResult = Apollo.QueryResult<DocumentVideoUrlByResidueQuery, DocumentVideoUrlByResidueQueryVariables>;
export const FormByIdDocument = gql`
    query FormById($FORM_ID: String!) {
  form(formId: $FORM_ID) {
    id
    documents {
      id
      residueType
      amount
      videoFileName
      invoicesFileName
    }
    user {
      phoneNumber
      email
    }
    isFormAuthorizedByAdmin
    formMetadataUrl
    walletAddress
    createdAt
  }
}
    `;

/**
 * __useFormByIdQuery__
 *
 * To run a query within a React component, call `useFormByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useFormByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFormByIdQuery({
 *   variables: {
 *      FORM_ID: // value for 'FORM_ID'
 *   },
 * });
 */
export function useFormByIdQuery(baseOptions: Apollo.QueryHookOptions<FormByIdQuery, FormByIdQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<FormByIdQuery, FormByIdQueryVariables>(FormByIdDocument, options);
}
export function useFormByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FormByIdQuery, FormByIdQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<FormByIdQuery, FormByIdQueryVariables>(FormByIdDocument, options);
}
export type FormByIdQueryHookResult = ReturnType<typeof useFormByIdQuery>;
export type FormByIdLazyQueryHookResult = ReturnType<typeof useFormByIdLazyQuery>;
export type FormByIdQueryResult = Apollo.QueryResult<FormByIdQuery, FormByIdQueryVariables>;
export const FormsDocument = gql`
    query Forms($FILTERS: ListFiltersInput) {
  forms(filter: $FILTERS) {
    id
    documents {
      id
      residueType
      amount
      videoFileName
      invoicesFileName
    }
    user {
      phoneNumber
      email
    }
    isFormAuthorizedByAdmin
    formMetadataUrl
    walletAddress
    createdAt
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
 *      FILTERS: // value for 'FILTERS'
 *   },
 * });
 */
export function useFormsQuery(baseOptions?: Apollo.QueryHookOptions<FormsQuery, FormsQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<FormsQuery, FormsQueryVariables>(FormsDocument, options);
}
export function useFormsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FormsQuery, FormsQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<FormsQuery, FormsQueryVariables>(FormsDocument, options);
}
export type FormsQueryHookResult = ReturnType<typeof useFormsQuery>;
export type FormsLazyQueryHookResult = ReturnType<typeof useFormsLazyQuery>;
export type FormsQueryResult = Apollo.QueryResult<FormsQuery, FormsQueryVariables>;
export const MeDocument = gql`
    query Me($FILTERS: ListFiltersInput) {
  me {
    authUserId
    email
    name
    profileType
    lastLoginDate
    phoneNumber
    permissions {
      type
    }
    forms(filter: $FILTERS) {
      id
      documents {
        id
        residueType
        amount
        videoFileName
        invoicesFileName
      }
      isFormAuthorizedByAdmin
      formMetadataUrl
      walletAddress
      createdAt
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
 *      FILTERS: // value for 'FILTERS'
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
}
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
}
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
export const UsersDocument = gql`
    query Users($FILTERS: ListFiltersInput) {
  users {
    id
    email
    profileType
    lastLoginDate
    phoneNumber
    forms(filter: $FILTERS) {
      id
      documents {
        id
        residueType
        amount
        videoFileName
        invoicesFileName
      }
      isFormAuthorizedByAdmin
      formMetadataUrl
      walletAddress
      createdAt
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
 *      FILTERS: // value for 'FILTERS'
 *   },
 * });
 */
export function useUsersQuery(baseOptions?: Apollo.QueryHookOptions<UsersQuery, UsersQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<UsersQuery, UsersQueryVariables>(UsersDocument, options);
}
export function useUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UsersQuery, UsersQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<UsersQuery, UsersQueryVariables>(UsersDocument, options);
}
export type UsersQueryHookResult = ReturnType<typeof useUsersQuery>;
export type UsersLazyQueryHookResult = ReturnType<typeof useUsersLazyQuery>;
export type UsersQueryResult = Apollo.QueryResult<UsersQuery, UsersQueryVariables>;