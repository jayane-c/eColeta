import { Entity, PrimaryGeneratedColumn, Unique, Column, ManyToOne, JoinColumn } from "typeorm";
import { ColetaModel } from './ColetaModel';

@Entity("avaliacao")
@Unique(['fk_coleta'])
export class AvaliacaoModel {

    @PrimaryGeneratedColumn()
    id_avaliacao!: number;

    @Column({type: 'int', nullable: false})
    fk_coleta!: number;

    @Column({type: 'tinyint', nullable: false})
    nota!: number;
    
    @Column({type: 'text', nullable: true})
    comentario!: string;

    @Column({type: 'timestamp', nullable: false})
    data_avaliacao!: Date;

    @ManyToOne(() => ColetaModel)
    @JoinColumn({ name: 'fk_coleta', referencedColumnName: 'id_coleta' })
    coleta!: ColetaModel;
}