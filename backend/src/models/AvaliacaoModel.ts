import { Entity, PrimaryGeneratedColumn, Unique, Column, JoinColumn, OneToOne } from "typeorm";
import { ColetaModel } from './ColetaModel';

@Entity("avaliacao")
@Unique(['fk_coleta'])
export class AvaliacaoModel {

    @PrimaryGeneratedColumn()
    id_avaliacao!: number;

    @Column({type: 'int', nullable: false})
    fk_coleta!: number;

    @Column({type: 'smallint', nullable: false})
    nota!: number;
    
    @Column({type: 'text', nullable: true})
    comentario!: string;

    @Column({type: 'timestamp', nullable: false})
    data_avaliacao!: Date;

    @OneToOne(() => ColetaModel, coleta => coleta.avaliacao)
    @JoinColumn({ name: 'fk_coleta', referencedColumnName: 'id_coleta' })
    coleta!: ColetaModel;
}