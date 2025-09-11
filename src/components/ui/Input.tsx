import styled from 'styled-components';

export const Input = styled.input`
  border: 1px solid var(--input);
  display: flex;
  height: calc(var(--spacing) * 9);
  width: 100%;
  min-width: 0;
  border-radius: var(--radius-md);
  background: var(--bg-transparent);
  padding: calc(var(--spacing) * 1) calc(var(--spacing) * 3);
  font-size: var(--text-base);
  box-shadow: var(--shadow-xs);
  outline: none;

  &:disabled {
    pointer-events: none;
    cursor: not-allowed;
    opacity: 0.5;
  }

  &::placeholder {
    color: var(--muted-foreground);
  }
  &::selection {
    background: var(--primary);
    color: var(--primary-foreground);
  }
  &:focus-visible {
    border: 1px solid var(--ring);
    outline: none;
  }
`;
