import { Component } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Book } from 'src/app/shared/book.model';
import { BookService } from 'src/app/shared/book.service';

@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styles: [],
})
export class BookFormComponent {
  constructor(public store: BookService, private toastr: ToastrService) {}

  onSubmit(form: NgForm) {
    this.store.formSubmitted = true;
    console.log(form.controls['isbn'].value);

    if (form.valid) {
      let selectedIsbn: number = form.controls['isbn'].value;
      this.store.list.find((book) => book.isbn === selectedIsbn.toString()) !==
      undefined
        ? this.updateRecord(form)
        : this.insertRecord(form);
    }
  }

  insertRecord(form: NgForm) {
    this.store.postBook().subscribe({
      next: (res) => {
        this.store.list = res as Book[];
        this.store.resetForm(form);
        this.toastr.success('inserted successfully', 'Book Store');
        this.store.refreshList();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  updateRecord(form: NgForm) {
    this.store.putBook().subscribe({
      next: (res) => {
        this.store.list = res as Book[];
        this.store.resetForm(form);
        this.toastr.info('Record Updated successfully', 'Book Store');
        this.store.refreshList();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
