"use client";

import styles from "./Card.module.scss";
import Author from "@/components/Author";
import { ArticleInterface } from "@/interfaces/article";
import { formatDate } from "@/lib/dates";
import Link from "next/link";
import { ROUTES } from "@/constants/routes";
import { useTranslations } from "next-intl";
import { getImage } from "@/strapi";
import Article from "@/components/Article/ index";
import Lightbox from "@/components/Lightbox";
import React, { useState } from "react";
import clsx from "clsx";
import { ImageSize } from "@/enums/imageSize";
import ShareButtons from "@/components/ShareButtons";

type CardProps = {
  article: ArticleInterface;
  showFull?: boolean;
};

const CardInner = ({ article, showFull }: CardProps) => {
  const t = useTranslations();

  const [isOpen, setIsOpen] = useState(false);
  const imageLarge = getImage(article.image, ImageSize.large);
  const imagePreview = getImage(article.image, ImageSize.medium);
  const closeLightbox = () => setIsOpen(false);
  const openLightbox = () => setIsOpen(true);

  return (
    <>
      {showFull ? (
        <h1 className={styles.title}>{article.title}</h1>
      ) : (
        <h2 className={styles.title}>{article.title}</h2>
      )}
      <span className={styles.description}>{article.description}</span>
      {article?.image && (
        <>
          <img
            className={clsx(styles.image, {
              [styles.lightbox]: showFull,
            })}
            src={imagePreview}
            style={showFull ? {} : { maxHeight: 300, objectFit: "cover" }}
            alt={article.title}
            width={200}
            height={100}
            onClick={openLightbox}
          />
          {showFull && (
            <Lightbox
              isOpen={isOpen}
              imageSrc={imageLarge}
              closeLightbox={closeLightbox}
              navigation={false}
            />
          )}
        </>
      )}
      {showFull ? (
        <>
          <Article html={article.text} />
          <ShareButtons
            url={`${process.env.NEXT_PUBLIC_DOMAIN}${ROUTES.ARTICLE(article.slug)}`}
            title={article.title}
          />
        </>
      ) : (
        <span className={styles.link}>{t("show-more")} 👈</span>
      )}
    </>
  );
};

const Card = ({ article, showFull = false }: CardProps) => {
  const date = formatDate(article.publishedAt);

  return (
    <article className={styles.card}>
      <Author author={article.author} date={date} category={article.category} />
      {showFull ? (
        <div className={styles.inner}>
          <CardInner article={article} showFull={showFull} />
        </div>
      ) : (
        <Link
          href={ROUTES.ARTICLE(article.slug)}
          className={`${styles.inner} ${styles.innerLink}`}
        >
          <CardInner article={article} showFull={showFull} />
        </Link>
      )}
    </article>
  );
};

export default Card;
