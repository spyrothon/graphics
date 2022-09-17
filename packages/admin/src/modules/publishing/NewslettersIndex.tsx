import * as React from "react";
import { Newsletter } from "@spyrothon/api";
import { Anchor, Header, NavLink, Text } from "@spyrothon/uikit";

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
    <div className={styles.preview}>
      <Header>{newsletter.title}</Header>
      <Text className={styles.previewTitle}>{newsletter.introduction}</Text>
      <div className={styles.previewExtra}>
        <Text marginless>{newsletter.articles.length} Articles</Text>
        <Text marginless>{newsletter.publishedAt?.toLocaleString()}</Text>
        <Anchor
          href={Routes.PUBLISHING_NEWSLETTERS_EDIT(newsletter.id)}
          className={styles.editButton}>
          Edit
        </Anchor>
      </div>
    </div>
  );
}

export default function NewslettersIndex() {
  const dispatch = useSafeDispatch();
  const newsletters = useSafeSelector(PublishingStore.getNewsletters);

  React.useEffect(() => {
    dispatch(fetchNewsletters());
  }, [dispatch]);

  return (
    <div className={styles.container}>
      <NavLink route={Routes.PUBLISHING_NEWSLETTERS_NEW} label="New Newsletter" />
      {newsletters.map((newsletter) => (
        <NewsletterPreviw newsletter={newsletter} key={newsletter.id} />
      ))}
    </div>
  );
}
