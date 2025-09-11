import { useQuery } from '@tanstack/react-query';
import {
  ContentWrapper,
  Header,
  Main,
  Title,
} from '../components/SharedStyles';
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
  return (
    <ContentWrapper>
      <Header>
        <Title>News</Title>
      </Header>
      <Main>
        <NewsTable />
      </Main>
    </ContentWrapper>
  );
}

function NewsTable() {
  const { isPending, error, data } = useQuery({
    queryKey: ['news'],
    queryFn: () => getNews({}),
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
              <TableCell>{item.publish_date}</TableCell>
              <TableCell>{item.province}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
