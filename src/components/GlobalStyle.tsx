import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
	body {
		background: var(--background);
		color: var(--foreground);
		font-family: var(--font-inter);

		letter-spacing: var(--tracking-normal);
	}
`;
