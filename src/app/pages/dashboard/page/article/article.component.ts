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
        this.mapData();
       }
    })
  }

  mapData() {
    if (this.articles?.length > 0) {
      this.articles.forEach((article: any, index: number) => {
        article.idLocal = index + 1;
      })
    }
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
      this.articleService.addArticle(result).subscribe({
        next: (data: any) => {
          this.loadData();
        },
        error: (err: any) => {
          this.loadData();
          alert(err.error.detail);
        }
      })
    }, () => {});
  }

  deleteArticle(article: any): void {
    const confirmation = confirm('Are you sure you want to delete this article?');
    if (confirmation) {
      this.articleService.deleteArticle(article.id).subscribe({
        next: () => {
          this.articles = this.articles.filter(item => article.idLocal !== item.idLocal)
          alert('Article deleted successfully!');
        },
        error: (err: any) => {
          alert(err.error.description);
        }
      })
    }
  }

  modifyArticle(article: any): void {
    const modal = this.modalService.open(ModalAddArticleComponent, {
      centered: true,
      backdrop: true,
      size: 'lg'
    });
    modal.componentInstance.article = article;
    modal.componentInstance.edit = true;
    modal.result.then((result: any) => {
      this.articleService.updateArticle(result.id, result).subscribe({
        next: (data: any) => {
          const currentIndex = this.articles.findIndex(item => item.idLocal === result.idLocal)
          if (currentIndex > -1) {
            this.articles[currentIndex] = result;
          }
        },
        error: (err: any) => {
          alert(err.error.description);
        }
      })
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
