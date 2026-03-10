import { useMutation } from '@tanstack/react-query';
import { gqlClient } from '@/shared/api/graphql-client';
import { AuthLoginDocument } from '@/shared/api/generated/graphql';
import type { LoginRequestGql } from '@/shared/api/generated/graphql';
import { queryKeys } from '@/shared/api/query-keys';

export function useAuthLogin() {
  return useMutation({
    mutationKey: [...queryKeys.auth, 'login'],
    mutationFn: (data: LoginRequestGql) =>
      gqlClient.request(AuthLoginDocument, { data }),
  });
}
