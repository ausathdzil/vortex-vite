import styled from 'styled-components';

export const Skeleton = styled.div`
  background: var(--accent);
  animation: var(--animate-pulse);
  border-radius: var(--radius-md);

  @keyframes pulse {
    50% {
      opacity: 0.5;
    }
  }
`;
