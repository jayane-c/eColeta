import {Entity, PrimaryGeneratedColumn, Column, OneToOne} from "typeorm";

export enum tipo_categoria {
    COMUM = 'Comum',
    ESPECIAL = 'Especial'
}
export type ResiduoCategoria  = 'Comum' | 'Especial';
@Entity("residuo")
export class ResiduoModel {

    @PrimaryGeneratedColumn({name:'id_residuo'})
    id_residuo!: number;

    @Column({length: 50, unique: true, nullable: false})
    nome!: string;

    @Column({type: 'enum', enum: tipo_categoria, nullable: false})
    categoria!: tipo_categoria;

    @Column({type: 'text'})
    descricao!: string;

}
