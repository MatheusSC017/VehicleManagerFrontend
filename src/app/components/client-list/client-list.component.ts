import { Component } from '@angular/core';
import { ClientService } from '../../services/client.service';
import { Client } from '../../interfaces/client';
import { RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-client-list',
  imports: [RouterModule, RouterLink],
  templateUrl: './client-list.component.html',
  styleUrl: './client-list.component.css'
})
export class ClientListComponent {
  clients: Client[] = [];

  constructor(private clientService: ClientService) {}

  ngOnInit(): void {
    this.getClients();
  }

  onDelete(clientId: number): void {
    this.clientService.delete(clientId).subscribe({
      next: () => this.getClients(),
      error: (err) => console.error(err)
    });
  }

  getClients(): void {
    this.clientService.getAll().subscribe(data => {
      this.clients = data;
    })
  }

}
