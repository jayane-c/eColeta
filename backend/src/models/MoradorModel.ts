import {Entity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne, JoinColumn} from "typeorm";
import { EnderecoModel } from "./EnderecoModel";

@Entity("morador")
export class MoradorModel {

    @PrimaryGeneratedColumn({name:'id_morador'})
    id_morador!: number;

    @OneToOne(() => EnderecoModel)

    @JoinColumn({ name: 'fk_endereco'})
    endereco!: EnderecoModel;
    //@OneToMany(() => EcoletorModel, (ecoletor) => ecoletor.morador)
    //coletores!: EcoletorModel[];

    @Column({length: 100, nullable: false})
    nome!: string;

    @Column({length: 100, unique: true, nullable: false})
    email!: string;

    @Column({length: 255, nullable: false})
    senha!: string;

    @Column({length: 14, unique: true, nullable: false})
    cpf!: string;

    @Column({length: 20, nullable: false})
    telefone!: string;

    @Column({nullable: false, default: 0})
    saldo!: number;

}

