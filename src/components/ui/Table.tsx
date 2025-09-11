import styled from 'styled-components';

const TableContainer = styled.div`
  position: relative;
  width: 100%;
  overflow-x: auto;
`;

const StyledTable = styled.table`
  width: 100%;
  caption-side: bottom;
  font-size: var(--text-sm);
`;

export function Table({ className, ...props }: React.ComponentProps<'table'>) {
  return (
    <TableContainer>
      <StyledTable className={className} {...props} />
    </TableContainer>
  );
}

export const TableHeader = styled.thead`
  & > tr {
    border-bottom: 1px solid var(--border);
  }
`;

export const TableBody = styled.tbody`
  & > tr:last-child {
    border: none;
  }
`;

export const TableFooter = styled.tfoot`
  background: color-mix(in oklab, var(--muted) 50%, transparent);
  border-top: 1px solid var(--border);
  font-weight: 500;

  & > tr:last-child {
    border-bottom: none;
  }
`;

export const TableRow = styled.tr`
  border-bottom: 1px solid var(--border);

  &:hover {
    background: color-mix(in oklab, var(--muted) 50%, transparent);
  }
`;

export const TableHead = styled.th`
  color: var(--foreground);
  height: calc(var(--spacing) * 10);
  padding: 0 calc(var(--spacing) * 2);
  text-align: left;
  vertical-align: middle;
  font-weight: 500;
  white-space: nowrap;
`;

export const TableCell = styled.td`
  padding: calc(var(--spacing) * 2);
  vertical-align: middle;
  white-space: nowrap;
`;

export const TableCaption = styled.caption`
  color: var(--muted-foreground);
  margin-top: calc(var(--spacing) * 4);
  font-size: var(--text-sm);
`;
