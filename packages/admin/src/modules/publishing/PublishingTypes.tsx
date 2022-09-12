import type { Newsletter, Article } from "@spyrothon/api";

export enum PublishingActionType {
  PUBLISHING_UPDATE_NEWSLETTER = "PUBLISHING_UPDATE_NEWSLETTER",
  PUBLISHING_FETCH_NEWSLETTERS_STARTED = "PUBLISHING_FETCH_NEWSLETTERS_STARTED",
  PUBLISHING_FETCH_NEWSLETTERS_SUCCESS = "PUBLISHING_FETCH_NEWSLETTERS_SUCCESS",
  PUBLISHING_UPDATE_ARTICLE = "PUBLISHING_UPDATE_ARTICLE",
  PUBLISHING_FETCH_ARTICLES_STARTED = "PUBLISHING_FETCH_ARTICLES_STARTED",
  PUBLISHING_FETCH_ARTICLES_SUCCESS = "PUBLISHING_FETCH_ARTICLES_SUCCESS",
}

export type PublishingAction =
  | {
      type: PublishingActionType.PUBLISHING_UPDATE_NEWSLETTER;
      newsletter: Newsletter;
    }
  | { type: PublishingActionType.PUBLISHING_FETCH_NEWSLETTERS_STARTED }
  | {
      type: PublishingActionType.PUBLISHING_FETCH_NEWSLETTERS_SUCCESS;
      newsletters: Newsletter[];
    }
  | {
      type: PublishingActionType.PUBLISHING_UPDATE_ARTICLE;
      article: Article;
    }
  | { type: PublishingActionType.PUBLISHING_FETCH_ARTICLES_STARTED }
  | {
      type: PublishingActionType.PUBLISHING_FETCH_ARTICLES_SUCCESS;
      articles: Article[];
    };
