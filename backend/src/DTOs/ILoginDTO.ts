export interface ILoginDTO {
    email: string;
    senha: string;

    tipo: "morador" | "cooperativa" | "ecoletor" | "admin";
}