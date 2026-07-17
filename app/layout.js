import './globals.css';

export const metadata = {
  title: 'Нурдаулет Бейсенбек — веб-разработчик',
  description: 'Портфолио Нурдаулета Бейсенбека: веб-разработка и ML.',
};

export default function RootLayout({ children }) {
  return <html lang="ru"><body>{children}</body></html>;
}
