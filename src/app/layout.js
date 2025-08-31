import './globals.css';

export const metadata = {
  title: 'Vaishnavi Photography',
  description: 'Capture Your Moments with Vaishnavi Photography',
    icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <main className="main-content">
          {children}
        </main>
      </body>
    </html>
  );
}