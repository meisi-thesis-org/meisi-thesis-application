import { useFetch } from "@/composables/useFetch";
import { defineStore } from "pinia";
import { ref } from "vue";

export type UserEntity = {
    readonly uuid: string
    readonly username: string
    readonly email: string
    readonly phoneNumber: string
    readonly accessCode: string
    readonly name: string
    readonly dateBirth: string
    readonly createdAt: string
    readonly updatedAt: string
}

export type FindUserByUuidRequest =
    Readonly<Pick<UserEntity, 'uuid'>>
export type FindUserByAccessCodeRequest =
    Readonly<Pick<UserEntity, 'accessCode'>>
export type CreateUserRequest =
    Readonly<Pick<UserEntity, 'username' | 'email' | 'phoneNumber' | 'name' | 'dateBirth'>>
export type UpdateUserByUuidRequest =
    Readonly<Pick<UserEntity, 'uuid'>> &
    Partial<Readonly<Omit<UserEntity, 'createdAt' | 'updatedAt'>>>
export type UpdateUserAccessCodeRequest =
    Partial<Readonly<Pick<UserEntity, 'username' | 'email' | 'phoneNumber'>>>

export const useUser = defineStore('user', () => {
    const { createRequest } = useFetch();
    const user = ref<UserEntity>();

    const findUserByUuid = async (params: FindUserByUuidRequest) => {
        try {
            const response = await createRequest(`localhost:8000/security/users/${params.uuid}`, 'GET');
            const userEntity = await response.json() as UserEntity;
            return userEntity;
        } catch (error) {
            throw error;
        }
    }
    const findUserByAcessCode = async (params: FindUserByAccessCodeRequest) => {
        try {
            const response = await createRequest(`localhost:8000/security/users/access-code/${params.accessCode}`, 'GET');
            const userEntity = await response.json() as UserEntity;
            return userEntity;
        } catch (error) {
            throw error;
        }
    }
    const createUser = async (params: CreateUserRequest) => {
        try {
            const response = await createRequest(`localhost:8000/security/users`, 'POST', params);
            const userEntity = await response.json() as UserEntity;
            return userEntity;
        } catch (error) {
            throw error;
        }
    }
    const updateUserByUuid = async (uuid: string, params: Omit<UpdateUserByUuidRequest, 'uuid'>) => {
        try {
            const response = await createRequest(`localhost:8000/security/users/${uuid}`, 'PUT', params);
            const userEntity = await response.json() as UserEntity;
            return userEntity;
        } catch (error) {
            throw error;
        }
    }
    const updateUserAccessCode = async (params: UpdateUserAccessCodeRequest) => {
        try {
            const response = await createRequest(`localhost:8000/security/users/access-code`, 'PUT', params);
            const userEntity = await response.json() as UserEntity;
            return userEntity;
        } catch (error) {
            throw error;
        }
    }

    return { user, findUserByUuid, findUserByAcessCode, createUser, updateUserByUuid, updateUserAccessCode };
})