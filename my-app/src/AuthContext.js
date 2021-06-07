import React, { createContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
const AuthContext = createContext();
const { Provider } = AuthContext;
const AuthProvider = ({ children }) => {
    const history = useHistory();
    const token = localStorage.getItem('token');
    const id = localStorage.getItem('id');
    const expiresAt = localStorage.getItem('expiresAt');
    const [authState, setAuthState] = useState({
        token,
        expiresAt,
        userInfo: id ? JSON.parse(id) : {}
    });
    const setAuthInfo = ({ token, id, expiresAt }) => {
        localStorage.setItem('token', token);
        localStorage.setItem(
            'id',
            JSON.stringify(id)
        );
        localStorage.setItem('expiresAt', expiresAt);
        setAuthState({
            token,
            id,
            expiresAt
        });
    };
    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('id');
        localStorage.removeItem('expiresAt');
        setAuthState({});
        history.push('/');
    };
    const isAuthenticated = () => {
        if (!authState.token || !authState.expiresAt) {
            return false;
        }
        return (
            new Date().getTime() / 1000 < authState.expiresAt
        );
    };
    return (
        <Provider
            value={{
                authState,
                setAuthState: authInfo => setAuthInfo(authInfo),
                logout,
                isAuthenticated,
            }}
        >
            {children}
        </Provider>
    );
};
export { AuthContext, AuthProvider };