import { GraphQLClient } from 'graphql-request';
import type { RequestDocument, Variables } from 'graphql-request';

const baseClient = new GraphQLClient(
  (import.meta.env.VITE_GRAPHQL_URL || '').trim() || 'https://gql.deep-voice.online/',
  { credentials: 'include' }
);

let getAuthToken: (() => string | null) | null = null;

export function setAuthTokenGetter(fn: () => string | null) {
  getAuthToken = fn;
}

export const gqlClient = {
  request: <T, V extends Variables = Variables>(
    document: RequestDocument,
    variables?: V,
    requestHeaders?: RequestInit['headers']
  ): Promise<T> => {
    const token = getAuthToken?.() ?? null;
    const headers: Record<string, string> = {
      ...(typeof requestHeaders === 'object' && requestHeaders !== null
        ? (requestHeaders as Record<string, string>)
        : {}),
    };
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return baseClient.request(document as any, variables as any, headers as any);
  },
};
