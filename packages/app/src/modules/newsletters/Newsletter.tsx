import * as React from "react";
import { Remark } from "react-remark";

import { APIClient, Article as ArticleType, Newsletter as NewsletterType } from "@spyrothon/api";
import { Anchor, Header, Text } from "@spyrothon/uikit";
import FixedWidthLayout from "../layouts/FixedWidthLayout";

import styles from "./Newsletter.module.css";

interface ArticleProps {
  article: ArticleType;
}

function Article(props: ArticleProps) {
  const { article } = props;

  return (
    <section className={styles.article}>
      <Header marginless id={article.id} size={Header.Sizes.H2}>
        {article.title}
      </Header>
      {article.authorName != null ? (
        <Text marginless size={Text.Sizes.SIZE_16} color={Text.Colors.MUTED}>
          by {article.authorName}
        </Text>
      ) : null}
      <Remark>{article.content}</Remark>
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
      const newsletter = await APIClient.fetchNewsletter(newsletterId);
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
          <Header size={Header.Sizes.H1} marginless>
            {newsletter.title}
          </Header>
          <Text size={Text.Sizes.SIZE_20} color={Text.Colors.MUTED}>
            Published {newsletter.publishedAt?.toLocaleDateString()}
          </Text>

          <Remark>{newsletter.introduction}</Remark>

          {articles.map((article) => (
            <Article key={article.id} article={article} />
          ))}
        </main>
        <aside className={styles.sidebar}>
          <Header size={Header.Sizes.H4} className={styles.sidebarHeader}>
            Articles
          </Header>
          <ul>
            {articles.map((article) => (
              <li key={article.id}>
                <a href={`#${article.id}`}>{article.title}</a>
              </li>
            ))}
          </ul>

          <Header size={Header.Sizes.H4} className={styles.sidebarHeader}>
            Contact
          </Header>
          <p>If you have ideas for things we should write about next, let us know!</p>
          <ul>
            <li>
              Twitter: <Anchor href="https://twitter.com/spyrothon">@spyrothon</Anchor>
            </li>
            <li>
              Twitch: <Anchor href="https://twitch.tv/spyrothon">Spyrothon</Anchor>
            </li>
            <li>
              <Anchor href="https://discord.gg/fCvfnfk">Discord</Anchor>
            </li>
            <li>
              <Anchor href="https://youtube.com/channel/UCq-pkx-6-BB1Ns7ETmzY6-g">YouTube</Anchor>
            </li>
          </ul>

          <Header size={Header.Sizes.H4} className={styles.sidebarHeader}>
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
        </aside>
      </div>
    </FixedWidthLayout>
  );
}
