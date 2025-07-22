import { Component } from '@angular/core';
import { Financing } from '../../interfaces/financing';
import { FinancingService } from '../../services/financing.service';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterModule } from '@angular/router';
import { FinancingStatus } from '../../enums/financing.enums';
import { FormsModule } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorResponse } from '../../interfaces/error-response';

@Component({
  selector: 'app-financing-list',
  imports: [CommonModule, FormsModule, RouterModule, RouterLink],
  templateUrl: './financing-list.component.html',
  styleUrl: './financing-list.component.css'
})
export class FinancingListComponent {
  financings: Financing[] = [];
  currentPage: number = 0;
  totalPages: number = 1;
  showStatusModal: boolean = false;
  selectedFinancing: number = 0;
  financingStatus: string = 'DRAFT';
  updateStatusError: any = {};

  financingStatusList = Object.entries(FinancingStatus);

  financingStatusMap: { [key: string]: string } = {
    DRAFT: FinancingStatus.DRAFT,
    ACTIVE: FinancingStatus.ACTIVE,
    DEFAULTED: FinancingStatus.DEFAULTED,
    CANCELED: FinancingStatus.CANCELED
  };

  constructor(private financingService: FinancingService) {};

  ngOnInit(): void {
    this.getFinancings(0, 20);
  }

  deleteFinancing(financingId: number): void {
    this.financingService.delete(financingId).subscribe({
      next: () => this.getFinancings(0, 20),
      error: (err) => console.error(err)
    });
  }

  getFinancings(page: number, size: number): void {
    this.financingService.getAll(page, size).subscribe(data => {
      this.financings = data.content;
      this.totalPages = data.totalPages;
      this.currentPage = data.number;
    })
  }

  openStatusModal(financingId: number): void {
    this.selectedFinancing = financingId;
    this.financingStatus = 'DRAFT';
    this.showStatusModal = true;
    this.updateStatusError = {};
  }

  closeStatusModal(): void {
    this.showStatusModal = false;
  }

  updateStatus(): void {
    this.financingService.updateStatus(this.selectedFinancing, this.financingStatus).subscribe({
      next: response => {
        this.getFinancings(0, 20);
        this.closeStatusModal();
      },
      error: (httpError: HttpErrorResponse) => {
        const errorResponse = httpError.error as ErrorResponse<Financing>;
        this.updateStatusError = errorResponse?.errors ?? { general: 'Erro inesperado.' };
      }
    });
  }

}
