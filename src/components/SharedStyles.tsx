import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  height: 100vh;
`;

export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

export const Header = styled.header`
  padding: calc(var(--spacing) * 4);
  border-bottom: 1px solid var(--border);
`;

export const Main = styled.main`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: calc(var(--spacing) * 4);
`;

export const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: 600;
`;
