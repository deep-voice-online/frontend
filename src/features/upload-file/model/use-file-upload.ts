import { useCallback } from 'react';
import { useFileInitializeUpload } from '../api/use-file-initialize-upload';
import { uploadFileToS3 } from '../lib/upload-to-s3';

export function useFileUpload() {
  const { mutateAsync: initializeUpload } = useFileInitializeUpload();

  const uploadFile = useCallback(
    async (file: File): Promise<{ fileId: string }> => {
      const result = await initializeUpload({
        fileName: file.name,
        contentType: file.type || 'application/octet-stream',
        fileSize: file.size,
      });

      const { fileInitializeUpload } = result as { fileInitializeUpload: { uploadUrl: string; fileId: string } };

      await uploadFileToS3(
        file,
        fileInitializeUpload.uploadUrl,
        file.type || 'application/octet-stream'
      );

      return { fileId: fileInitializeUpload.fileId };
    },
    [initializeUpload]
  );

  return { uploadFile };
}
