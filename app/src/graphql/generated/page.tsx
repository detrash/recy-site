import * as Types from './graphql';

import * as Operations from './graphql';
import { NextPage } from 'next';
import { NextRouter, useRouter } from 'next/router'
import { QueryHookOptions, useQuery } from '@apollo/client';
import * as Apollo from '@apollo/client';
import type React from 'react';
import { getApolloClient , ApolloClientContext} from 'src/lib/withPrivateApollo';




export async function getServerPageAggregateFormTypes
    (options: Omit<Apollo.QueryOptions<Types.AggregateFormTypesQueryVariables>, 'query'>, ctx: ApolloClientContext ){
        const apolloClient = getApolloClient(ctx);
        
        const data = await apolloClient.query<Types.AggregateFormTypesQuery>({ ...options, query: Operations.AggregateFormTypesDocument });
        
        const apolloState = apolloClient.cache.extract();

        return {
            props: {
                apolloState: apolloState,
                data: data?.data,
                error: data?.error ?? data?.errors ?? null,
            },
        };
      }
export const useAggregateFormTypes = (
  optionsFunc?: (router: NextRouter)=> QueryHookOptions<Types.AggregateFormTypesQuery, Types.AggregateFormTypesQueryVariables>) => {
  const router = useRouter();
  const options = optionsFunc ? optionsFunc(router) : {};
  return useQuery(Operations.AggregateFormTypesDocument, options);
};
export type PageAggregateFormTypesComp = React.FC<{data?: Types.AggregateFormTypesQuery, error?: Apollo.ApolloError}>;
export const withPageAggregateFormTypes = (optionsFunc?: (router: NextRouter)=> QueryHookOptions<Types.AggregateFormTypesQuery, Types.AggregateFormTypesQueryVariables>) => (WrappedComponent:PageAggregateFormTypesComp) : NextPage  => (props) => {
                const router = useRouter()
                const options = optionsFunc ? optionsFunc(router) : {};
                const {data, error } = useQuery(Operations.AggregateFormTypesDocument, options)    
                return <WrappedComponent {...props} data={data} error={error} /> ;
                   
            }; 
export const ssrAggregateFormTypes = {
      getServerPage: getServerPageAggregateFormTypes,
      withPage: withPageAggregateFormTypes,
      usePage: useAggregateFormTypes,
    }
export async function getServerPageFormById
    (options: Omit<Apollo.QueryOptions<Types.FormByIdQueryVariables>, 'query'>, ctx: ApolloClientContext ){
        const apolloClient = getApolloClient(ctx);
        
        const data = await apolloClient.query<Types.FormByIdQuery>({ ...options, query: Operations.FormByIdDocument });
        
        const apolloState = apolloClient.cache.extract();

        return {
            props: {
                apolloState: apolloState,
                data: data?.data,
                error: data?.error ?? data?.errors ?? null,
            },
        };
      }
export const useFormById = (
  optionsFunc?: (router: NextRouter)=> QueryHookOptions<Types.FormByIdQuery, Types.FormByIdQueryVariables>) => {
  const router = useRouter();
  const options = optionsFunc ? optionsFunc(router) : {};
  return useQuery(Operations.FormByIdDocument, options);
};
export type PageFormByIdComp = React.FC<{data?: Types.FormByIdQuery, error?: Apollo.ApolloError}>;
export const withPageFormById = (optionsFunc?: (router: NextRouter)=> QueryHookOptions<Types.FormByIdQuery, Types.FormByIdQueryVariables>) => (WrappedComponent:PageFormByIdComp) : NextPage  => (props) => {
                const router = useRouter()
                const options = optionsFunc ? optionsFunc(router) : {};
                const {data, error } = useQuery(Operations.FormByIdDocument, options)    
                return <WrappedComponent {...props} data={data} error={error} /> ;
                   
            }; 
export const ssrFormById = {
      getServerPage: getServerPageFormById,
      withPage: withPageFormById,
      usePage: useFormById,
    }
export async function getServerPageFormVideoUrl
    (options: Omit<Apollo.QueryOptions<Types.FormVideoUrlQueryVariables>, 'query'>, ctx: ApolloClientContext ){
        const apolloClient = getApolloClient(ctx);
        
        const data = await apolloClient.query<Types.FormVideoUrlQuery>({ ...options, query: Operations.FormVideoUrlDocument });
        
        const apolloState = apolloClient.cache.extract();

        return {
            props: {
                apolloState: apolloState,
                data: data?.data,
                error: data?.error ?? data?.errors ?? null,
            },
        };
      }
export const useFormVideoUrl = (
  optionsFunc?: (router: NextRouter)=> QueryHookOptions<Types.FormVideoUrlQuery, Types.FormVideoUrlQueryVariables>) => {
  const router = useRouter();
  const options = optionsFunc ? optionsFunc(router) : {};
  return useQuery(Operations.FormVideoUrlDocument, options);
};
export type PageFormVideoUrlComp = React.FC<{data?: Types.FormVideoUrlQuery, error?: Apollo.ApolloError}>;
export const withPageFormVideoUrl = (optionsFunc?: (router: NextRouter)=> QueryHookOptions<Types.FormVideoUrlQuery, Types.FormVideoUrlQueryVariables>) => (WrappedComponent:PageFormVideoUrlComp) : NextPage  => (props) => {
                const router = useRouter()
                const options = optionsFunc ? optionsFunc(router) : {};
                const {data, error } = useQuery(Operations.FormVideoUrlDocument, options)    
                return <WrappedComponent {...props} data={data} error={error} /> ;
                   
            }; 
