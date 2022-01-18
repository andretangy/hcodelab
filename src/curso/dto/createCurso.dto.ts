import { IsString } from "class-validator";

export class CreateCursoDTO {
    @IsString()
    nome: string;

    @IsString()
    descricao: string;

    @IsString()
    tipo: string;
}