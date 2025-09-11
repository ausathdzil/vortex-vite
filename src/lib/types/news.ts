export type CitySummary = {
  city: string;
  article_count: number;
};

export type ProvinceSummary = {
  province: string;
  article_count: number;
  cities: CitySummary[];
};
