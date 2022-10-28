import * as React from "react";
import classNames from "classnames";
import { X } from "react-feather";
import { InitialNewsletter, InitialPublication, Newsletter } from "@spyrothon/api";
import {
  Anchor,
  Button,
  Card,
  FormControl,
  SelectInput,
  Stack,
  TextArea,
  TextInput,
} from "@spyrothon/sparx";
import { SaveState, useSaveable } from "@spyrothon/utils";

import { AppRoutes } from "@admin/Constants";
import getPublicAppURL from "@admin/hooks/getPublicAppURL";
import useSafeDispatch from "@admin/hooks/useDispatch";
import { useSafeSelector } from "@admin/Store";

import { createNewsletter, fetchArticles, persistNewsletter } from "./PublishingActions";
import * as PublishingStore from "./PublishingStore";

import styles from "./NewsletterEditor.module.css";

// This is hideous, but `datetime-local` doesn't accept timezones...
function toDatetimeLocal(date?: Date) {
  if (date == null) return "";

  const tzOffset = date.getTimezoneOffset();
  const localized = new Date(date);
  localized.setMinutes(date.getMinutes() + tzOffset);
  return localized.toISOString().slice(0, 16);
}

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
  const articleOptions = articles.map((article) => ({ name: article.title, value: article.id }));
  const selectedArticle = articleOptions.find((option) => option.value === articleId) ?? {
    name: "Select an Article",
    value: undefined,
  };

  return (
    <Card>
      <Stack direction="horizontal" justify="stretch">
        <FormControl label="Article">
          <SelectInput
            selectedItem={selectedArticle}
            items={articleOptions}
            onSelect={(item) => onChange({ ...publication, articleId: item?.value })}
          />
        </FormControl>
        <FormControl label="Priority">
          <TextInput
            type="number"
            value={priority || 1}
            min={0}
            onChange={(event) =>
              onChange({ ...publication, priority: parseInt(event.target.value) })
            }
          />
        </FormControl>

        <div className={styles.remove} onClick={onRemove}>
          <X size={16} strokeWidth="3" />
        </div>
      </Stack>
    </Card>
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
  }, [dispatch]);

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
    <Stack spacing="space-lg" className={classNames(styles.container, className)}>
      <Stack direction="horizontal" align="center">
        <Button
          className={styles.saveButton}
          onClick={handleSaveNewsletter}
          disabled={saveState === SaveState.SAVING || !hasChanges || !valid}>
          {getSaveText()}
        </Button>
        {edited.id != null ? (
          <Anchor href={getPublicAppURL(AppRoutes.NEWSLETTER(edited.id))}>Preview</Anchor>
        ) : null}
      </Stack>
      <FormControl label="Title">
        <TextInput
          value={edited.title}
          onChange={(event) => setEdited({ ...edited, title: event.target.value })}
        />
      </FormControl>
      <FormControl label="Publish Date">
        <TextInput
          type="datetime-local"
          value={toDatetimeLocal(edited.publishedAt)}
          onChange={(publishedAt) =>
            setEdited({ ...edited, publishedAt: new Date(publishedAt.target.value) })
          }
        />
      </FormControl>
      <FormControl label="Introduction">
        <TextArea
          rows={12}
          value={edited.introduction}
          onChange={(event) => setEdited({ ...edited, introduction: event.target.value })}
        />
      </FormControl>

      {(edited.publications ?? []).map((publication, index) => (
        <ArticleSelector
          key={publication.id ?? index}
          publication={publication}
          onChange={(changed) => updatePublication(changed, index)}
          onRemove={() => removePublication(index)}
        />
      ))}
      <Button variant="primary" onClick={addPublication}>
        Add an Article
      </Button>
    </Stack>
  );
}
