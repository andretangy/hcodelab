import { IsEmail, IsNumber, IsString } from "class-validator";

export class EditUserDTO {
    @IsNumber()
    userId?: number;

    @IsString()
    name?: string;

    @IsString()
    @IsEmail()
    email?: string;

    @IsString()
    password?: string;
}