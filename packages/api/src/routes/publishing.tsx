import type { Article, InitialArticle, InitialNewsletter, Newsletter } from "../APITypes";
import Endpoints from "../Endpoints";
import HTTPUtils from "../HTTPUtils";

export async function fetchNewsletters() {
  return await HTTPUtils.get<Newsletter[]>(Endpoints.NEWSLETTERS);
}

export async function fetchNewsletter(newsletterId: string) {
  return await HTTPUtils.get<Newsletter>(Endpoints.NEWSLETTER(newsletterId));
}

export async function createNewsletter(newsletterData: InitialNewsletter) {
  return await HTTPUtils.post<Newsletter>(Endpoints.NEWSLETTERS, newsletterData);
}

export async function updateNewsletter(newsletterId: string, newsletterData: Partial<Newsletter>) {
  return await HTTPUtils.put<Newsletter>(Endpoints.NEWSLETTER(newsletterId), newsletterData);
}

export async function fetchArticles() {
  return await HTTPUtils.get<Article[]>(Endpoints.ARTICLES);
}

export async function fetchArticle(articleId: string) {
  return await HTTPUtils.get<Article>(Endpoints.ARTICLE(articleId));
}

export async function createArticle(articleData: InitialArticle) {
  return await HTTPUtils.post<Article>(Endpoints.ARTICLES, articleData);
}

export async function updateArticle(articleId: string, articleData: Partial<Article>) {
  return await HTTPUtils.put<Article>(Endpoints.ARTICLE(articleId), articleData);
}
