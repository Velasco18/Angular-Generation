import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Tema } from '../model/Tema';
import { UserLogin } from '../model/UserLogin';

@Injectable({
  providedIn: 'root',
})
export class TemaService {
  constructor(private http: HttpClient) {}

  token = {
    headers: new HttpHeaders().set('Authorization', environment.token),
  }

  getAllTema(): Observable<Tema[]> {
    return this.http.get<Tema[]>('http://localhost:8080/tema', this.token)
  }
  /* Para o getby id precisamos passar parámetro que é feito por ${} */
  getByIdTema(id: number):Observable<Tema>{
    return this.http.get<Tema>(`http://localhost:8080/tema/${id}`, this.token)
  }

  getByNomeTema(nome: string): Observable<Tema[]>{
    return this.http.get<Tema[]>(`http://localhost:8080/tema/nome/${nome}`, this.token)

  }

  postTema(tema: Tema): Observable<Tema> {
    return this.http.post<Tema>('http://localhost:8080/tema', tema, this.token)
  }
  putTema(tema: Tema): Observable<Tema>{
    return this.http.put<Tema>('http://localhost:8080/tema', tema, this.token)
  }
      /* Para o delete precisamos passar parámetro que é feito por ${} */
  deleteTema(id: number){
  return this.http.delete(`http://localhost:8080/tema/${id}`, this.token)
  }

}
