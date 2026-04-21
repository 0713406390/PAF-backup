import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import client, { authBaseUrl } from "../api/client";
const AuthContext = createContext(undefined);
export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const refreshUser = useCallback(async () => {
        try {
            const response = await client.get("/auth/me");
            if (response.data?.authenticated) {
                setUser(response.data);
            }
            else {
                setUser(null);
            }
        }
        catch {
            setUser(null);
        }
        finally {
            setIsLoading(false);
        }
    }, []);
    useEffect(() => {
        void refreshUser();
    }, [refreshUser]);
    const loginWithGoogle = useCallback(() => {
        window.location.href = `${authBaseUrl}/oauth2/authorization/google`;
    }, []);
    const logout = useCallback(async () => {
        await client.post("/auth/logout");
        setUser(null);
    }, []);
    const value = useMemo(() => ({
        user,
        isLoading,
        isAuthenticated: Boolean(user?.authenticated),
        loginWithGoogle,
        logout,
        refreshUser,
    }), [user, isLoading, loginWithGoogle, logout, refreshUser]);
    return _jsx(AuthContext.Provider, { value: value, children: children });
}
export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used inside AuthProvider");
    }
    return context;
}
