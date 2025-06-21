import { Component } from '@angular/core';
import { ClientService } from '../../services/client.service';
import { Client } from '../../interfaces/Client';

@Component({
  selector: 'app-client-list',
  imports: [],
  templateUrl: './client-list.component.html',
  styleUrl: './client-list.component.css'
})
export class ClientListComponent {
  clients: Client[] = [];

  constructor(private clientService: ClientService) {}

  ngOnInit(): void {
    this.clientService.getClients().subscribe(data => {
      this.clients = data;
    })
  }
}
