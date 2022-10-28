import * as React from "react";
import { Article } from "@spyrothon/api";
import { Anchor, Card, Header, Stack, Text } from "@spyrothon/sparx";

import { Routes } from "@admin/Constants";
import useSafeDispatch from "@admin/hooks/useDispatch";
import { useSafeSelector } from "@admin/Store";

import { fetchArticles } from "./PublishingActions";
import * as PublishingStore from "./PublishingStore";

import styles from "./NewslettersIndex.module.css";

interface ArticlePreviewProps {
  article: Article;
}

function ArticlePreview(props: ArticlePreviewProps) {
  const { article } = props;

  return (
    <Card>
      <Stack spacing="space-lg">
        <Header tag="h2">{article.title}</Header>
        <Text className={styles.previewTitle}>{article.content.substring(0, 512)}</Text>
        <div className={styles.previewExtra}>
          {article.publishedAt != null ? (
            <Text>Published {article.publishedAt.toDateString()}</Text>
          ) : null}
          <Text>Updated {article.updatedAt.toDateString()}</Text>
          <Anchor href={Routes.PUBLISHING_ARTICLES_EDIT(article.id)} className={styles.editButton}>
            Edit
          </Anchor>
        </div>
      </Stack>
    </Card>
  );
}

export default function ArticlesIndex() {
  const dispatch = useSafeDispatch();
  const articles = useSafeSelector(PublishingStore.getArticles);

  React.useEffect(() => {
    dispatch(fetchArticles());
  }, [dispatch]);

  return (
    <Stack spacing="space-lg">
      {/* <Anchor href={Routes.PUBLISHING_ARTICLES_NEW}>New Article</Anchor> */}
      {articles.map((article) => (
        <ArticlePreview article={article} key={article.id} />
      ))}
    </Stack>
  );
}
