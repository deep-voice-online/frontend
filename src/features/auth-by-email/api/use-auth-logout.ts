import { useMutation } from '@tanstack/react-query';
import { gqlClient } from '@/shared/api/graphql-client';
import { AuthLogoutDocument } from '@/shared/api/generated/graphql';
import { queryKeys } from '@/shared/api/query-keys';

export function useAuthLogout() {
  return useMutation({
    mutationKey: [...queryKeys.auth, 'logout'],
    mutationFn: () => gqlClient.request(AuthLogoutDocument),
  });
}