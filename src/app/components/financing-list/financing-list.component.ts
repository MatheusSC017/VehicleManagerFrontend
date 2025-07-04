import { Component } from '@angular/core';
import { Financing } from '../../interfaces/financing';
import { FinancingService } from '../../services/financing.service';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterModule } from '@angular/router';
import { FinancingStatus } from '../../enums/financing.enums';

@Component({
  selector: 'app-financing-list',
  imports: [CommonModule, RouterModule, RouterLink],
  templateUrl: './financing-list.component.html',
  styleUrl: './financing-list.component.css'
})
export class FinancingListComponent {
  financings: Financing[] = [];
  currentPage: number = 0;
  totalPages: number = 1;

  financingStatusList = Object.entries(FinancingStatus);

  financingStatusMap: { [key: string]: string } = {
      ACTIVE: FinancingStatus.ACTIVE,
      PAID_OFF: FinancingStatus.PAID_OFF,
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

}
