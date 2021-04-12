import { CoreEnvironment } from '@angular/compiler/src/compiler_facade_interface';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Comentario } from '../model/Comentario';
import { Postagem } from '../model/Postagem';
import { Tema } from '../model/Tema';
import { Usuario } from '../model/Usuario';
import { AlertasService } from '../service/alertas.service';
import { AuthService } from '../service/auth.service';
import { ComentariosService } from '../service/comentarios.service';
import { PostagemService } from '../service/postagem.service';
import { TemaService } from '../service/tema.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  /* Instancias de postagem */
  postagem: Postagem = new Postagem()
  listaPostagens: Postagem[]
  tituloPost: string
  idPostagem = environment.id

  /* Instancias de Tema */
  tema: Tema = new Tema()
  listaTemas: Tema[]
  idTema: number
  nomeTema: string

  /* Instancias de Usuário*/
  usuario: Usuario = new Usuario()
  idUsuario = environment.id
  foto = environment.foto
  nome = environment.nome


  key = 'data'
  reverse = true
  
  comentario: Comentario = new Comentario()
  listaComentarios: Comentario[]

  idComentario: number
  
  constructor(
    private router: Router,
    private postagemService: PostagemService,
    private temaService: TemaService,
    public authService: AuthService,
    private alertas: AlertasService,
    private comentarioService: ComentariosService,
    private route: ActivatedRoute

  ) { }

  ngOnInit() {
    window.scroll(0,0)

    if(environment.token == ''){
      this.router.navigate(['/entrar'])
    }

    this.getAllTemas()
    this.getAllPostagens()
    let idComentario = this.route.snapshot.params['id']

  }
  getAllTemas(){
    this.temaService.getAllTema().subscribe((resp: Tema[])=>{
      this.listaTemas = resp
    })
  }

  findByIdTema(){
    this.temaService.getByIdTema(this.idTema).subscribe((resp: Tema)=>{
      this.tema = resp
    })
  }
  getAllPostagens(){
    this.postagemService.getAllPostagens().subscribe((resp: Postagem[]) =>{
      this.listaPostagens = resp

    })
  }
  findByIdUser(){
    this.authService.getByIdUser(this.idUsuario).subscribe((resp: Usuario) =>{
      this.usuario = resp
    })
  }

  publicar(){
    this.tema.id = this.idTema
    this.postagem.tema = this.tema

    this.usuario.id = this.idUsuario
    this.postagem.usuario = this.usuario

    this.postagemService.postPostagem(this.postagem).subscribe((resp: Postagem)=>{
      this.postagem = resp
      this.alertas.showAlertSuccess('Postagem realizada com sucesso!')
      this.postagem = new Postagem()
      this.getAllPostagens()
    })

  }

  findByTituloPostagem(){

    if(this.tituloPost == ''){
      this.getAllPostagens()
    }
    else{
      this.postagemService.getByTituloPostagem(this.tituloPost).subscribe((resp: Postagem[])=>{
        this.listaPostagens = resp
      })
    }
  }

  findByNomeTema(){
    if(this.nomeTema == ''){
      this.getAllTemas()
    }
    else{
      this.temaService.getByNomeTema(this.nomeTema).subscribe((resp: Tema[])=>{
        this.listaTemas = resp
      })
    }
  }

  comentar(id: number){

    this.usuario.id = this.idUsuario;
    this.comentario.usuario = this.usuario;

    this.postagem.id = id;
    this.comentario.postagem = this.postagem;

    this.comentarioService.postComentario(this.comentario).subscribe((resp: Comentario) => {
      this.comentario = resp
      this.alertas.showAlertSuccess('Comentário inserido com sucesso!');
      this.comentario = new Comentario();
      this.getAllPostagens();
    }, err => {
      console.log(this.comentario)
    })

  }

  findallComentarios(){
    this.comentarioService.getAllComentarios().subscribe((resp: Comentario[])=>{
      this.listaComentarios = resp
    })
  }
  deleteComent(id:number)
  {
    let idComent = Number(id)
    let pathId = this.idPostagem
    console.log('entrou!'+ idComent)
    this.comentarioService.deleteComentario(idComent).subscribe(()=>{
      this.alertas.showAlertSuccess("Comentario apagado!");
    });

  }
  apagarComentario(id: number){
    this.comentarioService.deleteComentario(id).subscribe(() =>{
      this.alertas.showAlertSuccess('Comentario apagado com sucesso!')
      this.getAllPostagens()
      
    })
    
  }

}
