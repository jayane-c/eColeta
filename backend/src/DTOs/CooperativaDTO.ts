import { IEnderecoDTO } from "./IEnderecoDTO";

export interface ICreateCooperativaDTO {
    nome: string;
    email: string;
    senha: string;
    cnpj: string;
    telefone: string; 
    endereco: IEnderecoDTO;
}

export interface IUpdateCooperativaDTO {
    nome?: string;
    telefone?: string;
    endereco?: Partial<IEnderecoDTO>; 
}


export interface ICooperativaDTO {
    id_cooperativa: number;
    nome: string;
    email: string;
    cnpj: string;
    telefone: string;
    endereco: IEnderecoDTO;
}