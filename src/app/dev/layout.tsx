import "../globals.css";

export const metadata = {
  title: "Internal — Unik",
  robots: { index: false, follow: false },
};

export default function DevRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
