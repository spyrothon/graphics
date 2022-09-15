import * as React from "react";
import classNames from "classnames";
import { X } from "react-feather";
import {
  Anchor,
  Button,
  DateTimeInput,
  NumberInput,
  SelectInput,
  TextInput,
  useSaveable,
  SaveState,
} from "@spyrothon/uikit";

import { Newsletter, InitialPublication, InitialNewsletter } from "@spyrothon/api";
import { AppRoutes } from "@admin/Constants";
import { useSafeSelector } from "@admin/Store";
import getPublicAppURL from "@admin/hooks/getPublicAppURL";
import useSafeDispatch from "@admin/hooks/useDispatch";
import { createNewsletter, fetchArticles, persistNewsletter } from "./PublishingActions";
import * as PublishingStore from "./PublishingStore";

import styles from "./NewsletterEditor.module.css";

function validateNewsletter(newsletter: InitialNewsletter) {
  return (
    newsletter.title != null &&
    newsletter.title.length > 0 &&
    newsletter.publications?.every(
      (publication) => publication.articleId != null && publication.newsletterId != null,
    )
  );
}

interface ArticleSelectorProps {
  publication: InitialPublication;
  onChange: (publication: InitialPublication) => void;
  onRemove: () => void;
}

function ArticleSelector(props: ArticleSelectorProps) {
  const { publication, onChange, onRemove } = props;
  const { priority, articleId } = publication;

  const articles = useSafeSelector(PublishingStore.getArticles);
  const articleIds = articles.map((article) => article.id);

  return (
    <div className={styles.publication}>
      <div className={styles.inputRow}>
        <SelectInput
          label="Article"
          value={articleId}
          items={articleIds}
          onChange={(articleId) => onChange({ ...publication, articleId: articleId })}
          emptyLabel="Select an Article"
          itemToString={(articleId) =>
            articles.find((article) => article.id === articleId)?.title ?? articleId
          }
        />
        <NumberInput
          label="Priority"
          value={priority || 1}
          min={0}
          onChange={(event) => onChange({ ...publication, priority: parseInt(event.target.value) })}
        />

        <div className={styles.remove} onClick={onRemove}>
          <X size={16} strokeWidth="3" />
        </div>
      </div>
    </div>
  );
}

interface NewsletterEditorProps {
  newsletterId?: string;
  className?: string;
}

export default function NewsletterEditor(props: NewsletterEditorProps) {
  const { newsletterId, className } = props;

  const dispatch = useSafeDispatch();
  const newsletter = useSafeSelector((state) =>
    newsletterId != null ? PublishingStore.getNewsletter(state, { newsletterId }) : undefined,
  );
  const [edited, setEdited] = React.useState<InitialNewsletter>(newsletter ?? {});
  const hasChanges = JSON.stringify(edited) !== JSON.stringify(newsletter);
  const valid = validateNewsletter(edited);
  React.useEffect(() => {
    if (newsletter == null) return;
    setEdited(newsletter);
  }, [newsletter]);

  React.useEffect(() => {
    dispatch(fetchArticles());
  }, []);

  function updatePublication(newPublication: InitialPublication, index: number) {
    const publications = Array.from(edited.publications ?? []);
    publications[index] = newPublication;
    setEdited({ ...edited, publications });
  }

  function removePublication(index: number) {
    const publications = Array.from(edited.publications ?? []);
    publications.splice(index, 1);
    setEdited({ ...edited, publications });
  }

  function addPublication() {
    const publications = Array.from(edited.publications ?? []);
    publications.push({ newsletterId: edited.id, priority: 1 });
    setEdited({ ...edited, publications });
  }

  const [handleSaveNewsletter, getSaveText, saveState] = useSaveable(async () => {
    if (newsletterId != null) {
      dispatch(persistNewsletter(newsletterId, edited as Newsletter));
    } else {
      dispatch(createNewsletter(edited));
    }
  });

  return (
    <div className={classNames(styles.container, className)}>
      <div className={styles.editor}>
        <Button
          className={styles.saveButton}
          onClick={handleSaveNewsletter}
          disabled={saveState === SaveState.SAVING || !hasChanges || !valid}>
          {getSaveText()}
        </Button>
        {edited.id != null ? (
          <Anchor href={getPublicAppURL(AppRoutes.NEWSLETTER(edited.id))} target="_blank">
            Preview
          </Anchor>
        ) : null}
        <TextInput
          label="Title"
          value={edited.title}
          onChange={(event) => setEdited({ ...edited, title: event.target.value })}
        />
        <DateTimeInput
          label="Publish Date"
          value={edited.publishedAt}
          onChange={(publishedAt) => setEdited({ ...edited, publishedAt })}
        />
        <TextInput
          label="Introduction"
          type="textarea"
          rows={12}
          value={edited.introduction}
          onChange={(event) => setEdited({ ...edited, introduction: event.target.value })}
        />
      </div>

      <div className={styles.articles}>
        {(edited.publications ?? []).map((publication, index) => (
          <ArticleSelector
            key={publication.id ?? index}
            publication={publication}
            onChange={(changed) => updatePublication(changed, index)}
            onRemove={() => removePublication(index)}
          />
        ))}
        <Button onClick={addPublication}>Add an Article</Button>
      </div>
    </div>
  );
}
