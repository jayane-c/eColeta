import { IEnderecoDTO } from "./IEnderecoDTO";

export interface ICreateCooperativaDTO {
    nome: string;
    email: string;
    senha: string;
    cnpj: string;
    telefone?: string;
    endereco: IEnderecoDTO;
}