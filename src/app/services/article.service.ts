import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ArticleService extends BaseService {

  constructor(public override readonly http: HttpClient) {
    super(http);
  }

  getArticles(pagination: any) {
    return this.getPaginated('/articles', pagination);
  }

  // addArticle(article: any): void {
  //   this.articles.push(article);
  // }

  // updateArticle(ean: string, updatedArticle: any): void {
  //   const index = this.articles.findIndex(article => article?.ean === ean);
  //   if (index) this.articles[index] = updatedArticle;
  // }

  // deleteArticle(ean: string): void {
  //   this.articles = this.articles.filter(article => article.ean !== ean);
  // }
}
