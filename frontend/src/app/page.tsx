import Cards from "@/components/Cards";
import Sidebar from "@/components/Sidebar";
import { getArticles, getMainPage } from "@/api/facade";
import { ArticleInterface } from "@/interfaces/article";
import { notFound } from "next/navigation";
import { metadata } from "@/app/layout";
import { PaginationStrapi } from "@/interfaces/strapi";
import { ARTICLE_PAGE_SIZE } from "@/constants/common";

export default async function HomePage() {
  let data: ArticleInterface[];
  let pagination: PaginationStrapi;

  try {
    const articles = await getArticles({
      pagination: { pageSize: ARTICLE_PAGE_SIZE },
    });
    data = articles.data;
    pagination = articles.meta.pagination;

    if (!data) {
      notFound();
    }
  } catch {
    notFound();
  }

  return (
    <>
      <Sidebar />
      <Cards data={data} pagination={pagination} />
    </>
  );
}

export async function generateMetadata() {
  const seo = await getMainPage();
  return {
    title: seo?.metaTitle || metadata.title,
    description: seo?.metaDescription || metadata.description,
  };
}