export const ssrFormVideoUrl = {
      getServerPage: getServerPageFormVideoUrl,
      withPage: withPageFormVideoUrl,
      usePage: useFormVideoUrl,
    }
export async function getServerPageForms
    (options: Omit<Apollo.QueryOptions<Types.FormsQueryVariables>, 'query'>, ctx: ApolloClientContext ){
        const apolloClient = getApolloClient(ctx);
        
        const data = await apolloClient.query<Types.FormsQuery>({ ...options, query: Operations.FormsDocument });
        
        const apolloState = apolloClient.cache.extract();

        return {
            props: {
                apolloState: apolloState,
                data: data?.data,
                error: data?.error ?? data?.errors ?? null,
            },
        };
      }
export const useForms = (
  optionsFunc?: (router: NextRouter)=> QueryHookOptions<Types.FormsQuery, Types.FormsQueryVariables>) => {
  const router = useRouter();
  const options = optionsFunc ? optionsFunc(router) : {};
  return useQuery(Operations.FormsDocument, options);
};
export type PageFormsComp = React.FC<{data?: Types.FormsQuery, error?: Apollo.ApolloError}>;
export const withPageForms = (optionsFunc?: (router: NextRouter)=> QueryHookOptions<Types.FormsQuery, Types.FormsQueryVariables>) => (WrappedComponent:PageFormsComp) : NextPage  => (props) => {
                const router = useRouter()
                const options = optionsFunc ? optionsFunc(router) : {};
                const {data, error } = useQuery(Operations.FormsDocument, options)    
                return <WrappedComponent {...props} data={data} error={error} /> ;
                   
            }; 
export const ssrForms = {
      getServerPage: getServerPageForms,
      withPage: withPageForms,
      usePage: useForms,
    }
export async function getServerPageMe
    (options: Omit<Apollo.QueryOptions<Types.MeQueryVariables>, 'query'>, ctx: ApolloClientContext ){
        const apolloClient = getApolloClient(ctx);
        
        const data = await apolloClient.query<Types.MeQuery>({ ...options, query: Operations.MeDocument });
        
        const apolloState = apolloClient.cache.extract();

        return {
            props: {
                apolloState: apolloState,
                data: data?.data,
                error: data?.error ?? data?.errors ?? null,
            },
        };
      }
export const useMe = (
  optionsFunc?: (router: NextRouter)=> QueryHookOptions<Types.MeQuery, Types.MeQueryVariables>) => {
  const router = useRouter();
  const options = optionsFunc ? optionsFunc(router) : {};
  return useQuery(Operations.MeDocument, options);
};
export type PageMeComp = React.FC<{data?: Types.MeQuery, error?: Apollo.ApolloError}>;
export const withPageMe = (optionsFunc?: (router: NextRouter)=> QueryHookOptions<Types.MeQuery, Types.MeQueryVariables>) => (WrappedComponent:PageMeComp) : NextPage  => (props) => {
                const router = useRouter()
                const options = optionsFunc ? optionsFunc(router) : {};
                const {data, error } = useQuery(Operations.MeDocument, options)    
                return <WrappedComponent {...props} data={data} error={error} /> ;
                   
            }; 
export const ssrMe = {
      getServerPage: getServerPageMe,
      withPage: withPageMe,
      usePage: useMe,
    }
export async function getServerPageUsers
    (options: Omit<Apollo.QueryOptions<Types.UsersQueryVariables>, 'query'>, ctx: ApolloClientContext ){
        const apolloClient = getApolloClient(ctx);
        
        const data = await apolloClient.query<Types.UsersQuery>({ ...options, query: Operations.UsersDocument });
        
        const apolloState = apolloClient.cache.extract();

        return {
            props: {
                apolloState: apolloState,
                data: data?.data,
                error: data?.error ?? data?.errors ?? null,
            },
        };
      }
export const useUsers = (
  optionsFunc?: (router: NextRouter)=> QueryHookOptions<Types.UsersQuery, Types.UsersQueryVariables>) => {
  const router = useRouter();
  const options = optionsFunc ? optionsFunc(router) : {};
  return useQuery(Operations.UsersDocument, options);
};
export type PageUsersComp = React.FC<{data?: Types.UsersQuery, error?: Apollo.ApolloError}>;
export const withPageUsers = (optionsFunc?: (router: NextRouter)=> QueryHookOptions<Types.UsersQuery, Types.UsersQueryVariables>) => (WrappedComponent:PageUsersComp) : NextPage  => (props) => {
                const router = useRouter()
                const options = optionsFunc ? optionsFunc(router) : {};
                const {data, error } = useQuery(Operations.UsersDocument, options)    
                return <WrappedComponent {...props} data={data} error={error} /> ;
                   
            }; 
export const ssrUsers = {
      getServerPage: getServerPageUsers,
      withPage: withPageUsers,
      usePage: useUsers,
    }