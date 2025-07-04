import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FinancingService } from '../../services/financing.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Financing } from '../../interfaces/financing';
import { FinancingStatus } from '../../enums/financing.enums';

@Component({
  selector: 'app-financing-detail',
  imports: [CommonModule],
  templateUrl: './financing-detail.component.html',
  styleUrl: './financing-detail.component.css'
})
export class FinancingDetailComponent {
  id!: number;
  financing!: Financing;

  financingStatusMap: { [key: string]: string } = {
      ACTIVE: FinancingStatus.ACTIVE,
      PAID_OFF: FinancingStatus.PAID_OFF,
      DEFAULTED: FinancingStatus.DEFAULTED,
      CANCELED: FinancingStatus.CANCELED
    };

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private financingService: FinancingService) {};
  
  ngOnInit(): void {
    this.id = +this.activatedRoute.snapshot.paramMap.get('id')!;
  
    this.financingService.get(this.id).subscribe({
      next: data => {
        this.financing = data;
      },
      error: error => {
        this.router.navigate(['/financiamentos']);
      }
    });
  }
  

}
