import '@/app/globals.css';
import { jost, handlee } from './ui/fonts';
import { AuthProvider } from '@/context/AuthContext';

export const metadata = {
  title: 'Handcrafted Haven',
  description: 'Welcome to Handcrafted Haven',
  authors: [
    { name: 'Sariha Selise Hope Shepherd' },
    { name: 'Amauri Ferreira Siqueira' },
    { name: 'Nestor Ramiro Otondo Rios' },
    { name: 'Ivan Josue Romero Bobadilla' },
    { name: 'Pedro Rafael Zelada Soruco' },
  ],
};

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en" className={`${jost.variable} ${handlee.variable}`}>
      <body className="flex flex-col min-h-screen">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
};

export default Layout;
