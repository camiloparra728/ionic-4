import { Component, OnInit } from '@angular/core';
import { ClientsService } from '../services/clients/clients.service';
import { Client } from 'src/models/client';
import { LoadingController, ToastController } from '@ionic/angular';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import * as moment from 'moment';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';

/**
 * Registra clientes y valida si son nuevos.
 */
@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  // Variables
  public clientModel: Client;
  public clients: Array<Client>;
  form: FormGroup;
  isReadyToSave: boolean;
  minDate = '';

  constructor(private clientService: ClientsService, private formBuilder: FormBuilder, private loadingCtrl: LoadingController,
    public toastCtrl: ToastController,  private storage: Storage, private router: Router) {
    this.form = formBuilder.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      birthdate: ['', Validators.required],
      identification: ['', Validators.required],
    });
  }

  ngOnInit() {
    // Subscripción para validar campos y permitir el registro
    this.form.valueChanges.subscribe((v) => {
      this.isReadyToSave = this.form.valid;
    });
  }


  /**
   * Crea el registro
   */
  async createRegister() {
    this.validateClient().then(async (res)=>{
      const resultArray= res;
      if (resultArray) {
        this.clientModel = {
          firstname: this.form.value.firstname,
          lastname: this.form.value.lastname,
          birthdate: moment(this.form.value.birthdate).format('DD-MM-YYYY'),
          identification: String(this.form.value.identification)
        }

        this.storage.set('client', this.clientModel);
        this.clientService.addClient(this.clientModel).subscribe(async (data) => {
          this.router.navigateByUrl('/request');
          const msg = 'Registro exitoso';
          const toast = await this.toastCtrl.create({
            message: msg,
            duration: 3000,
            position: 'top'
          });
          await toast.present();
        })
      }
    });
  } 
  
  async validateClient() {
   return new Promise((resolve, reject) => {
  
this.clientService.getClients().subscribe(async (data) => {
const resultArray = Object.keys(data).map((index) => data[index]);
const filterClients = resultArray.filter(x => x.identification === String(this.form.value.identification));
if (filterClients.length > 0) {
  const msg = 'Ya tiene un registro, comuniquese con nosotros';
  const toast = await this.toastCtrl.create({
    message: msg,
    duration: 3000,
    position: 'top'
  });
  await toast.present();
  resolve(false);
}
else {
  resolve(true);
}
      });
    });
  }
  /**
   * Valida fecha de nacimiento
   */

async validateDate() {
  var birthdate = moment(this.form.value.birthdate, 'DD-MM-YYYY');
  const years = moment().diff(this.form.value.birthdate, 'years');

  let msg = 'Debe ser mayor de edad para poder registrarse';
  if(years < 18 ) {
const toast = await this.toastCtrl.create({
  message: msg,
    duration: 3000,
    position: 'top'
  }); 
  await toast.present();
  this.form.controls.birthdate.patchValue('');
}
}
}
