export async function uploadToS3(url: string, file: File) {
  const { status } = await fetch(url, {
    method: 'PUT',
    body: file,
    headers: {
      'Content-Length': String(file.size),
    },
  });

  return status === 200;
}
