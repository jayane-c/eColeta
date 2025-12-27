import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

interface TokenPayload {
    id: number;
    tipo: string;
    iat: number;
    exp: number;
}

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(401).json({message: "Token não fornecido"})
    }

    const parts = authorization.split(" ");
    if (parts.length !== 2){
        return res.status(401).json({ message: "Formato de token invalido"});
    }
    const token = parts[1];

    try {
        const secret = process.env.JWT_SECRET;
        if (!secret) {
            return res.status(401).json({ message: "JWT_SECRET não configurado" });
        }

        const decoded = jwt.verify(token, secret);
        const { id, tipo } = decoded as TokenPayload;

        // injetar o id do usuario na requisição
        (req as any).user = { id, tipo}
        return next();
    } catch (error){
        return res.status(401).json({message: "token de autenticação invalido ou expirado"})
    }
}