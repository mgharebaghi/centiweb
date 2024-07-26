import type { Metadata } from "next";
import "./globals.css";
import { CssBaseline } from "@mui/material";
import Menu from "./components/menu";
import Footer from "./components/footer";

export const metadata: Metadata = {
  title: "Centichain: no miners,no stakers,no problem",
  description: "A blockchain network that is easy",
};

const title = "Centichain: No Mining,No Staking,No Problem";
const description = "A blockchain network that is easy";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/icons/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/icons/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/icons/favicon-16x16.png"
        />
        <link
          rel="mask-icon"
          href="/icons/safari-pinned-tab.svg"
          color="#5bbad5"
        />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />
        {/* Open Graph meta tags for Facebook, LinkedIn, etc. */}
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content="/images/social--card.png" />
        <meta property="og:url" content="https://centichain.org" />

        {/* Twitter meta tags */}
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content="/images/social--card.png" />
        <meta name="twitter:card" content="summary_large_image" />
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
