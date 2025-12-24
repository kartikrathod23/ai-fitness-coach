export async function fetchGeneratedImage(id: string) {
  const res = await fetch(`/api/poll-image?id=${id}`);
  const data = await res.json();
  return data;
}
