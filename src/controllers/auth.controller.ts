import { Request, Response } from "express";
import {AppDataSource} from "../data-source";
import {User} from "../entity/User";
import {encrypt} from "../helpers/helpers";
import {UserDTO} from "../dto/user.dto";

export class AuthController {

    static async login(req: Request, res: Response){
        try {
            const { email, password } = req.body;

            if(!email || !password){
                return res.status(500).json({ message: 'Email and password required!' });
            }

            const userRepository = AppDataSource.getRepository(User);
            const user = await userRepository.findOne({ where:{  email } });

            const isValidPassword = encrypt.comparePassword(password, user.password);
            if(!user || !isValidPassword){
                return res.status(404).json({ message: 'User not found' });
            }

            const token = encrypt.generateToken({ id: user.id});

            const userResponse = new UserDTO(
                user.id,
                user.firstName,
                user.lastName,
                user.email,
                user.username,
                user.password,
                user.birthdate,
                user.role,
                user.createdAt,
                user.updatedAt
            )

            return res.status(200).json({
                message: 'Login successful',
                token,
                userResponse
            })

        } catch(error){
            console.log(error);
            return res.status(500).json({ message: 'Internal error'})
        }
    }

    static async getProfile(req: Request, res: Response){
        if(!req[' currentUser']){
            return res.status(401).json({ message: 'Unauthorized'})
        }
        const userRepository = AppDataSource.getRepository(User);
        const user = await userRepository.findOne({
            where: { id: req[' currentUser'].id }
        })

        return res.status(200).json({ ...user, password: undefined})
    }

}