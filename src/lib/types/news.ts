export type CitySummary = {
  city: string;
  article_count: number;
};

export type ProvinceSummary = {
  province: string;
  article_count: number;
  cities: CitySummary[];
};

export type NewsParams = {
  q: string;
  page: string;
  size: string;
  province: string;
  topic_id: string;
};

export type Article = {
  title: string;
  author: string;
  publish_date: string;
  article_text: string;
  url: string;
  main_image: string;
  province: string;
  latitude: number;
  longitude: number;
  id: number;
  rank: number;
};

export type News = {
  data: Article[];
  count: number;
  page: number;
  size: number;
  total_pages: number;
  has_next: boolean;
  has_prev: boolean;
};
