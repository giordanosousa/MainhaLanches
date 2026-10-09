import prismaClient from '../../prisma/index';
import {hash} from 'bcryptjs';

interface UserRequest{
    name: string;
    email: string;
    password: string; 
}

class CreateUserService{
    async execute({name, email, password}: UserRequest){

        // verificar se ele enviou um email
        if(!email){
            throw new Error("Email incorrect")
        }

        // Verificar se esse email ja esta cadastrado na plataforma
        const userAlreadyExists = await prismaClient.user.findFirst({
            where:{
                email: email
            }
        })

        // Se não tivercadastrado ira cadastrar o usuário
        if(userAlreadyExists){
            throw new Error("User already exists")
        }
        
        // Criptografar a senha do usuário
        const passwordHash = await hash(password, 8);

        // Os dados que esperam que o cliente envie no body
        const user = await prismaClient.user.create({
            data:{
                name: name,
                email: email,
                password: passwordHash,
            },
            // Select serve para dizer o que eu quero devolver, no caso retornar.
            select:{
                id: true,
                name: true,
                email: true,
            }
        })

        return user;
    }
}

export { CreateUserService }