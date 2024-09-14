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

  addArticle(article: any) {
    return this.post('/articles', article);
  }

  updateArticle(id: any, updatedArticle: any) {
    return this.put(`/articles/${id}`, updatedArticle);
  }

  deleteArticle(id: string) {
    return this.delete(`/articles/${id}`);
  }
}
