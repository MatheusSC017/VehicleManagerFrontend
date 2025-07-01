import { Component } from '@angular/core';
import { Financing } from '../../interfaces/financing';
import { FinancingService } from '../../services/financing.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-financing-list',
  imports: [CommonModule],
  templateUrl: './financing-list.component.html',
  styleUrl: './financing-list.component.css'
})
export class FinancingListComponent {
  financings: Financing[] = [];
  currentPage: number = 0;
  totalPages: number = 1;

  constructor(private financingService: FinancingService) {};

  ngOnInit(): void {
    this.getFinancings(0, 20);
  }

  getFinancings(page: number, size: number): void {
    this.financingService.getAll(page, size).subscribe(data => {
      this.financings = data.content;
      this.totalPages = data.totalPages + 1;
      this.currentPage = data.number;
      console.log(this.totalPages)
    })
  }

}
