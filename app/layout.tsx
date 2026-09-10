import type { Metadata } from 'next';
import '../src/styles/globals.css';

export const metadata: Metadata = {
  title: 'Mohammed Zain Khazi | Full-Stack & AI Software Engineer',
  description: 'Portfolio of Mohammed Zain Khazi — Full-Stack Software Engineer specializing in Next.js, React, Node.js, Cloud, and AI integrations.',
  keywords: ['Mohammed Zain Khazi', 'Zain Khazi', 'Software Engineer', 'Full-Stack Developer', 'Next.js', 'React', 'Shell', 'AI Specialist'],
  openGraph: {
    title: 'Mohammed Zain Khazi | Software Engineer',
    description: 'Full-Stack Software Development Engineer crafting exceptional digital experiences and AI solutions.',
    url: 'https://MohammedZainKhazi.web.app',
    siteName: 'Mohammed Zain Khazi Portfolio',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.2/css/all.min.css" crossOrigin="anonymous" />
      </head>
      <body className="bg-[#020208] text-foreground antialiased selection:bg-cyan-500/30 selection:text-cyan-200">
        {children}
      </body>
    </html>
  );
}

