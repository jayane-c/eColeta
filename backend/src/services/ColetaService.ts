import { AppDataSource } from "../config/database";
import { ColetaModel } from "../models/ColetaModel";
import { MoradorModel } from "../models/MoradorModel";
import { ItemColetaModel } from "../models/ItemColetaModel";
import { ResiduoModel } from "../models/ResiduoModel";
import { ICreateColetaDTO } from "../DTOs/IColetaDTO";

export class ColetaService {
    private coletaRepository = AppDataSource.getRepository(ColetaModel);
    private moradorRepository = AppDataSource.getRepository(MoradorModel);
    private itemRepo = AppDataSource.getRepository(ItemColetaModel);

    async create(dados: ICreateColetaDTO) {
        const { id_morador, data_agendada, observacoes, itens } = dados;

        const morador = await this.moradorRepository.findOne({
            where: {id_morador}
        });
        if (!morador) throw new Error("Morador não encontrado.");

        const queryRunner = AppDataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {
            const novaColeta = queryRunner.manager.create(ColetaModel, {
                morador,
                data_solicitacao: new Date(),
                data_agendada: new Date(data_agendada),
                observacoes: observacoes || undefined,
                status_coleta: 'Pendente'
            });
            const coletaSalva = await queryRunner.manager.save(novaColeta);

            for (const item of itens) {
                const residuo = await queryRunner.manager.findOne(ResiduoModel, {
                    where: { id_residuo: item.fk_residuo }
                });
                if (!residuo) {
                    throw new Error(`Resíduo com ID ${item.fk_residuo} não encontrado.`);
                }

                const novoItemColeta = queryRunner.manager.create(ItemColetaModel, {
                    coleta: coletaSalva,
                    residuo,
                    quantidade_estimada: item.quantidade
                });
                await queryRunner.manager.save(novoItemColeta);
            }

            await queryRunner.commitTransaction();
            return coletaSalva;
        } catch (error) {
            await queryRunner.rollbackTransaction();
            throw error;
        } finally {
            await queryRunner.release();
        }
    }

    async listarPorMorador(id_morador: number) {
        return this.coletaRepository.find({
            where: { morador: { id_morador } },
            relations: ['ecoletor', 'itens', 'itens.residuo'],
            order: { data_solicitacao: 'DESC' }
        });
    }

    async listarDisponiveis() {
        return this.coletaRepository.find({
            where: { status_coleta: 'Pendente' },
            relations: ['morador', 'morador.endereco', 'itens', 'itens.residuo'],
            order: { data_solicitacao: 'ASC' }
        });
    }
}