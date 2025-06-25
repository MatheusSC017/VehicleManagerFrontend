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

  deleteClient(event: Event, clientId: number): void {
    this.clientService.deleteClient(clientId).subscribe({
      next: () => this.getClients(),
      error: (err) => console.error(err)
    });

    this.getClients();
  }

  getClients(): void {
    this.clientService.getClients().subscribe(data => {
      this.clients = data;
    })
  }

}
