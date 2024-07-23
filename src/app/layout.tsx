// Import styles of packages that you've installed.
// All packages except `@mantine/hooks` require styles imports
import '@mantine/core/styles.css';

import { ColorSchemeScript, MantineProvider } from '@mantine/core';
import { Alert } from '@/lib/ui/Alert';

export const metadata = {
  title: 'wibu lover',
  description: 'pecinta wibu',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
      </head>
      <body>
        <MantineProvider>
          {children}
          <Alert />
        </MantineProvider>
      </body>
    </html>
  );
}