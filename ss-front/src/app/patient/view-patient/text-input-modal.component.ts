import { Component, EventEmitter, Output } from '@angular/core';
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-text-input-modal',
  template: `
    <div class="modal fade show" tabindex="-1" role="dialog" style="display: block;">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Введите текст</h5>
            <button type="button" class="close" (click)="closeModal()" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <textarea [(ngModel)]="inputText" class="form-control" rows="5"></textarea>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" (click)="closeModal()">Закрыть</button>
            <button type="button" class="btn btn-primary" (click)="save()">Сохранить</button>
          </div>
        </div>
      </div>
    </div>
  `,
  standalone: true,
  imports: [
    FormsModule
  ],
  styles: [
    `
      .modal {
        display: block;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        overflow: hidden;
        background-color: rgba(0, 0, 0, 0.5);
      }
    `
  ]
})
export class TextInputModalComponent {
  inputText: string = '';

  @Output() textSubmitted = new EventEmitter<string>();
  @Output() closeModalEvent = new EventEmitter<void>(); // Добавляем событие для закрытия

  save() {
    this.textSubmitted.emit(this.inputText);
    this.closeModal(); // Закрываем после сохранения
  }

  closeModal() {
    this.inputText = '';
    this.closeModalEvent.emit(); // Отправляем событие о закрытии
  }
}
