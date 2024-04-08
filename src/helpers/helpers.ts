import * as jwt from "jsonwebtoken";
import * as bcrypt from "bcrypt";
import * as dotenv from "dotenv";
import { payload } from "../dto/user.dto";

dotenv.config();

export class encrypt {
    static async encryptPassword(password: string){
        return bcrypt.hashSync(password, 12);
    }

    static comparePassword(password: string, hashPassword: string){
        return bcrypt.compare(password, hashPassword);
    }

    static generateToken(payload: payload){
        return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' });
    }
}