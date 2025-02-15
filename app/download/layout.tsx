import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Download",
  description:
    "Download Centichain software to become a validator or relay node in our innovative blockchain network.",
  openGraph: {
    title: "Download Centichain Software",
    description:
      "Download Centichain software to become a validator or relay node in our innovative blockchain network.",
    images: "/images/Logo.png",
  },
};

export default function DownloadLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
