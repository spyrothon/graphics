import * as React from "react";
import classNames from "classnames";
import { Article, InitialArticle } from "@spyrothon/api";
import { Button, Card, FormControl, Stack, TextArea, TextInput } from "@spyrothon/sparx";
import { SaveState, useSaveable } from "@spyrothon/utils";

import useSafeDispatch from "@admin/hooks/useDispatch";
import { useSafeSelector } from "@admin/Store";

import { createArticle, persistArticle } from "./PublishingActions";
import * as PublishingStore from "./PublishingStore";

import styles from "./NewsletterEditor.module.css";

interface ArticleEditorProps {
  articleId?: string;
  className?: string;
}

export default function ArticleEditor(props: ArticleEditorProps) {
  const { articleId, className } = props;

  const dispatch = useSafeDispatch();
  const article = useSafeSelector((state) =>
    articleId != null ? PublishingStore.getArticle(state, { articleId }) : undefined,
  );
  const [edited, setEdited] = React.useState<InitialArticle>(article ?? {});
  const hasChanges = JSON.stringify(edited) !== JSON.stringify(article);
  React.useEffect(() => {
    if (article == null) return;
    setEdited(article);
  }, [article]);

  const [handleSaveArticle, getSaveText, saveState] = useSaveable(async () => {
    if (articleId != null) {
      dispatch(persistArticle(articleId, edited as Article));
    } else {
      dispatch(createArticle(edited));
    }
  });

  return (
    <Stack spacing="space-lg">
      <Card className={classNames(styles.container, className)}>
        <Stack spacing="space-lg" className={styles.editor}>
          <FormControl label="Title">
            <TextInput
              value={edited.title}
              onChange={(event) => setEdited({ ...edited, title: event.target.value })}
            />
          </FormControl>
          <FormControl label="Author Name">
            <TextInput
              value={edited.authorName}
              onChange={(event) => setEdited({ ...edited, authorName: event.target.value })}
            />
          </FormControl>
          <FormControl label="Content">
            <TextArea
              rows={12}
              value={edited.content}
              onChange={(event) => setEdited({ ...edited, content: event.target.value })}
            />
          </FormControl>
          <Button
            variant="primary"
            onClick={handleSaveArticle}
            disabled={saveState === SaveState.SAVING || !hasChanges}>
            {getSaveText()}
          </Button>
        </Stack>
      </Card>
    </Stack>
  );
}
