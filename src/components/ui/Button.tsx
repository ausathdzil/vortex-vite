import styled from 'styled-components';

export const Button = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: calc(var(--spacing) * 2);
  white-space: nowrap;
  font-size: var(--text-sm);
  font-weight: 500;

  &:disabled {
    pointer-events: none;
    opacity: 0.5;
  }

  background-color: var(--primary);
  color: var(--primary-foreground);
  box-shadow: var(--shadow-xs);

  &:hover {
    background-color: color-mix(in oklab, var(--primary) 90%, transparent);
  }

  height: calc(var(--spacing) * 9);
  padding: calc(var(--spacing) * 2) calc(var(--spacing) * 4);
`;

export const OutlinedButton = styled(Button)`
  border: 1px solid var(--border);
  background-color: var(--background);
  color: var(--foreground);

  &:hover {
    background-color: var(--accent);
    color: var(--accent-foreground);
  }
`;
