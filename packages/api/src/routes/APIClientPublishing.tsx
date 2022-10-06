import { APIClientSubject } from "../APIClientTypes";
import { Article, InitialArticle, InitialNewsletter, Newsletter } from "../APITypes";
import Endpoints from "../Endpoints";

export class APIClientPublishing extends APIClientSubject {
  async fetchNewsletters() {
    return await this.http.get<Newsletter[]>(Endpoints.NEWSLETTERS);
  }

  async fetchNewsletter(newsletterId: string) {
    return await this.http.get<Newsletter>(Endpoints.NEWSLETTER(newsletterId));
  }

  async createNewsletter(newsletterData: InitialNewsletter) {
    return await this.http.post<Newsletter>(Endpoints.NEWSLETTERS, newsletterData);
  }

  async updateNewsletter(newsletterId: string, newsletterData: Partial<Newsletter>) {
    return await this.http.put<Newsletter>(Endpoints.NEWSLETTER(newsletterId), newsletterData);
  }

  async fetchArticles() {
    return await this.http.get<Article[]>(Endpoints.ARTICLES);
  }

  async fetchArticle(articleId: string) {
    return await this.http.get<Article>(Endpoints.ARTICLE(articleId));
  }

  async createArticle(articleData: InitialArticle) {
    return await this.http.post<Article>(Endpoints.ARTICLES, articleData);
  }

  async updateArticle(articleId: string, articleData: Partial<Article>) {
    return await this.http.put<Article>(Endpoints.ARTICLE(articleId), articleData);
  }
}
