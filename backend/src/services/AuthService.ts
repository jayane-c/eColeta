import { AppDataSource } from "../config/database";
import { MoradorModel } from "../models/MoradorModel";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

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

        // Gerar token JWT
        const secret = process.env.JWT_SECRET;
        if (!secret) {
            throw new Error("JWT_SECRET não foi definido como variavel de ambiente")
        }

        const token = jwt.sign(
            {
                id: user.id_morador,
                tipo: 'morador'
            },
            secret,
            { expiresIn: '1d' }
            
        );
        //------------------------------------------------------------------

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