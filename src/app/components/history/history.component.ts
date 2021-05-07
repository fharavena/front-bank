import { Component, OnInit } from '@angular/core';
import { Bank } from 'src/app/models/bank';
import { TransferaddService } from 'src/app/services/transferadd.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  bancos: Array<Bank>;
  transferencias: any;

  constructor(private transferenciaService: TransferaddService) { }

  ngOnInit(): void {
    this.getbancos();

  }

  getbancos() {
    this.transferenciaService.get_banco().subscribe(response => {
      response['banks'].forEach(element => {
        element['id'] = parseInt(element['id']);

      });
      this.bancos = response['banks'];
      this.getTransferencias();
      // console.log(this.bancos);
    })
  }

  getTransferencias() {
    this.transferenciaService.get_transferencia().subscribe(response => {
      if (response['code'] == 200) {
        this.transferencias = response['data'];
        this.transferencias.forEach(row => {
          row['banco'] = this.bancos.filter(x => {
            if (x['id'] == row['banco_id']) {
              return x;
            }
          })[0]['name'];
        })

      } else {
        console.log(response);
      }
    })
  }

  agregar_nombre_banco() {

  }

}
