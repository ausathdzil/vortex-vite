import styled from 'styled-components';

export const Select = styled.select`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: calc(var(--spacing) * 2);
  padding: calc(var(--spacing) * 2) calc(var(--spacing) * 3);

  background-color: transparent;
  font-size: var(--text-sm);
  white-space: nowrap;
  width: fit-content;
  border: 1px solid var(--input);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-xs);
  outline: none;
`;
