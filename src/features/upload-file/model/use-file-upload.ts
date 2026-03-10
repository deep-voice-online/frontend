import { useCallback } from 'react';
import { gqlClient } from '@/shared/api/graphql-client';
import {
  FileGetDownloadLinkDocument,
  TranscribeProcessDocument,
} from '@/shared/api/generated/graphql';
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

      const { fileInitializeUpload } = result as {
        fileInitializeUpload: { uploadUrl: string; fileId: string };
      };

      await uploadFileToS3(
        file,
        fileInitializeUpload.uploadUrl,
        file.type || 'application/octet-stream'
      );

      const { fileInetDownloadLink } = (await gqlClient.request(
        FileGetDownloadLinkDocument,
        { data: { fileId: fileInitializeUpload.fileId } }
      )) as { fileInetDownloadLink: { downloadUrl: string } };

      await gqlClient.request(TranscribeProcessDocument, {
        data: { downloadUrl: fileInetDownloadLink.downloadUrl },
      });

      return { fileId: fileInitializeUpload.fileId };
    },
    [initializeUpload]
  );

  return { uploadFile };
}
