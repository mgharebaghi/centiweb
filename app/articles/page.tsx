'use client'
import { useRouter } from "next/navigation";
import { useEffect } from "react";

function ArticlePage() {
  const route = useRouter();
  useEffect(() => {
    route.push("/");
  }, []);
  return <div className="min-h-[750px] pt-[100px]"></div>;
}

export default ArticlePage;
