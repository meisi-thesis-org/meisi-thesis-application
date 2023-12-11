import { useFetch } from "@/composables/useFetch";
import { defineStore } from "pinia";
import { ref } from "vue";

type UserEntity = {
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

export const useUser = defineStore('user', () => {
    const { createRequest } = useFetch();
    const user = ref<UserEntity>();

    const findUserByUuid = async (uuid: string) => {
        const response = await createRequest(`localhost:8000/security/users/${uuid}`, 'GET');
        return await response.json() as UserEntity;
    }
    const findUserByAcessCode = async (accessCode: string) => {
        const response = await createRequest(`localhost:8000/security/users/access-code/${accessCode}`, 'GET');
        return await response.json() as UserEntity;
    }
    const createUser = async (
        username: string,
        email: string,
        phoneNumber: string,
        dateBirth: string,
        name: string
    ) => {
        const response = await createRequest(`localhost:8000/security/users`, 'POST', { username, email, phoneNumber, dateBirth, name });
        return await response.json() as UserEntity;
    }
    const updateUserByUuid = async (
        uuid: string,
        username: string,
        email: string,
        phoneNumber: string,
        dateBirth: string,
        name: string
    ) => {
        const response = await createRequest(`localhost:8000/security/users/${uuid}`, 'PUT', { username, email, phoneNumber, dateBirth, name });
        return await response.json() as UserEntity;
    }
    const updateUserAccessCode = async (
        username: string,
        email: string,
        phoneNumber: string
    ) => {
        const response = await createRequest(`localhost:8000/security/users/access-code`, 'PUT', { username, email, phoneNumber });
        return await response.json() as UserEntity;
    }

    return { user, findUserByUuid, findUserByAcessCode, createUser, updateUserByUuid, updateUserAccessCode };
})