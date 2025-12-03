export async function customFetch(
  input: string | URL | Request,
  init?: RequestInit,
) {
  return fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}${input}`, init);
}
