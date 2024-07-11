import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ArticleService } from 'src/app/services/article.service';
import { ModalAddArticleComponent } from 'src/app/shared/modal-add-article/modal-add-article.component';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {

  articles: any[] = [];

  SIZE_PAGE = 15;

  pagination: any;

  headers: any[] = [];

  constructor(private articleService: ArticleService, private readonly modalService: NgbModal) {
    this.createTableHeader();
  }

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.pagination = this.getPagination();
    this.articleService.getArticles(this.pagination).subscribe({
      next: (data: any) => {
        this.articles = data?.content || [];
        this.pagination.total = data.total;
       }
    })
  }

  getPagination() {
    return {
      page: 0,
      size: this.SIZE_PAGE
    }
  }

  addArticle(): void {
    const modal = this.modalService.open(ModalAddArticleComponent, {
      centered: true,
      backdrop: true,
      size: 'lg'
    });
    modal.result.then((result: any) => {
      // this.articleService.addArticle(result);
      this.loadData();
    }, () => {});
  }

  deleteArticle(ean: string): void {
    // this.articleService.deleteArticle(ean);
    this.loadData();
  }

  modifyArticle(article: any) {
    const modal = this.modalService.open(ModalAddArticleComponent, {
      centered: true,
      backdrop: true,
      size: 'lg'
    });
    modal.componentInstance.article = article;
    modal.componentInstance.edit = true;
    modal.result.then((result: any) => {
      // this.articleService.updateArticle(result.ean, result);
      this.loadData();
    }, () => {});
  }

  createTableHeader() {
    this.headers = [
      {
        key: 'EAN',
        value: 'EAN'
      },
      {
        key: 'Name',
        value: 'name'
      },
      {
        key: 'Description',
        value: 'description'
      },
      {
        key: 'Quantity',
        value: 'quantity'
      },
      {
        key: 'Price',
        value: 'price'
      },
      {
        key: 'Actions',
        value: 'options'
      }
    ]
  }

}
