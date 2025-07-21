import { Component } from '@angular/core';
import { ClientService } from '../../services/client.service';
import { Client } from '../../interfaces/client';
import { RouterLink, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-client-list',
  imports: [CommonModule, RouterModule, RouterLink],
  templateUrl: './client-list.component.html',
  styleUrl: './client-list.component.css'
})
export class ClientListComponent {
  clients: Client[] = [];
  currentPage: number = 0;
  totalPages: number = 1;

  constructor(private clientService: ClientService) {}

  ngOnInit(): void {
    this.getClients(0, 20);
  }

  onDelete(clientId: number): void {
    this.clientService.delete(clientId).subscribe({
      next: () => this.getClients(0, 20),
      error: (err) => console.error(err)
    });
  }

  getClients(page: number, size: number): void {
    this.clientService.getAll(page, size).subscribe(data => {
      this.clients = data.content;
      this.totalPages = data.totalPages;
      this.currentPage = data.number;
    })
  }

}
