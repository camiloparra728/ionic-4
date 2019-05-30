import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Client } from 'src/models/client';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import * as moment from 'moment';
import { ToastController } from '@ionic/angular';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
public client : Client;
public form: FormGroup;
public minDate : any;
isReadyToSave: boolean;

  constructor(private storage: Storage, private formBuilder: FormBuilder,
    public toastCtrl: ToastController) {
    // Trae del storage la información del cliente
    storage.get('client').then(client => {
      this.client=client;
    });
    const startdate = moment().subtract(1, "days");
    this.minDate = startdate.format('YYYY-MM-DD');
    console.log(String(this.minDate))
    this.form = formBuilder.group({
      nit: ['', Validators.required],
      name: ['', Validators.required],
      date: ['', Validators.required],
      salary: ['', Validators.required],
    });
  }

  
  ngOnInit() {
    // Subscripción para validar campos y permitir la consulta
    this.form.valueChanges.subscribe((v) => {
      this.isReadyToSave = this.form.valid;
    });
  }

  validateSalary() {
    if(this.form.value.salary > 99999999){
      this.form.patchValue({'salary': '99999999'})
    }
  }

  /**
   * Crea consulta de credito 
   */
  async createRequest() {

    // Casos según el requerimiento 
    switch (true) {
        case (this.form.value.salary >= 800000 && this.form.value.salary <= 1000000):
            const toast2 = await this.toastCtrl.create({
              message: 'Tiene un cupo máximo de $5.000.000 para préstamo',
                duration: 3000,
                position: 'top'
              }); 
              await toast2.present();
          break;
          case (this.form.value.salary >= 1000000 && this.form.value.salary <= 4000000):
              const toast3 = await this.toastCtrl.create({
                message: 'Tiene un cupo máximo de $20.000.000 para préstamo',
                  duration: 3000,
                  position: 'top'
                }); 
                await toast3.present();
              break;
          case (this.form.value.salary > 4000000):
              const toast4 = await this.toastCtrl.create({
                message: 'Tiene un cupo máximo de $50.000.000 para préstamo',
                  duration: 3000,
                  position: 'top'
                }); 
                await toast4.present();
            break;
      default:         
      const toast5 = await this.toastCtrl.create({
        message: 'No cumple con las normas para otorgar préstamo',
          duration: 3000,
          position: 'top'
        }); 
            await toast5.present();
        break;
    }  
  }
}
