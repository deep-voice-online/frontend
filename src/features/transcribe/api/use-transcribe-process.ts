import { useMutation } from '@tanstack/react-query';
import { gqlClient } from '@/shared/api/graphql-client';
import { TranscribeProcessDocument } from '@/shared/api/generated/graphql';
import type { TranscribeProcessRequestGql } from '@/shared/api/generated/graphql';
import { queryKeys } from '@/shared/api/query-keys';

export function useTranscribeProcess() {
  return useMutation({
    mutationKey: [...queryKeys.files.all, 'transcribe'],
    mutationFn: (data: TranscribeProcessRequestGql) =>
      gqlClient.request(TranscribeProcessDocument, { data }),
  });
}
