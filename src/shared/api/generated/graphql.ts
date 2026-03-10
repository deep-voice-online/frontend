/* eslint-disable */
import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = T | null | undefined;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: { input: any; output: any; }
};

export type ConfirmRegisterRequestGql = {
  email: Scalars['String']['input'];
  otp: Scalars['Float']['input'];
};

export type DownloadLinkResponseGql = {
  __typename?: 'DownloadLinkResponseGql';
  downloadUrl: Scalars['String']['output'];
  expiresIn: Scalars['Float']['output'];
};

export type FileGql = {
  __typename?: 'FileGql';
  contentType: Scalars['String']['output'];
  /** ISO дата создания */
  createdAt: Scalars['DateTime']['output'];
  fileKey: Scalars['String']['output'];
  id: Scalars['String']['output'];
  originalName: Scalars['String']['output'];
  size: Scalars['Float']['output'];
  /** UPLOADING, READY, DELETED */
  status: Scalars['String']['output'];
  userId: Scalars['String']['output'];
};

export type FileIdRequestGql = {
  fileId: Scalars['String']['input'];
};

export type FileInfoGql = {
  __typename?: 'FileInfoGql';
  file: FileGql;
};

export type FileListResponseGql = {
  __typename?: 'FileListResponseGql';
  files: Array<FileGql>;
};

export type JwtResponseGql = {
  __typename?: 'JwtResponseGql';
  accessToken: Scalars['String']['output'];
  refreshToken: Scalars['String']['output'];
};

export type LoginRequestGql = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  authConfirmRegister: JwtResponseGql;
  authLogin: JwtResponseGql;
  authLogout: SuccessResponseGql;
  authRefreshAccessToken: RefreshAccessTokenResponseGql;
  authRegister: SuccessResponseGql;
  fileInitializeUpload: UploadResponseGql;
  transcribeProcess: TranscribeProcessResponseGql;
};


export type MutationAuthConfirmRegisterArgs = {
  data: ConfirmRegisterRequestGql;
};


export type MutationAuthLoginArgs = {
  data: LoginRequestGql;
};


export type MutationAuthRegisterArgs = {
  data: RegisterRequestGql;
};


export type MutationFileInitializeUploadArgs = {
  data: UploadRequestGql;
};


export type MutationTranscribeProcessArgs = {
  data: TranscribeProcessRequestGql;
};

export type Query = {
  __typename?: 'Query';
  fileGetFileInfo: FileInfoGql;
  fileGetUserFiles: FileListResponseGql;
  fileInetDownloadLink: DownloadLinkResponseGql;
  getTokens: Scalars['String']['output'];
  ping: Scalars['String']['output'];
};


export type QueryFileGetFileInfoArgs = {
  data: FileIdRequestGql;
};


export type QueryFileInetDownloadLinkArgs = {
  data: FileIdRequestGql;
};

export type RefreshAccessTokenResponseGql = {
  __typename?: 'RefreshAccessTokenResponseGql';
  accessToken: Scalars['String']['output'];
};

export type RegisterRequestGql = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type SuccessResponseGql = {
  __typename?: 'SuccessResponseGql';
  ok: Scalars['Boolean']['output'];
};

export type TranscribeProcessRequestGql = {
  downloadUrl: Scalars['String']['input'];
};

export type TranscribeProcessResponseGql = {
  __typename?: 'TranscribeProcessResponseGql';
  success: Scalars['Boolean']['output'];
};

export type UploadRequestGql = {
  contentType: Scalars['String']['input'];
  fileName: Scalars['String']['input'];
  fileSize: Scalars['Float']['input'];
};

export type UploadResponseGql = {
  __typename?: 'UploadResponseGql';
  fileId: Scalars['String']['output'];
  fileKey: Scalars['String']['output'];
  uploadUrl: Scalars['String']['output'];
};

export type AuthConfirmRegisterMutationVariables = Exact<{
  data: ConfirmRegisterRequestGql;
}>;


export type AuthConfirmRegisterMutation = { __typename?: 'Mutation', authConfirmRegister: { __typename?: 'JwtResponseGql', accessToken: string, refreshToken: string } };

export type AuthLoginMutationVariables = Exact<{
  data: LoginRequestGql;
}>;


