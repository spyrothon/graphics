import { createSelector } from "reselect";
import createCachedSelector from "re-reselect";

import { StoreState, getProp } from "../../Store";

const getPublishingState = (globalState: StoreState) => globalState.publishing;

export const isFetchingNewsletters = createSelector(
  [getPublishingState],
  (state) => state.fetching,
);
export const getNewsletters = createSelector([getPublishingState], (state) =>
  Object.values(state.newsletters),
);
export const getNewsletter = createCachedSelector(
  [getPublishingState, getProp<string>("newsletterId")],
  (state, newsletterId) => state.newsletters[newsletterId],
)(getProp("newsletterId"));

export const isFetchingArticles = createSelector([getPublishingState], (state) => state.fetching);
export const getArticles = createSelector([getPublishingState], (state) =>
  Object.values(state.articles),
);
export const getArticle = createCachedSelector(
  [getPublishingState, getProp<string>("articleId")],
  (state, articleId) => state.articles[articleId],
)(getProp("articleId"));
