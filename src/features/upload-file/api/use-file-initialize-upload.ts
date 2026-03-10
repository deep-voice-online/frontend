import { useMutation, useQueryClient } from '@tanstack/react-query';
import { gqlClient } from '@/shared/api/graphql-client';
import { FileInitializeUploadDocument } from '@/shared/api/generated/graphql';
import type { UploadRequestGql } from '@/shared/api/generated/graphql';
import { queryKeys } from '@/shared/api/query-keys';

export function useFileInitializeUpload() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [...queryKeys.files.all, 'initialize'],
    mutationFn: (data: UploadRequestGql) =>
      gqlClient.request(FileInitializeUploadDocument, { data }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.files.list() });
    },
  });
}
