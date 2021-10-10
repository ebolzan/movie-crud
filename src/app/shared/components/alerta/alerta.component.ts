import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Alerta } from '../../models/alerta';

@Component({
  selector: 'alerta',
  templateUrl: './alerta.component.html',
  styleUrls: ['./alerta.component.scss']
})
export class AlertaComponent implements OnInit {


    alerta = {
    titulo      : 'Sucesso!',
    descricao   : 'Seu registro foi cadastrada com sucesso!',
    btnSucesso  : 'OK',
    btnCancelar : 'Cancelar',
    corBtn      : 'primary',
    possuirBtnFechar : false,

  } as Alerta;

  constructor(public dialogRef: MatDialogRef<AlertaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Alerta) { }



  ngOnInit() {

    if(this.data){
      this.alerta.titulo = this.data.titulo || this.alerta.titulo;
      this.alerta.descricao = this.data.descricao || this.alerta.descricao;
      this.alerta.btnSucesso = this.data.btnSucesso || this.alerta.btnSucesso;
      this.alerta.btnCancelar = this.data.btnCancelar || this.alerta.btnCancelar;
      this.alerta.corBtn = this.data.corBtn || this.alerta.corBtn;
      this.alerta.possuirBtnFechar = this.data.possuirBtnFechar || this.alerta.possuirBtnFechar;
    }
  }

}
