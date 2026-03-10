import { useMutation } from '@tanstack/react-query';
import { gqlClient } from '@/shared/api/graphql-client';
import { AuthRefreshAccessTokenDocument } from '@/shared/api/generated/graphql';
import { queryKeys } from '@/shared/api/query-keys';

export function useAuthRefresh() {
  return useMutation({
    mutationKey: [...queryKeys.auth, 'refresh'],
    mutationFn: () => gqlClient.request(AuthRefreshAccessTokenDocument),
  });
}