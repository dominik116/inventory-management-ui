import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UtilsService } from 'src/app/core/services/utils.service';
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

  pageNumber: number = 1;

  headers: any[] = [];

  constructor(private articleService: ArticleService, private readonly modalService: NgbModal,
    private readonly utilsService: UtilsService) {
    this.createTableHeader();
  }

  ngOnInit(): void {
    this.pagination = this.getPagination();
    this.loadData();
  }

  loadData() {
    this.articleService.getArticles(this.pagination).subscribe({
      next: (data: any) => {
        this.articles = data?.content || [];
        this.pagination.page = data.page;
        this.pagination.size = data.size;
        this.pagination.total = data.total;
        this.mapData();
      },
      error: (err: any) => {
        this.utilsService.showDanger(err?.error?.detail);
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

  pageChange(page: number){
    this.pagination.page = page - 1;
    this.loadData();
  }

  addArticle(): void {
    const modal = this.modalService.open(ModalAddArticleComponent, {
      centered: true,
      backdrop: true,
      size: 'lg'
    });
    modal.result.then((result: any) => {
      this.articleService.addArticle(result).subscribe({
        next: () => {
          this.loadData();
        },
        error: (err: any) => {
          this.utilsService.showDanger(err?.error?.detail);
        }
      })
    }, () => {});
  }

  deleteArticle(article: any): void {
    this.utilsService.openModalConfirm('Are you sure you want to delete this article?').then((result) => {
      if(result){
        this.articleService.deleteArticle(article.id).subscribe({
          next: () => {
            this.articles = this.articles.filter(item => article.idLocal !== item.idLocal);
            this.utilsService.showSuccess('Article deleted successfully!');
          },
          error: (err: any) => {
            this.utilsService.showDanger(err?.error?.detail);
          }
        })
      }
    })
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
        next: () => {
          const currentIndex = this.articles.findIndex(item => item.idLocal === result.idLocal)
          if (currentIndex > -1) {
            this.articles[currentIndex] = result;
            this.utilsService.showSuccess('The article has been updated successfully.');
          }
        },
        error: (err: any) => {
          this.utilsService.showDanger(err?.error?.detail);
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
