import { Request, Response } from "express";
import { EcoletorService } from "../services/EcoletorService";
import { IEcoletorDTO } from "../DTOs/EcoletorDTO";

export class EcoletorController {
    private ecoletorService = new EcoletorService();

    public async getProfile(req: Request, res: Response): Promise<Response> {
        const userId = (req as any).user.id; 

        try {
            const ecoletor = await this.ecoletorService.findById(userId);
            
            if (!ecoletor) {
                return res.status(404).json({ message: 'Perfil não encontrado.' });
            }

            const { senha, ...dadosSemSenha } = ecoletor;

            const respostaSegura: IEcoletorDTO = dadosSemSenha;

            return res.status(200).json({ ecoletor: respostaSegura });

        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Erro interno ao buscar perfil.' });
        }
    }

    
    public async updateProfile(req: Request, res: Response): Promise<Response> {
        const userId = (req as any).user.id;
        
        const { nome, telefone, veiculo_tipo, disponivel } = req.body;

        try {
            const updatedEcoletor = await this.ecoletorService.update(userId, { 
                nome, 
                telefone, 
                veiculo_tipo, 
                disponivel 
            });
            
            if (updatedEcoletor) {
                const { senha, ...dadosSemSenha } = updatedEcoletor;

                const respostaSegura: IEcoletorDTO = dadosSemSenha;

                 return res.status(200).json({ 
                    message: 'Perfil atualizado com sucesso.', 
                    ecoletor: respostaSegura 
                });
            }
            
            return res.status(404).json({ message: 'Erro ao retornar dados atualizados.' });

        } catch (error: any) {
            console.error(error);
            if (error.message === "Ecoletor não encontrado para atualização.") {
                return res.status(404).json({ message: error.message });
            }
            return res.status(500).json({ message: 'Erro ao atualizar perfil.' });
        }
    }
    public async deleteProfile(req: Request, res: Response): Promise<Response> {
        const userId = (req as any).user.id;

        try {
            await this.ecoletorService.delete(userId);
            return res.status(200).json({ message: 'Conta deletada com sucesso.' });
        } catch (error: any) {
            console.error(error);
            return res.status(500).json({ message: 'Erro ao deletar conta.' });
        }
    }
}