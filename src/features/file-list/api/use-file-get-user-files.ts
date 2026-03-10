import { useQuery } from '@tanstack/react-query';
import { gqlClient } from '@/shared/api/graphql-client';
import { FileGetUserFilesDocument } from '@/shared/api/generated/graphql';
import { queryKeys } from '@/shared/api/query-keys';

export function useFileGetUserFiles() {
  return useQuery({
    queryKey: queryKeys.files.list(),
    queryFn: () => gqlClient.request(FileGetUserFilesDocument),
    staleTime: 30_000,
  });
}
