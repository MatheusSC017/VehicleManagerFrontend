import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterModule, Router, ActivatedRoute } from '@angular/router';
import { ClientService } from '../../services/client.service';
import { Client } from '../../interfaces/client';
import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorResponse } from '../../interfaces/error-response';

@Component({
  selector: 'app-client-form',
  imports: [RouterModule, RouterLink, FormsModule, CommonModule],
  templateUrl: './client-form.component.html',
  styleUrl: './client-form.component.css'
})
export class ClientFormComponent {
  title = "Adicionar"
  id!: number;

  serverErrors: any = {}
  client: Client = {
    "id": 0,
    "firstName": "",
    "lastName": "",
    "email": "",
    "phone": ""
  }

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private clientService: ClientService) {}

  ngOnInit(): void {
    this.id = +this.activatedRoute.snapshot.paramMap.get('id')!;

    if (this.id) {
      this.title = "Atualizar"

      this.clientService.get(this.id).subscribe({
        next: data => {
          this.client = data;
        },
        error: (err) => {
          this.router.navigate(['/clientes']);
        }
      });
    }
  }

  onSubmit(client: Client): void {
    if (this.id) {
      
      this.clientService.update(this.id, client).subscribe({
        next: (clientData: Client) => {
          this.router.navigate(['/clientes']);
        },
        error: (httpError: HttpErrorResponse) => {
          const errorResponse = httpError.error as ErrorResponse<Client>;
          this.serverErrors = errorResponse.errors;
        }
      })
    } else {
      this.clientService.create(client).subscribe({
        next: (clientData: Client) => {
          this.router.navigate(['/clientes']);
        },
        error: (httpError: HttpErrorResponse) => {
          const errorResponse = httpError.error as ErrorResponse<Client>;
          this.serverErrors = errorResponse.errors;
        }
      })
    }
  }

}
