import {CreateUserDto} from "./dro/create-user.dto";
import {getCustomRepository} from "typeorm";
import {UserRepository} from "../../typeorm/repositories/user.repository";
import {UserEntity} from "../../typeorm/entities/user.entity";

export const getUserByEmail = async (email: string): Promise<UserEntity | undefined> => {
    const userRepository = getCustomRepository(UserRepository);
    return await userRepository.findOne({where: {email}});
}

export const createUser = async (data: CreateUserDto): Promise<UserEntity> => {
    const userRepository = getCustomRepository(UserRepository);

    const newUser = new UserEntity();
    newUser.email = data.email;
    newUser.password = data.password;
    return await userRepository.save(newUser);
}