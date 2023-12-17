import { useSession } from "@/stores/useSession";

export const useAuthentication = () => {
    const { session } = useSession();

    const isAuthenticated = () => {
        if (!session?.accessToken || !session?.refreshToken || !session?.userUuid) return false;
        const expiry = (JSON.parse(atob(session.accessToken.split('.')[1]))).exp;
        return (Math.floor((new Date).getTime() / 1000)) <= expiry;
    }

    return { isAuthenticated }
}