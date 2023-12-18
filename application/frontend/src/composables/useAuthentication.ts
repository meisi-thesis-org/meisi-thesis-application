import { useSession } from "@/stores/useSession";

export const useAuthentication = () => {
    const { session, refreshTokens } = useSession();

    const isTokenExpired = (accessToken: string) => {
        const expiry = (JSON.parse(atob(accessToken.split('.')[1]))).exp;
        return (Math.floor((new Date).getTime() / 1000)) >= expiry;
    }

    const isSessionExpired = async () => {
        if (isTokenExpired(session.accessToken)) {
            await refreshTokens()
            return isTokenExpired(session.accessToken)
        }

        return false;
    }

    return { isSessionExpired }
}