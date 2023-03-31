import React, { useState, useEffect } from 'react';
import AuthContext from './auth-context'
import { Spinner } from 'react-bootstrap';

const AuthContextProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);


    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
            setIsLoggedIn(true);

        }
        setIsLoading(false);

    }, []);

    const login = (userData) => {
        setIsLoggedIn(true);
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));

    };

    const logout = () => {
        setIsLoggedIn(false);
        setUser(null);
        localStorage.removeItem('user');

    };

    const contextValue = {
        user,
        isLoggedIn,
        login,
        logout,
    };

    if (isLoading) {
        // show a loading spinner because Login screen flashes for a moment after refresh
        return <div className="d-flex justify-content-center align-items-center">
            <Spinner size='xl' animation="border" />
        </div>;
    }
    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContextProvider;