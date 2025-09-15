import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router';
import { useDebouncedCallback } from 'use-debounce';

import {
  ContentWrapper,
  Header,
  Main,
  Title,
} from '@/components/SharedStyles.tsx';
import { Input } from '@/components/ui/Input.tsx';
import { Pagination } from '@/components/ui/Pagination';
import { Skeleton } from '@/components/ui/Skeleton.tsx';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/Table.tsx';
import { getNews } from '@/lib/data/news.ts';
import { formatDate } from '@/lib/utils.ts';

export default function News() {
  const [searchParams] = useSearchParams();

  return (
    <ContentWrapper>
      <Header>
        <Title>News</Title>
      </Header>
      <Main className="space-y-6">
        <SearchInput />
        <NewsTable searchParams={searchParams} />
      </Main>
    </ContentWrapper>
  );
}

function SearchInput() {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q');

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', '1');
    if (term) {
      params.set('q', term);
    } else {
      params.delete('q');
      params.delete('page');
    }

    setSearchParams(params);
  }, 500);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleSearch(e.target.value);
  };

  return (
    <Input
      defaultValue={query ?? ''}
      id="q"
      name="q"
      onChange={handleChange}
      placeholder="Search news"
      type="search"
    />
  );
}

function NewsTable({ searchParams }: { searchParams: URLSearchParams }) {
  const query = searchParams.get('q');
  const page = searchParams.get('page');
  const size = searchParams.get('size');

  const { isPending, error, data } = useQuery({
    queryKey: ['news', query, page, size],
    queryFn: () =>
      getNews({
        q: query ?? undefined,
        page: page ?? undefined,
        size: size ?? '10',
      }),
  });

  if (isPending) {
    return <Skeleton className="size-full" />;
  }

  if (error) {
    return (
      <p>
        Error: <span className="text-destructive">{error.message}</span>
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Author</TableHead>
            <TableHead>Publish Date</TableHead>
            <TableHead>Province</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.data.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.title}</TableCell>
              <TableCell>{item.author}</TableCell>
              <TableCell>{formatDate(item.publish_date)}</TableCell>
              <TableCell>{item.province}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Pagination
        count={data.count}
        page={data.page}
        size={data.size}
        total_pages={data.total_pages}
        has_next={data.has_next}
        has_prev={data.has_prev}
      />
    </div>
  );
}
