import * as React from "react";
import { Article as ArticleType, Newsletter as NewsletterType } from "@spyrothon/api";
import { Anchor, Card, Header, Markdown, Text } from "@spyrothon/sparx";

import API from "@app/API";

import FixedWidthLayout from "../layouts/FixedWidthLayout";

import styles from "./Newsletter.module.css";

interface ArticleProps {
  article: ArticleType;
}

function Article(props: ArticleProps) {
  const { article } = props;

  return (
    <section className={styles.article}>
      <Header tag="h2" id={article.id}>
        {article.title}
      </Header>
      {article.authorName != null ? (
        <Text variant="text-md/secondary">by {article.authorName}</Text>
      ) : null}
      <Markdown>{article.content}</Markdown>
    </section>
  );
}

interface NewsletterProps {
  newsletterId: string;
}

export default function Newsletter(props: NewsletterProps) {
  const { newsletterId } = props;
  const [newsletter, setNewsletter] = React.useState<NewsletterType | undefined>();

  React.useEffect(() => {
    (async () => {
      const newsletter = await API.publishing.fetchNewsletter(newsletterId);
      setNewsletter(newsletter);
    })();
  }, [newsletterId]);

  if (newsletter == null) return null;

  const articles = newsletter.publications
    .sort((a, b) => a.priority - b.priority)
    .map((pub) => newsletter.articles.find((article) => article.id === pub.articleId)!);

  return (
    <FixedWidthLayout>
      <div className={styles.container}>
        <main className={styles.newsletterContent}>
          <Header tag="h1">{newsletter.title}</Header>
          <Text variant="text-lg/secondary">
            Published {newsletter.publishedAt?.toLocaleDateString()}
          </Text>

          <Markdown>{newsletter.introduction}</Markdown>

          {articles.map((article) => (
            <Article key={article.id} article={article} />
          ))}
        </main>
        <Card className={styles.sidebar}>
          <Header tag="h2" variant="header-md/normal">
            Articles
          </Header>
          <ul>
            {articles.map((article) => (
              <li key={article.id}>
                <Anchor href={`#${article.id}`}>{article.title}</Anchor>
              </li>
            ))}
          </ul>

          <Header tag="h2" variant="header-md/normal">
            Contact
          </Header>
          <Text variant="text-sm/normal">
            If you have ideas for things we should write about next, let us know!
          </Text>
          <ul>
            <li>
              <Text variant="text-sm/normal">
                Twitter: <Anchor href="https://twitter.com/spyrothon">@spyrothon</Anchor>
              </Text>
            </li>
            <li>
              <Text variant="text-sm/normal">
                Twitch: <Anchor href="https://twitch.tv/spyrothon">Spyrothon</Anchor>
              </Text>
            </li>
            <li>
              <Text variant="text-sm/normal">
                <Anchor href="https://discord.gg/fCvfnfk">Discord</Anchor>
              </Text>
            </li>
            <li>
              <Text variant="text-sm/normal">
                <Anchor href="https://youtube.com/channel/UCq-pkx-6-BB1Ns7ETmzY6-g">YouTube</Anchor>
              </Text>
            </li>
          </ul>

          <Header tag="h2" variant="header-md/normal">
            Other Links
          </Header>
          <ul>
            <li>
              <Anchor href="https://speedrun.com/spyro">Speedrun Leaderboards</Anchor>
            </li>
            <li>
              <Anchor href="https://discord.gg/spyrospeedrunning">
                Spyro Speedrunning Discord
              </Anchor>
            </li>
          </ul>
        </Card>
      </div>
    </FixedWidthLayout>
  );
}
