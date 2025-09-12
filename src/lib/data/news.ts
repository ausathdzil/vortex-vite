import type { News, NewsParams, ProvinceSummary } from '../types/news.ts';

const API_URL: string | undefined = import.meta.env.VITE_API_URL;

export async function getNews(params: Partial<NewsParams>): Promise<News> {
  if (!API_URL) {
    throw new Error('VITE_API_URL is not set');
  }

  const searchParams = new URLSearchParams();
  if (params.q) {
    searchParams.set('q', params.q);
  }
  if (params.page) {
    searchParams.set('page', params.page);
  }
  if (params.size) {
    searchParams.set('size', params.size);
  } else {
    searchParams.set('size', '10');
  }
  if (params.province) {
    searchParams.set('province', params.province);
  }
  if (params.topic_id) {
    searchParams.set('topic_id', params.topic_id);
  }

  const response = await fetch(`${API_URL}/news?${searchParams.toString()}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch news');
  }

  const data = await response.json();
  return data;
}

export async function getProvinceSummary(): Promise<ProvinceSummary[]> {
  if (!API_URL) {
    throw new Error('VITE_API_URL is not set');
  }

  const response = await fetch(`${API_URL}/news/province-summary-with-cities`, {
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
