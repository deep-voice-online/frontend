/* eslint-disable */
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
};

export type ConfirmRegisterRequestGql = {
  code: Scalars['Float']['input'];
  email: Scalars['String']['input'];
};

export type DownloadLinkResponseGql = {
  __typename?: 'DownloadLinkResponseGql';
  downloadUrl: Scalars['String']['output'];
  expiresIn: Scalars['Float']['output'];
};

export type FileIdRequestGql = {
  fileId: Scalars['String']['input'];
};

export type FileInfoGql = {
  __typename?: 'FileInfoGql';
  contentType: Scalars['String']['output'];
  /** ISO дата создания */
  createdAt: Scalars['String']['output'];
  fileKey: Scalars['String']['output'];
  id: Scalars['String']['output'];
  originalName: Scalars['String']['output'];
  size: Scalars['Float']['output'];
  /** UPLOADING, READY, DELETED */
  status: Scalars['String']['output'];
  userId: Scalars['String']['output'];
};

export type FileListResponseGql = {
  __typename?: 'FileListResponseGql';
  files: Array<FileInfoGql>;
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
  authRefresh: JwtResponseGql;
  authRegister: SuccessResponseGql;
  fileInitializeUpload: UploadResponseGql;
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

export type Query = {
  __typename?: 'Query';
  fileGetFileInfo: FileInfoGql;
  fileGetUserFiles: FileListResponseGql;
  fileInetDownloadLink: DownloadLinkResponseGql;
  ping: Scalars['String']['output'];
};


export type QueryFileGetFileInfoArgs = {
  data: FileIdRequestGql;
};


export type QueryFileGetUserFilesArgs = {
  data: UserFileRequestGql;
};


export type QueryFileInetDownloadLinkArgs = {
  data: FileIdRequestGql;
};

export type RegisterRequestGql = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type SuccessResponseGql = {
  __typename?: 'SuccessResponseGql';
  ok: Scalars['Boolean']['output'];
};

export type UploadRequestGql = {
  contentType: Scalars['String']['input'];
  fileName: Scalars['String']['input'];
  fileSize: Scalars['Float']['input'];
  userId: Scalars['String']['input'];
};

export type UploadResponseGql = {
  __typename?: 'UploadResponseGql';
  fileId: Scalars['String']['output'];
  fileKey: Scalars['String']['output'];
  uploadUrl: Scalars['String']['output'];
};

export type UserFileRequestGql = {
  userId: Scalars['String']['input'];
};
