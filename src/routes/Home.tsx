import { Link } from 'react-router';

import { ContentWrapper, Header, Main, Title } from '@/components/SharedStyles';

const routes = [
  {
    label: 'Home',
    href: '/',
  },
  {
    label: 'Dashboard',
    href: '/dashboard',
  },
];

const techStack = [
  {
    label: 'React',
    href: 'https://react.dev/',
  },
  {
    label: 'React Router',
    href: 'https://reactrouter.com/',
  },
  {
    label: 'Styled Components',
    href: 'https://styled-components.com/',
  },
  {
    label: 'Tailwind CSS',
    href: 'https://tailwindcss.com/',
  },
  {
    label: 'Phospor Icons',
    href: 'https://phosphoricons.com/',
  },
  {
    label: 'TanStack Query',
    href: 'https://tanstack.com/query/latest',
  },
  {
    label: 'ECharts',
    href: 'https://echarts.apache.org/',
  },
  {
    label: 'ECharts for React',
    href: 'https://github.com/apache/echarts-for-react',
  },
];

export default function Home() {
  return (
    <ContentWrapper>
      <Header>
        <Title>Home</Title>
      </Header>
      <Main>
        <article className="prose prose-neutral">
          <h2>Routes</h2>
          <ul>
            {routes.map((item, i) => (
              <li key={i}>
                <Link to={item.href}>{item.label}</Link>
              </li>
            ))}
          </ul>
          <h2>Tech Stack</h2>
          <ul>
            {techStack.map((item, i) => (
              <li key={i}>
                <a href={item.href} target="_blank" rel="nooponer noreferrer">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </article>
      </Main>
    </ContentWrapper>
  );
}
