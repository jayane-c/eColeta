import { AppDataSource } from "../config/database";
import { CooperativaModel } from "../models/CooperativaModel";
import { EnderecoModel } from "../models/EnderecoModel";
import { ICreateCooperativaDTO } from "../DTOs/ICreateCooperativaDTO";
import bcrypt from "bcryptjs";

export class CooperativaService {
    private cooperativaRepository = AppDataSource.getRepository(CooperativaModel);

    async create(dados: ICreateCooperativaDTO) {
        const { nome, email, senha, cnpj, telefone, endereco } = dados;

        const coopExists = await this.cooperativaRepository.findOne({
            where: [
                { email },
                { cnpj }
            ]
        });

        if (coopExists) {
            throw new Error("Já existe uma cooperativa cadastrada com esse Email ou CNPJ.");
        }

        const queryRunner = AppDataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {
            const salt = await bcrypt.genSalt(10);
            const senhaHash = await bcrypt.hash(senha, salt);

            const novoEndereco = queryRunner.manager.create(EnderecoModel, {
                rua: endereco.rua,
                cep: endereco.cep,
                numero: endereco.numero,
                bairro: endereco.bairro,
                cidade: endereco.cidade, // Campos opcionais no DTO precisam ser tratados se o model exigir
                estado: endereco.estado,
                complemento: endereco.complemento || undefined,
            });

            const enderecoSalvo = await queryRunner.manager.save(novoEndereco);

            const novaCooperativa = queryRunner.manager.create(CooperativaModel, {
                nome,
                email,
                cnpj,
                senha: senhaHash,
                // telefone,
                endereco: enderecoSalvo
            });

            const cooperativaSalva = await queryRunner.manager.save(CooperativaModel, novaCooperativa);

            await queryRunner.commitTransaction();

            return cooperativaSalva;

        } catch (error) {
            await queryRunner.rollbackTransaction();
            throw error;
        } finally {
            await queryRunner.release
        }
    }
}