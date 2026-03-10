import { useMutation } from '@tanstack/react-query';
import { gqlClient } from '@/shared/api/graphql-client';
import { AuthRegisterDocument } from '@/shared/api/generated/graphql';
import type { RegisterRequestGql } from '@/shared/api/generated/graphql';
import { queryKeys } from '@/shared/api/query-keys';

export function useAuthRegister() {
  return useMutation({
    mutationKey: [...queryKeys.auth, 'register'],
    mutationFn: (data: RegisterRequestGql) =>
      gqlClient.request(AuthRegisterDocument, { data }),
  });
}