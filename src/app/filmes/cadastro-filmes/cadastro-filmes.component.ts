import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import {FormBuilder, FormGroup} from '@angular/forms';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { FilmesService } from 'src/app/core/filmes.service';
import { AlertaComponent } from 'src/app/shared/components/alerta/alerta.component';
import { ValidarCamposService } from 'src/app/shared/components/campos/validar-campos.service';
import { Alerta } from 'src/app/shared/models/alerta';
import { Filme } from 'src/app/shared/models/filme';

@Component({
  selector: 'dio-cadastro-filmes',
  templateUrl: './cadastro-filmes.component.html',
  styleUrls: ['./cadastro-filmes.component.scss']
})
export class CadastroFilmesComponent implements OnInit {

  cadastro: FormGroup;
  generos: Array<string>;

  constructor(
    public validacao:ValidarCamposService,
    public dialog: MatDialog,
    private fb: FormBuilder,
    private filmeService: FilmesService,
    private router: Router)
     { }

  get f(){
    return this.cadastro.controls;
  }

  ngOnInit() {

    this.cadastro = this.fb.group({
      titulo: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(265)]],
      urlFoto: ['', [Validators.maxLength(10)]],
      dtLancamento: ['',[Validators.required]],
      descricao: [''],
      nota: [0, [Validators.required, Validators.min(0), Validators.max(10)]],
      urlIMDb: ['', [Validators.minLength(10)]],
      genero: ['', [Validators.required]]
    });

    this.generos = ["Ação", "Romance", "Aventura", "Ficção científica", "Comédia"];

  }

  submit(): void{

    this.cadastro.markAllAsTouched();

    if(this.cadastro.invalid){
      return;
    }
    else{
      const filme = this.cadastro.getRawValue() as Filme;
      this.salvar(filme);


    }
  }

  reiniciarForm(): void{
    this.cadastro.reset();
  }

  private salvar(filme: Filme): void{
    this.filmeService.salvar(filme).subscribe(
      ()=> {

        const config = {
          data: {
            btnSucesso: 'ir para a listagem',
            btnCancelar: 'cadastrar um novo filme',
            possuirBtnFechar: true
          } as Alerta
        };

        const dialogRef = this.dialog.open(AlertaComponent, config);
        dialogRef.afterClosed().subscribe((opcao:boolean) => {
          if(opcao){
              this.router.navigateByUrl("filmes");
          }
          else{
            this.reiniciarForm();
          }
        }
        )
      },
     ()=> {
        {

          const config = {
            data: {
              btnSucesso: 'Fechar',
              titulo: 'Erro ao salvar o registro',
              descricao: 'Não conseguimos salvar seu registro, favor tentar mais tarde',

            } as Alerta
          };

          this.dialog.open(AlertaComponent, config);

        }
      }
    );
  }

}
