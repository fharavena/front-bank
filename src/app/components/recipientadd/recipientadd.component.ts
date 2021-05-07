import { Component, OnInit } from '@angular/core';
import { Bank } from 'src/app/models/bank';
import { TypeAccount } from 'src/app/models/typeAccount';
import { RecipientaddService } from 'src/app/services/recipientadd.service';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recipientadd',
  templateUrl: './recipientadd.component.html',
  styleUrls: ['./recipientadd.component.css']
})
export class RecipientaddComponent implements OnInit {
  public typeAccounts: Array<TypeAccount>;
  public banks: Array<Bank>;
  public msg;
  public msgSucceful;
  checkoutForm = this.formBuilder.group({
    "userid": 0,
    "tipo_cuentaid": 0,
    "banco_id": 0,
    "nombre": '',
    "rut": '',
    "correo": '',
    "telefono": '',
    "numero_cuenta": 0,
  });

  constructor(
    private recipientaddService: RecipientaddService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.get_banks();
    this.get_transfer_type();
  }

  onSubmit(): void {
    this.msg = false;
    this.checkoutForm.value.banco_id = parseInt(this.checkoutForm.value.banco_id);
    this.checkoutForm.value.userid = 1;
    this.recipientaddService.add_recipient(this.checkoutForm.value).subscribe(
      response => {
        if (response.status == 'success') {
          this.checkoutForm.reset();
          this.msgSucceful = "Destinatario creado";
          this.msg = undefined;
          // this.router.navigate(['/transferir']);
        } else {
          // console.log(response);
          this.msgSucceful = undefined;
          this.msg = "error";
        }
      }, error => {
        // console.log(error);
        this.msgSucceful = undefined;
        this.msg = "error";
      })

  }

  get_banks() {
    this.recipientaddService.get_banks().subscribe(response => {
      this.banks = response['data'];
    })
  }

  get_transfer_type() {
    this.recipientaddService.get_transfer_type().subscribe(response => {
      this.typeAccounts = response['data'];
    })
  }
}
