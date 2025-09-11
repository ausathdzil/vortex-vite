import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router';
import { useDebouncedCallback } from 'use-debounce';

import {
  ContentWrapper,
  Header,
  Main,
  Title,
} from '../components/SharedStyles';
import { Input } from '../components/ui/Input';
import { Skeleton } from '../components/ui/Skeleton';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../components/ui/Table';
import { getNews } from '../lib/data/news';

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

  const handleChange = useDebouncedCallback((term: string) => {
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

  return (
    <Input
      defaultValue={query ?? ''}
      id="q"
      name="q"
      onChange={(e) => handleChange(e.target.value)}
      placeholder="Search news"
      type="search"
    />
  );
}

function NewsTable({ searchParams }: { searchParams: URLSearchParams }) {
  const query = searchParams.get('q');
  const page = searchParams.get('page');

  const { isPending, error, data } = useQuery({
    queryKey: ['news', query, page],
    queryFn: () => getNews({ q: query ?? undefined, page: page ?? undefined }),
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
    <div className="rounded-md overflow-hidden border border-border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>No</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Author</TableHead>
            <TableHead>Publish Date</TableHead>
            <TableHead>Province</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.data.map((item, index) => (
            <TableRow key={item.id}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{item.title}</TableCell>
              <TableCell>{item.author}</TableCell>
              <TableCell>{formatDate(item.publish_date)}</TableCell>
              <TableCell>{item.province}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString('en-GB', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}
