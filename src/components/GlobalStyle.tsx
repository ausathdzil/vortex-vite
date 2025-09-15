import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
	body {
		background: var(--background);
		color: var(--foreground);
		font-family: var(--font-sans);

		letter-spacing: var(--tracking-normal);
	}

	button:not(:disabled),
  [role="button"]:not(:disabled) {
    cursor: pointer;
  }
`;
