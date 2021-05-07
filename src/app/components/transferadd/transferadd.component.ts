import { NodeWithI18n } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Bank } from 'src/app/models/bank';
import { Transfer } from 'src/app/models/transfer';
import { TransferaddService } from 'src/app/services/transferadd.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-transferadd',
  templateUrl: './transferadd.component.html',
  styleUrls: ['./transferadd.component.css']
})
export class TransferaddComponent implements OnInit {
  estaVacioElBuscador = false;
  findWord = '';
  bancos: Array<Bank>;

  msgSuccess;
  msgError;

  destinatario;
  monto;

  Resultados: Array<Transfer>;
  transferAdd: any = {
    banco_id: '',
    id: '',
    correo: '',
    nombre: '',
    rut: '',
    tipo_cuenta: '',
    banco: ''
  };

  constructor(private transferaddService: TransferaddService) { }

  ngOnInit(): void {
    this.getbancos();
  }

  onSubmit() {
    if (this.destinatario && this.monto > 0) {
      var parametros = { destinatarioid: this.destinatario, monto: this.monto };
      this.transferaddService.transferencia_add(parametros).subscribe(response => {
        if (response['code'] == 200) {
          this.msgSuccess = response['msg'];
          this.msgError = undefined;
          this.limpiarFormluario();
          // console.log(this.msgSuccess);
        } else {
          // console.log(response);
          this.msgError = response['msg'];
          this.msgSuccess = undefined;
        }
      })
    }
  }

  limpiarFormluario() {
    this.findWord = '';
    this.destinatario = '';
    this.monto = '';
    this.estaVacioElBuscador = undefined;
    this.transferAdd = {
      banco_id: '',
      id: '',
      correo: '',
      nombre: '',
      rut: '',
      tipo_cuenta: '',
      banco: ''
    };
  }

  buscar() {
    if (this.findWord == '') {
      this.estaVacioElBuscador = false;
    } else {
      this.getCuentaDestinatarios(this.findWord)
      this.estaVacioElBuscador = true;
    }
  }

  //guardar bancos en cache
  getbancos() {
    this.transferaddService.get_banco().subscribe(response => {
      response['banks'].forEach(element => {
        element['id'] = parseInt(element['id']);
      });
      this.bancos = response['banks'];
    })
  }

  // pasar transferencia en el form de crear
  seleccionarTransferencia(valor) {
    this.destinatario = valor;
    this.Resultados.forEach(element => {
      if (element['id'] == valor) {
        this.transferAdd = element;
      }
    })
  }

  getCuentaDestinatarios(palabra) {
    this.transferaddService.filter_recipient(palabra).subscribe(
      response => {
        if (response) {
          if (response['status'] == 'success') {
            this.Resultados = response['data'];
            this.Resultados.forEach(row => {
              row['banco'] = this.bancos.filter(x => {
                if (x['id'] == row['banco_id']) {
                  return x;
                }
              })[0]['name'];
            })
          } else {
            console.log(response);
          }
        } else {
          this.Resultados = []
        }
      }
    )

  }
}
