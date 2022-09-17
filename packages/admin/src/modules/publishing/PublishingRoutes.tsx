import * as React from "react";
import { AlignLeft, Mail } from "react-feather";
import { useParams } from "react-router-dom";

import { Routes } from "../../Constants";
import { DashboardSidebarRoute } from "../dashboards/DashboardSidebar";
import ArticleEditor from "./ArticleEditor";
import ArticlesIndex from "./ArticlesIndex";
import EditArticle from "./EditArticle";
import EditNewsletter from "./EditNewsletter";
import NewsletterEditor from "./NewsletterEditor";
import NewslettersIndex from "./NewslettersIndex";

function Render(props: { render: () => JSX.Element }) {
  return props.render();
}

const PUBLISHING_ROUTES: DashboardSidebarRoute[] = [
  {
    id: "general",
    icon: Mail,
    label: "Newsletters",
    path: Routes.PUBLISHING,
    element: <NewslettersIndex />,
  },
  {
    id: "new-newsletter",
    showLink: false,
    label: "New Newsletter",
    path: Routes.PUBLISHING_NEWSLETTERS_NEW,
    element: <NewsletterEditor />,
  },
  {
    id: "edit-newsletter",
    label: "Edit Newsletter",
    showLink: false,
    path: Routes.PUBLISHING_NEWSLETTERS_EDIT(":id"),
    element: (
      <Render
        render={() => {
          const params = useParams<{ id: string }>();
          return <EditNewsletter newsletterId={params.id!} />;
        }}
      />
    ),
  },
  {
    id: "articles",
    icon: AlignLeft,
    label: "Articles",
    path: Routes.PUBLISHING_ARTICLES,
    element: <ArticlesIndex />,
  },
  {
    id: "new-article",
    showLink: false,
    label: "New Article",
    path: Routes.PUBLISHING_ARTICLES_NEW,
    element: <ArticleEditor />,
  },
  {
    id: "edit-article",
    label: "Edit Article",
    showLink: false,
    path: Routes.PUBLISHING_ARTICLES_EDIT(":id"),
    element: (
      <Render
        render={() => {
          const params = useParams<{ id: string }>();
          return <EditArticle articleId={params.id!} />;
        }}
      />
    ),
  },
];

export default PUBLISHING_ROUTES;
