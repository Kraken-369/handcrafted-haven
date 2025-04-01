import "./globals.css";
import Footer from './ui/footer';
export const metadata = {
  title: 'Handcrafted Haven',
  description: 'Welcome to Handcrafted Haven',
};

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
};

export default Layout;