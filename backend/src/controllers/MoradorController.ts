import { Request, Response } from "express";
import { MoradorService } from "../services/MoradorService";
import { IMoradorDTO } from "../DTOs/MoradorDTO";

export class MoradorController {
    private moradorService = new MoradorService();

    public async getProfile(req: Request, res: Response): Promise<Response> {
        const userId = (req as any).user.id;

        try {
            const morador = await this.moradorService.findById(userId);
            
            if (!morador) {
                return res.status(404).json({ message: 'Perfil não encontrado.' });
            }

            const { senha, ...moradorSemSenha } = morador;

            const respostaSegura: IMoradorDTO = moradorSemSenha;

            return res.status(200).json({ morador: respostaSegura });

        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Erro interno ao buscar perfil.' });
        }
    }

    public async updateProfile(req: Request, res: Response): Promise<Response> {
        const userId = (req as any).user.id;

        const { nome, telefone } = req.body;

        try {
            const updatedUser = await this.moradorService.update(userId, { nome, telefone });

            if (updatedUser) {
                const { senha, ...moradorSemSenha } = updatedUser;
                
                const respostaSegura: IMoradorDTO = moradorSemSenha;

                return res.status(200).json({ 
                    message: 'Perfil atualizado com sucesso.', 
                    morador: respostaSegura 
                });
            }

            return res.status(404).json({ message: 'Erro ao retornar dados atualizados.' });

        } catch (error: any) {
            console.error(error);
            if (error.message === "Morador não encontrado para atualização.") {
                return res.status(404).json({ message: error.message });
            }
            return res.status(500).json({ message: 'Erro ao atualizar perfil.' });
        }
    }

    public async deleteProfile(req: Request, res: Response): Promise<Response> {
        const userId = (req as any).user.id;

        try {
            await this.moradorService.delete(userId);
            return res.status(200).json({ message: 'Conta deletada com sucesso.' });
        } catch (error: any) {
            console.error(error);
            return res.status(500).json({ message: 'Erro ao deletar conta.' });
        }
    }
}