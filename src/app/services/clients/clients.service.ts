import { Injectable } from '@angular/core';
import { Api } from 'src/providers/api/api';
import { finalize, map } from 'rxjs/operators';
import { from } from 'rxjs';
import { LoadingController } from '@ionic/angular';
import { Client } from 'src/models/client';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ClientsService {

  constructor(private api: Api) { }

  /**
   * Obtiene Lista de Clientes
   */
  getClients() {
    return this.api.get();
  }
  /**
   * Adiciona Nuevo Cliente
   * @param client Adiciona  nuevo cliente al ragistro
   */
  addClient(client: Client) {
    return this.api.post(client);
  }
}
