import { AppDataSource } from "../config/database";
import { MoradorModel } from "../models/MoradorModel";
import bcrypt from "bcryptjs";

export class AuthService {

    async loginMorador(email: string, senhaDigitada: string) {
        const moradorRepository = AppDataSource.getRepository(MoradorModel);
        const user = await moradorRepository.findOne({ 
            where: { email },
            select:  ['id_morador', 'nome', 'email', 'senha']
        });

        if (!user) {
            throw new Error("Email ou senha inválidos.");
        }

        // implementação do hash
        const senhaValida = await bcrypt.compare(senhaDigitada, user.senha)

        if (!senhaValida) {
            throw new Error("Credenciais inválidas.");
        }

        // Gerar token JWT aqui (não implementado)
        const token = "token-fake-service";

        return {
            token,
            user: {
                id: user.id_morador,
                nome: user.nome,
                email: user.email,
                tipo: "morador"
            }
        };
    }
}