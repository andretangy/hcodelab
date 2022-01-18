import { IsNumber, IsString } from "class-validator";

export class EditCursoDTO {
    @IsNumber()
    cursoId?: number;

    @IsString()
    nome?: string;

    @IsString()
    descricao?: string;

    @IsString()
    tipo?: string;
}