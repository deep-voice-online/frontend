/* eslint-disable */
import * as types from './graphql';
import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
    "mutation AuthConfirmRegister($data: ConfirmRegisterRequestGql!) {\n  authConfirmRegister(data: $data) {\n    accessToken\n    refreshToken\n  }\n}": typeof types.AuthConfirmRegisterDocument,
    "mutation AuthLogin($data: LoginRequestGql!) {\n  authLogin(data: $data) {\n    accessToken\n    refreshToken\n  }\n}": typeof types.AuthLoginDocument,
    "mutation AuthLogout {\n  authLogout {\n    ok\n  }\n}": typeof types.AuthLogoutDocument,
    "mutation AuthRefreshAccessToken {\n  authRefreshAccessToken {\n    accessToken\n  }\n}": typeof types.AuthRefreshAccessTokenDocument,
    "mutation AuthRegister($data: RegisterRequestGql!) {\n  authRegister(data: $data) {\n    ok\n  }\n}": typeof types.AuthRegisterDocument,
};
const documents: Documents = {
    "mutation AuthConfirmRegister($data: ConfirmRegisterRequestGql!) {\n  authConfirmRegister(data: $data) {\n    accessToken\n    refreshToken\n  }\n}": types.AuthConfirmRegisterDocument,
    "mutation AuthLogin($data: LoginRequestGql!) {\n  authLogin(data: $data) {\n    accessToken\n    refreshToken\n  }\n}": types.AuthLoginDocument,
    "mutation AuthLogout {\n  authLogout {\n    ok\n  }\n}": types.AuthLogoutDocument,
    "mutation AuthRefreshAccessToken {\n  authRefreshAccessToken {\n    accessToken\n  }\n}": types.AuthRefreshAccessTokenDocument,
    "mutation AuthRegister($data: RegisterRequestGql!) {\n  authRegister(data: $data) {\n    ok\n  }\n}": types.AuthRegisterDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "mutation AuthConfirmRegister($data: ConfirmRegisterRequestGql!) {\n  authConfirmRegister(data: $data) {\n    accessToken\n    refreshToken\n  }\n}"): (typeof documents)["mutation AuthConfirmRegister($data: ConfirmRegisterRequestGql!) {\n  authConfirmRegister(data: $data) {\n    accessToken\n    refreshToken\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "mutation AuthLogin($data: LoginRequestGql!) {\n  authLogin(data: $data) {\n    accessToken\n    refreshToken\n  }\n}"): (typeof documents)["mutation AuthLogin($data: LoginRequestGql!) {\n  authLogin(data: $data) {\n    accessToken\n    refreshToken\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "mutation AuthLogout {\n  authLogout {\n    ok\n  }\n}"): (typeof documents)["mutation AuthLogout {\n  authLogout {\n    ok\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "mutation AuthRefreshAccessToken {\n  authRefreshAccessToken {\n    accessToken\n  }\n}"): (typeof documents)["mutation AuthRefreshAccessToken {\n  authRefreshAccessToken {\n    accessToken\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "mutation AuthRegister($data: RegisterRequestGql!) {\n  authRegister(data: $data) {\n    ok\n  }\n}"): (typeof documents)["mutation AuthRegister($data: RegisterRequestGql!) {\n  authRegister(data: $data) {\n    ok\n  }\n}"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;