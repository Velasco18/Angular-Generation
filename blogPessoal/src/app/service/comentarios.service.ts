import { Observable } from 'rxjs';
import { Comentario } from './../model/Comentario';
import { environment } from './../../environments/environment.prod';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ComentariosService {

  constructor(private http: HttpClient) { }

  token = {
    headers: new HttpHeaders().set('Authorization', environment.token)
  }

  getAllComentarios(): Observable<Comentario[]> {
    return this.http.get<Comentario[]>('http://localhost:8080/comentarios', this.token)
  }

  getByIdComentario(id: number): Observable<Comentario>{
    return this.http.get<Comentario>(`http://localhost:8080/comentarios/${id}`, this.token)
  }

  postComentario(comentario: Comentario): Observable<Comentario> {
    return this.http.post<Comentario>('http://localhost:8080/comentarios', comentario, this.token)
  }

  putComentario(comentario: Comentario): Observable<Comentario>{
    return this.http.put<Comentario>('http://localhost:8080/comentarios', comentario, this.token)
  }

  deleteComentario(id: number){
    return this.http.delete(`http://localhost:8080/comentarios/${id}`, this.token)
  }
}