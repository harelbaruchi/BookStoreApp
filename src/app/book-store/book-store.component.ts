import { Component, OnInit } from '@angular/core';
import { BookService } from '../shared/book.service';
import { Book } from '../shared/book.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-book-store',
  templateUrl: './book-store.component.html',
  styles: [],
})
export class BookStoreComponent implements OnInit {
  constructor(public store: BookService, private toastr: ToastrService) {}
  ngOnInit(): void {
    this.store.refreshList();
  }
  populateForm(selectedRecord: Book) {
    this.store.formData = Object.assign({}, selectedRecord);
  }

  onDelete(isbn: string) {
    if (confirm('Are you sure you want to delete this record?')) {
      this.store.deleteBook(isbn).subscribe({
        next: (res) => {
          this.store.list = res as Book[];
          this.toastr.error('Record Deleted successfully', 'Book Store');
          this.store.refreshList();
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
  }
}
