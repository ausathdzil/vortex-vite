const API_URL: string | undefined = import.meta.env.VITE_API_URL;

export async function getProvinceSummary() {
  if (!API_URL) {
    throw new Error('VITE_API_URL is not set');
  }

  const response = await fetch(`${API_URL}/news/province-summary`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch province summary');
  }

  const { data } = await response.json();
  return data;
}
