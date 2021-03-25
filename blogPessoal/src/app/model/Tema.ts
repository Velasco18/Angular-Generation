import { Postagem } from "./Postagem"

export class Tema{
    public id: number
    public descricao: string
    public postagem: Postagem[]// Relacionamento de um pra muitos em forma de array array
}
