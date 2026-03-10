export async function uploadFileToS3(
  file: File,
  uploadUrl: string,
  contentType: string
): Promise<void> {
  const response = await fetch(uploadUrl, {
    method: 'PUT',
    body: file,
    headers: {
      'Content-Type': contentType,
    },
  });

  if (!response.ok) {
    throw new Error(`Ошибка загрузки в S3: ${response.status} ${response.statusText}`);
  }
}
