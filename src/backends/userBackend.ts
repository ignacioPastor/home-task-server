import { UserAttributes, UserInstance } from '../models/user';
import { models, sequelize } from "../models/database";
import * as bcrypt from "bcrypt";

class UserBackend {

    public async getUser(id: number): Promise<UserAttributes> {
        let user = await models.User.findOne({ where: { id: id } });
        
        return user;
    }

    public async signIn(email: string, password: string) {
        let user = await this.getByEmail(email,true);

        if(user && bcrypt.compareSync(password,user.password)) {
            delete user.password;
            return {ok: true, user};
        }
        else {
            return {ok: false};
        }
    }

    public async getByEmail(email: string, keepPass?: boolean) : Promise<UserAttributes> {
        let user = await models.User.findOne({ where: { email: email } });
        if (user) {
            if (!keepPass) delete user.dataValues.password;
            return user.dataValues;
        }
    }

    public async createUser(user): Promise<UserAttributes> {
        user.password = bcrypt.hashSync(user.password, 10);
        let newUser = await models.User.create(user);
        return newUser.dataValues;
    }

    public async removeUser(id: number): Promise<number> {
        let rows = await models.User.destroy({ where: { id: id } });
        return rows;
    }

    public async updateUser(user): Promise<number> {
        let updatedUser = await models.User.update(user,{where: {email: user.email}});
        return updatedUser[0];
    }

    public async updateUserById(data, userID): Promise<number> {
        let updatedUser = await models.User.update(data,{where: {id: userID}});
        return updatedUser[0];
    }

    public async updateUserByEmail(data, userMail): Promise<number> {
        let updatedUser = await models.User.update(data,{where: {email: userMail}});
        return updatedUser[0];
    }

}

export const userBackend = new UserBackend();