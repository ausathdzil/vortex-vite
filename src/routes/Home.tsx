import {
  ContentWrapper,
  Header,
  Main,
  Title,
} from '../components/SharedStyles';

const techStack = [
  {
    label: 'React',
    href: 'https://react.dev/',
  },
  {
    label: 'Vite',
    href: 'https://vite.dev/',
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
];

export default function Home() {
  return (
    <ContentWrapper>
      <Header>
        <Title>Home</Title>
      </Header>
      <Main>
        <article className="prose prose-neutral">
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
