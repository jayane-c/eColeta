import { AppDataSource } from "../config/database";
import { MoradorModel } from "../models/MoradorModel";
import { EnderecoModel } from "../models/EnderecoModel";
import { ICreateMoradorDTO, IUpdateMoradorDTO } from "../DTOs/MoradorDTO";
import bcrypt from 'bcryptjs';

export class MoradorService {
    private moradorRepository = AppDataSource.getRepository(MoradorModel);
    private enderecoRepository = AppDataSource.getRepository(EnderecoModel);

    async create(dados: ICreateMoradorDTO) {
        const { nome, email, senha, cpf, telefone, endereco } = dados;

        const moradorExists = await this.moradorRepository.findOne({ where: { email } });
        if (moradorExists) {
            throw new Error("Email já cadastrado.");
        }

        const queryRunner = AppDataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {
            const salt = await bcrypt.genSalt(10);
            const senhaHash = await bcrypt.hash(senha, salt);

            const novoEndereco = queryRunner.manager.create(EnderecoModel, {
                ...endereco,
            });
            const enderecoSalvo = await queryRunner.manager.save(novoEndereco);

            const novoMorador = queryRunner.manager.create(MoradorModel, {
                nome,
                email,
                cpf,
                telefone,
                senha: senhaHash,
                endereco: enderecoSalvo
            });
            const moradorSalvo = await queryRunner.manager.save(MoradorModel, novoMorador);

            await queryRunner.commitTransaction();
            return moradorSalvo;

        } catch (error) {
            await queryRunner.rollbackTransaction();
            throw error;
        } finally {
            await queryRunner.release();
        }
    }

    async findById(id: number) {
        const morador = await this.moradorRepository.findOne({
            where: { id_morador: id },
            relations: ['endereco']
        });
        return morador;
    }

    async update(id: number, dadosAtualizacao: IUpdateMoradorDTO) {
        const morador = await this.findById(id);

        if (!morador) {
            throw new Error('Morador não encontrado para atualização.');
        }

        const { endereco, ...dadosMorador } = dadosAtualizacao;

        if (endereco) {
            await this.enderecoRepository.update(
                morador.endereco.id_endereco,
                endereco
            );
        }
        if (Object.keys(dadosMorador).length > 0) {
            await this.moradorRepository.update(id, dadosMorador);
        }

        return this.findById(id);
    }
    async delete(id: number) {
        const morador = await this.findById(id);

        if (!morador) {
            throw new Error('Morador não encontrado para exclusão.');
        }

        const enderecoId = morador.endereco.id_endereco;

        await this.moradorRepository.remove(morador);
        
        await this.enderecoRepository.delete(enderecoId);

        return true;
    }
}