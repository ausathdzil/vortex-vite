import styled from 'styled-components';

export const Card = styled.div`
  display: flex;
  flex-direction: column;
  gap: calc(var(--spacing) * 6);

  background: var(--card);
  color: var(--card-foreground);
  border: 1px solid var(--border);
  border-radius: var(--radius-xl);
  padding: calc(var(--spacing) * 6) 0;
  box-shadow: var(--shadow-sm);
`;

export const CardHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: calc(var(--spacing) * 1.5);

  border-bottom: 1px solid var(--border);
  padding: 0 calc(var(--spacing) * 6);
  padding-bottom: calc(var(--spacing) * 6);
`;

export const CardTitle = styled.h2`
  line-height: 1;
  font-weight: 600;
`;

export const CardContent = styled.div`
  flex: 1;
  padding: 0 calc(var(--spacing) * 6);
`;
