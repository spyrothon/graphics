import * as React from "react";
import { Newsletter } from "@spyrothon/api";
import { Anchor, Card, Header, Stack, Text } from "@spyrothon/sparx";

import { Routes } from "@admin/Constants";
import useSafeDispatch from "@admin/hooks/useDispatch";
import { useSafeSelector } from "@admin/Store";

import { fetchNewsletters } from "./PublishingActions";
import * as PublishingStore from "./PublishingStore";

import styles from "./NewslettersIndex.module.css";

interface NewsletterPreviewProps {
  newsletter: Newsletter;
}

function NewsletterPreviw(props: NewsletterPreviewProps) {
  const { newsletter } = props;

  return (
    <Card className={styles.preview}>
      <Stack spacing="space-lg">
        <Header tag="h2">{newsletter.title}</Header>
        <Text className={styles.previewTitle}>{newsletter.introduction}</Text>
        <Stack direction="horizontal" align="center" justify="end">
          <Text>{newsletter.articles.length} Articles</Text>
          <Text>{newsletter.publishedAt?.toLocaleString()}</Text>
          <Anchor
            href={Routes.PUBLISHING_NEWSLETTERS_EDIT(newsletter.id)}
            className={styles.editButton}>
            Edit
          </Anchor>
        </Stack>
      </Stack>
    </Card>
  );
}

export default function NewslettersIndex() {
  const dispatch = useSafeDispatch();
  const newsletters = useSafeSelector(PublishingStore.getNewsletters);

  React.useEffect(() => {
    dispatch(fetchNewsletters());
  }, [dispatch]);

  return (
    <Stack spacing="space-lg" className={styles.container}>
      <Anchor href={Routes.PUBLISHING_NEWSLETTERS_NEW}>New Newsletter</Anchor>
      {newsletters.map((newsletter) => (
        <NewsletterPreviw newsletter={newsletter} key={newsletter.id} />
      ))}
    </Stack>
  );
}
