import type { Metadata } from "next";
import "./globals.css";
import { CssBaseline } from "@mui/material";
import Menu from "./components/menu";
import Footer from "./components/footer";

export const metadata: Metadata = {
  title: {
    default: "Centichain: No Mining,No Staking,No Problem",
    template: "%s | Centichain",
  },
  description: "A blockchain network that is easy",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="apple-touch-icon" sizes="180x180" href="/icons/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/icons/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/icons/favicon-16x16.png" />
        <link rel="mask-icon" href="/icons/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />
        {/* Open Graph meta tags for Facebook, LinkedIn, etc. */}
        <meta property="og:title" content="Centichain: No Mining,No Staking,No Problem" />
        <meta property="og:description" content="A blockchain network that is easy" />
        <meta property="og:image" content="https://centichain.org/images/Logo.png" />
        <meta property="og:url" content="https://centichain.org" />
        <meta property="og:type" content="website" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />

        {/* Twitter meta tags */}
        <meta name="twitter:title" content="Centichain: No Mining,No Staking,No Problem" />
        <meta name="twitter:description" content="A blockchain network that is easy" />
        <meta name="twitter:image" content="https://centichain.org/images/Logo.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@centichain" />
      </head>
      <body>
        <CssBaseline />
        <Menu />
        {children}
        <Footer />
      </body>
    </html>
  );
}
