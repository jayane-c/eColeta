import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne, OneToMany, JoinColumn } from "typeorm";
import { MoradorModel } from "./MoradorModel";
import { EcoletorModel } from "./EcoletorModel";
import { AvaliacaoModel } from "./AvaliacaoModel";
//import { TransacaoModel } from "./TransacaoModel";
//import { ItensColetaModel } from "./ItensColetaModel";

export type StatusColeta = 'Pendente' | 'Aceito' | 'A Caminho' | 'Concluido' | 'Cancelado';

@Entity("coleta")
export class ColetaModel {

    @PrimaryGeneratedColumn({ name: 'id_coleta' })
    id_coleta!: number;

    @ManyToOne(() => MoradorModel, morador => morador.coletas, { nullable: false })
    @JoinColumn({ name: 'fk_morador' })
    morador!: MoradorModel;

    @ManyToOne(() => EcoletorModel, ecoletor => ecoletor.coletas_executadas, { nullable: true })
    @JoinColumn({ name: 'fk_ecoletor' })
    ecoletor!: EcoletorModel | null;

    @Column({
        type: 'enum', 
        enum: ['Pendente', 'Aceito', 'A Caminho', 'Concluido', 'Cancelado'], 
        default: 'Pendente',
    })
    status_coleta!: StatusColeta;

    @Column({ type: 'timestamp', nullable: true})
    data_solicitacao!: Date;

    @Column({ type: 'timestamp', nullable: true})
    data_agendada!: Date;

    @Column({ length: 255, nullable: true})
    observacoes!: string;

    //Relacionamentos - Comentados por enquanto

    @OneToOne(() => AvaliacaoModel, avaliacao => avaliacao.coleta)
    avaliacao!: AvaliacaoModel;

    //@OneToOne(() => TransacaoModel, (transacao) => transacao.coleta)
    //transacao!: TransacaoModel;

    //@OneToMany(() => ItensColetaModel, (itensColeta) => itensColeta.coleta)
    //itens_coleta!: ItensColetaModel[];

}
