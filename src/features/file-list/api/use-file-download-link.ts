import { useMutation } from '@tanstack/react-query';
import { gqlClient } from '@/shared/api/graphql-client';
import { FileGetDownloadLinkDocument } from '@/shared/api/generated/graphql';

export function useFileDownloadLink() {
  return useMutation({
    mutationFn: (fileId: string) =>
      gqlClient.request(FileGetDownloadLinkDocument, {
        data: { fileId },
      }),
  });
}
