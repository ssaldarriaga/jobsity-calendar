type Theme = {
  header: string;
  secondaryButton: string;
  secondaryText: string;
  primaryButton: string;
  primaryText: string;
  shadow?: string;
};

export const THEME: { dark: Theme } = {
  dark: {
    header: '#1d2d50',
    primaryButton: '#133b5c',
    secondaryButton: '#fcdab7',
    primaryText: '#fcdab7',
    secondaryText: '#cdd0cb',
    shadow: '#00000036',
  },
};
