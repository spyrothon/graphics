import { Article, InitialArticle, InitialNewsletter, Newsletter } from "@spyrothon/api";

import API from "@admin/API";
import { SafeDispatch } from "@admin/hooks/useDispatch";

import { PublishingAction, PublishingActionType } from "./PublishingTypes";

export function updateNewsletter(newsletter: Newsletter): PublishingAction {
  return {
    type: PublishingActionType.PUBLISHING_UPDATE_NEWSLETTER,
    newsletter,
  };
}

export function fetchNewsletters() {
  return async (dispatch: SafeDispatch) => {
    dispatch({ type: PublishingActionType.PUBLISHING_FETCH_NEWSLETTERS_STARTED });
    const newsletters = await API.publishing.fetchNewsletters();

    dispatch(fetchNewslettersSuccess(newsletters));
  };
}

export function fetchNewsletter(newsletterId: string) {
  return async (dispatch: SafeDispatch) => {
    dispatch({ type: PublishingActionType.PUBLISHING_FETCH_NEWSLETTERS_STARTED });
    const newsletter = await API.publishing.fetchNewsletter(newsletterId);

    dispatch(fetchNewslettersSuccess([newsletter]));
  };
}

export function loadNewsletter(newsletter: Newsletter): PublishingAction {
  return {
    type: PublishingActionType.PUBLISHING_FETCH_NEWSLETTERS_SUCCESS,
    newsletters: [newsletter],
  };
}

export function fetchNewslettersSuccess(newsletters: Newsletter[]): PublishingAction {
  return { type: PublishingActionType.PUBLISHING_FETCH_NEWSLETTERS_SUCCESS, newsletters };
}

export function createNewsletter(newsletter: InitialNewsletter) {
  return async (dispatch: SafeDispatch) => {
    const response = await API.publishing.createNewsletter(newsletter);
    dispatch(loadNewsletter(response));
  };
}

export function persistNewsletter(newsletterId: string, changes: Partial<Newsletter>) {
  return async (dispatch: SafeDispatch) => {
    const filteredChanges = { ...changes };
    const updatedNewsletter = await API.publishing.updateNewsletter(newsletterId, filteredChanges);
    dispatch({
      type: PublishingActionType.PUBLISHING_UPDATE_NEWSLETTER,
      newsletter: updatedNewsletter,
    });
  };
}

export function updateArticle(article: Article): PublishingAction {
  return {
    type: PublishingActionType.PUBLISHING_UPDATE_ARTICLE,
    article,
  };
}

export function fetchArticles() {
  return async (dispatch: SafeDispatch) => {
    dispatch({ type: PublishingActionType.PUBLISHING_FETCH_ARTICLES_STARTED });
    const articles = await API.publishing.fetchArticles();

    dispatch(fetchArticlesSuccess(articles));
  };
}

export function fetchArticle(articleId: string) {
  return async (dispatch: SafeDispatch) => {
    dispatch({ type: PublishingActionType.PUBLISHING_FETCH_ARTICLES_STARTED });
    const article = await API.publishing.fetchArticle(articleId);

    dispatch(fetchArticlesSuccess([article]));
  };
}

export function loadArticle(article: Article): PublishingAction {
  return {
    type: PublishingActionType.PUBLISHING_FETCH_ARTICLES_SUCCESS,
    articles: [article],
  };
}

export function fetchArticlesSuccess(articles: Article[]): PublishingAction {
  return { type: PublishingActionType.PUBLISHING_FETCH_ARTICLES_SUCCESS, articles };
}

export function createArticle(article: InitialArticle) {
  return async (dispatch: SafeDispatch) => {
    const response = await API.publishing.createArticle(article);
    dispatch(loadArticle(response));
  };
}

export function persistArticle(articleId: string, changes: Partial<Article>) {
  return async (dispatch: SafeDispatch) => {
    const filteredChanges = { ...changes };
    const updatedArticle = await API.publishing.updateArticle(articleId, filteredChanges);
    dispatch({
      type: PublishingActionType.PUBLISHING_UPDATE_ARTICLE,
      article: updatedArticle,
    });
  };
}
