import { Article,Newsletter } from "@spyrothon/api";

import { Action,ActionFor } from "../../Actions";
import { PublishingActionType } from "./PublishingTypes";

type NewsletterMap = { [id: string]: Newsletter };
type ArticleMap = { [id: string]: Article };

type PublishingReducerState = {
  fetching: boolean;
  newsletters: NewsletterMap;
  articles: ArticleMap;
};

function handleUpdateNewsletter(
  state: PublishingReducerState,
  action: ActionFor<PublishingActionType.PUBLISHING_UPDATE_NEWSLETTER>,
) {
  const { newsletter } = action;

  return {
    ...state,
    newsletters: {
      ...state.newsletters,
      [newsletter.id]: newsletter,
    },
  };
}

function handleFetchNewslettersStarted(
  state: PublishingReducerState,
  _action: ActionFor<PublishingActionType.PUBLISHING_FETCH_NEWSLETTERS_STARTED>,
) {
  return {
    ...state,
    fetching: true,
  };
}

function handleFetchNewslettersSuccess(
  state: PublishingReducerState,
  action: ActionFor<PublishingActionType.PUBLISHING_FETCH_NEWSLETTERS_SUCCESS>,
) {
  const { newsletters } = action;
  const newslettersById = newsletters.reduce<NewsletterMap>((acc, newsletter) => {
    acc[newsletter.id] = newsletter;
    return acc;
  }, {});

  return {
    ...state,
    fetching: false,
    newsletters: { ...state.newsletters, ...newslettersById },
  };
}

function handleUpdateArticle(
  state: PublishingReducerState,
  action: ActionFor<PublishingActionType.PUBLISHING_UPDATE_ARTICLE>,
) {
  const { article } = action;

  return {
    ...state,
    articles: {
      ...state.articles,
      [article.id]: article,
    },
  };
}

function handleFetchArticlesStarted(
  state: PublishingReducerState,
  _action: ActionFor<PublishingActionType.PUBLISHING_FETCH_ARTICLES_STARTED>,
) {
  return {
    ...state,
    fetching: true,
  };
}

function handleFetchArticlesSuccess(
  state: PublishingReducerState,
  action: ActionFor<PublishingActionType.PUBLISHING_FETCH_ARTICLES_SUCCESS>,
) {
  const { articles } = action;
  const articlesById = articles.reduce<ArticleMap>((acc, article) => {
    acc[article.id] = article;
    return acc;
  }, {});

  return {
    ...state,
    fetching: false,
    articles: { ...state.articles, ...articlesById },
  };
}

const defaultState: PublishingReducerState = {
  fetching: false,
  newsletters: {},
  articles: {},
};

export default function publishingReducer(
  state: PublishingReducerState = defaultState,
  action: Action,
): PublishingReducerState {
  switch (action.type) {
    case PublishingActionType.PUBLISHING_UPDATE_NEWSLETTER:
      return handleUpdateNewsletter(state, action);
    case PublishingActionType.PUBLISHING_FETCH_NEWSLETTERS_STARTED:
      return handleFetchNewslettersStarted(state, action);
    case PublishingActionType.PUBLISHING_FETCH_NEWSLETTERS_SUCCESS:
      return handleFetchNewslettersSuccess(state, action);
    case PublishingActionType.PUBLISHING_UPDATE_ARTICLE:
      return handleUpdateArticle(state, action);
    case PublishingActionType.PUBLISHING_FETCH_ARTICLES_STARTED:
      return handleFetchArticlesStarted(state, action);
    case PublishingActionType.PUBLISHING_FETCH_ARTICLES_SUCCESS:
      return handleFetchArticlesSuccess(state, action);
  }

  return state;
}
