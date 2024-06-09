import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Book } from './book.model';
import { NgForm } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private readonly url: string = environment.apiBaseUrl + '/Books';
  list: Book[] = [];
  formData: Book = new Book();
  authorsString: string = '';
  formSubmitted: boolean = false;
  constructor(private http: HttpClient) {}

  refreshList() {
    this.http.get(this.url).subscribe({
      next: (res) => {
        this.list = res as Book[];
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  postBook() {
    this.formData.authors = this.authorsString.split(',');
    return this.http.post(this.url, this.formData);
  }

  putBook() {
    this.formData.authors = this.authorsString.split(',');
    return this.http.put(this.url + '/' + this.formData.isbn, this.formData);
  }

  deleteBook(isbn: string) {
    return this.http.delete(this.url + '/' + isbn);
  }

  resetForm(form: NgForm) {
    form.form.reset();
    this.formData = new Book();
    this.formSubmitted = false;
  }
}
