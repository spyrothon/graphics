import * as React from "react";
import { Header } from "@spyrothon/uikit";

import { useSafeSelector } from "@admin/Store";
import useSafeDispatch from "@admin/hooks/useDispatch";
import { fetchArticle } from "./PublishingActions";
import * as PublishingStore from "./PublishingStore";
import ArticleEditor from "./ArticleEditor";

interface EditArticleProps {
  articleId: string;
}

export default function EditNewsletter(props: EditArticleProps) {
  const dispatch = useSafeDispatch();
  const { articleId } = props;

  const newsletter = useSafeSelector((state) => PublishingStore.getArticle(state, { articleId }));

  React.useEffect(() => {
    dispatch(fetchArticle(articleId));
  }, [articleId]);

  if (newsletter == null) return null;

  return (
    <div>
      <Header size={Header.Sizes.H1}>Editing {newsletter.title}</Header>

      <ArticleEditor articleId={articleId} />
    </div>
  );
}
