import { Request, Response } from "express";
import {encrypt} from "../helpers/helpers";
import {User} from "../entity/User";
import {AppDataSource} from "../data-source";
import { UserDTO } from "../dto/user.dto";
import * as cache from "memory-cache";

export class UserController {

    static async signup(req: Request, res: Response){
        const { firstName, lastName, username, email, password, birthdate } = req.body;
        const encryptedPassword = await encrypt.encryptPassword(password);
        let user = new User();
        user.firstName = firstName;
        user.lastName = lastName;
        user.email = email;
        user.username = username;
        user.password = encryptedPassword;
        user.birthdate = new Date(birthdate);

        const userRepository = AppDataSource.getRepository(User);
        user = await userRepository.save(user);

        const userResponse = new UserDTO();
        userResponse.firstName = user.firstName;
        userResponse.lastName = user.lastName;
        userResponse.email = user.email;
        userResponse.role = user.role;
        userResponse.birthdate = user.birthdate;

        console.log(user.id)
        const token = encrypt.generateToken({ id: user.id })

        return res
            .status(200)
            .json({
                message: 'User created successfully!',
                token,
                userResponse
            })

    }

    static async getUsers(req: Request, res: Response){
        const data = cache.get('data')
        if(data){
            console.log('Serving data from cache')
            return res.status(200). json({
                data
            })
        } else {
            console.log('Serving data from database')
            const userRepository = AppDataSource.getRepository(User);
            const users = await userRepository.find();
            cache.put('data', users, 6000);
            return res.status(200).json({
                data: users
            })
        }
    }

}