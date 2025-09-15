import styled from 'styled-components';
import { OutlinedButton } from './Button';
import { Select } from './Select';
import { useSearchParams } from 'react-router';

type PaginationProps = {
  count: number;
  page: number;
  size: number;
  total_pages: number;
  has_next: boolean;
  has_prev: boolean;
};

export function Pagination({
  count,
  page,
  size,
  total_pages,
  has_next,
  has_prev,
}: PaginationProps) {
  const [searchParams, setSearchParams] = useSearchParams();

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', page.toString());
    setSearchParams(params);
  };

  return (
    <PaginationWrapper>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <p>Rows per page:</p>
          <Select>
            <option value="10">5</option>
            <option value="20">10</option>
            <option value="50">20</option>
          </Select>
        </div>
        <p className="[&>span]:text-primary [&>span]:font-medium">
          Showing{' '}
          <span>
            {Math.min((page - 1) * size + 1, count)}-
            {Math.min(page * size, count)}
          </span>{' '}
          of <span>{count}</span>
        </p>
      </div>
      <div className="flex items-center gap-4">
        <p className="[&>span]:text-primary [&>span]:font-medium">
          Page <span>{page}</span> of <span>{total_pages}</span>
        </p>
        <div className="flex items-center gap-2">
          <OutlinedButton disabled={!has_prev} onClick={() => handlePageChange(page - 1)}>
            Previous
          </OutlinedButton>
          <OutlinedButton disabled={!has_next} onClick={() => handlePageChange(page + 1)}>
            Next
          </OutlinedButton>
        </div>
      </div>
    </PaginationWrapper>
  );
}

const PaginationWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: var(--text-sm);
`;