export type AuthLoginMutation = { __typename?: 'Mutation', authLogin: { __typename?: 'JwtResponseGql', accessToken: string, refreshToken: string } };

export type AuthLogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type AuthLogoutMutation = { __typename?: 'Mutation', authLogout: { __typename?: 'SuccessResponseGql', ok: boolean } };

export type AuthRefreshAccessTokenMutationVariables = Exact<{ [key: string]: never; }>;


export type AuthRefreshAccessTokenMutation = { __typename?: 'Mutation', authRefreshAccessToken: { __typename?: 'RefreshAccessTokenResponseGql', accessToken: string } };

export type AuthRegisterMutationVariables = Exact<{
  data: RegisterRequestGql;
}>;


export type AuthRegisterMutation = { __typename?: 'Mutation', authRegister: { __typename?: 'SuccessResponseGql', ok: boolean } };

export type FileGetDownloadLinkQueryVariables = Exact<{
  data: FileIdRequestGql;
}>;


export type FileGetDownloadLinkQuery = { __typename?: 'Query', fileInetDownloadLink: { __typename?: 'DownloadLinkResponseGql', downloadUrl: string, expiresIn: number } };

export type FileGetUserFilesQueryVariables = Exact<{ [key: string]: never; }>;


export type FileGetUserFilesQuery = { __typename?: 'Query', fileGetUserFiles: { __typename?: 'FileListResponseGql', files: Array<{ __typename?: 'FileGql', id: string, originalName: string, contentType: string, size: number, status: string, createdAt: any }> } };

export type FileInitializeUploadMutationVariables = Exact<{
  data: UploadRequestGql;
}>;


export type FileInitializeUploadMutation = { __typename?: 'Mutation', fileInitializeUpload: { __typename?: 'UploadResponseGql', fileId: string, uploadUrl: string, fileKey: string } };


export const AuthConfirmRegisterDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AuthConfirmRegister"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ConfirmRegisterRequestGql"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"authConfirmRegister"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"accessToken"}},{"kind":"Field","name":{"kind":"Name","value":"refreshToken"}}]}}]}}]} as unknown as DocumentNode<AuthConfirmRegisterMutation, AuthConfirmRegisterMutationVariables>;
export const AuthLoginDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AuthLogin"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"LoginRequestGql"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"authLogin"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"accessToken"}},{"kind":"Field","name":{"kind":"Name","value":"refreshToken"}}]}}]}}]} as unknown as DocumentNode<AuthLoginMutation, AuthLoginMutationVariables>;
export const AuthLogoutDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AuthLogout"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"authLogout"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ok"}}]}}]}}]} as unknown as DocumentNode<AuthLogoutMutation, AuthLogoutMutationVariables>;
export const AuthRefreshAccessTokenDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AuthRefreshAccessToken"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"authRefreshAccessToken"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"accessToken"}}]}}]}}]} as unknown as DocumentNode<AuthRefreshAccessTokenMutation, AuthRefreshAccessTokenMutationVariables>;
export const AuthRegisterDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AuthRegister"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"RegisterRequestGql"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"authRegister"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ok"}}]}}]}}]} as unknown as DocumentNode<AuthRegisterMutation, AuthRegisterMutationVariables>;
export const FileGetDownloadLinkDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"FileGetDownloadLink"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"FileIdRequestGql"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"fileInetDownloadLink"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"downloadUrl"}},{"kind":"Field","name":{"kind":"Name","value":"expiresIn"}}]}}]}}]} as unknown as DocumentNode<FileGetDownloadLinkQuery, FileGetDownloadLinkQueryVariables>;
export const FileGetUserFilesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"FileGetUserFiles"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"fileGetUserFiles"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"files"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"originalName"}},{"kind":"Field","name":{"kind":"Name","value":"contentType"}},{"kind":"Field","name":{"kind":"Name","value":"size"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]}}]} as unknown as DocumentNode<FileGetUserFilesQuery, FileGetUserFilesQueryVariables>;
export const FileInitializeUploadDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"FileInitializeUpload"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UploadRequestGql"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"fileInitializeUpload"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"fileId"}},{"kind":"Field","name":{"kind":"Name","value":"uploadUrl"}},{"kind":"Field","name":{"kind":"Name","value":"fileKey"}}]}}]}}]} as unknown as DocumentNode<FileInitializeUploadMutation, FileInitializeUploadMutationVariables>;