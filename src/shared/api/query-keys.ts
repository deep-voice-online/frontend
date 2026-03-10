export const queryKeys = {
  auth: ['auth'] as const,
  files: {
    all: ['files'] as const,
    list: () => [...queryKeys.files.all, 'list'] as const,
  },
};
