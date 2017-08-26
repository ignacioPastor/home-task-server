import { UserAttributes, UserInstance } from '../models/user';
import { models, sequelize } from "../models/database";
import * as bcrypt from "bcrypt";

class UserBackend {



    public async getUser(id: number): Promise<UserAttributes> {
        let user = await models.User.findOne({ where: { id: id } });
        
        return user;
    }

}

export const userBackend = new UserBackend();