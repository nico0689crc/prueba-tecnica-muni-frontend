import React, { createContext, useEffect, useReducer } from 'react';

// reducer - state management
import { LOGIN, LOGOUT } from '@/store/actions';
import accountReducer from '@/store/accountReducer';

// project imports
import Loader from '@/ui-component/Loader';
import axios from '@/utils/axios';

// types
import { InitialLoginContextProps, AuthContextType } from '@/types/auth';

const LOCAL_STORAGE_ACCESS_TOKEN_KEY = 'accessToken';

const initialState: InitialLoginContextProps = {
  isLoggedIn: false,
  isInitialized: false,
  user: null
};

function setSession(accessToken?: string | null): void {
  if (accessToken) {
    localStorage.setItem(LOCAL_STORAGE_ACCESS_TOKEN_KEY, accessToken);
    axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
  } else {
    localStorage.removeItem(LOCAL_STORAGE_ACCESS_TOKEN_KEY);
    delete axios.defaults.headers.common.Authorization;
  }
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactElement }) {
  const [state, dispatch] = useReducer(accountReducer, initialState);

  useEffect(() => {
    const init = async () => {
      try {
        const accessToken = window.localStorage.getItem(LOCAL_STORAGE_ACCESS_TOKEN_KEY);
        if (accessToken) {
          setSession(accessToken);
          const response = await axios.get('/auth/me');
          const user = response.data;
          
          dispatch({
            type: LOGIN,
            payload: {
              isLoggedIn: true,
              user
            }
          });
        } else {
          dispatch({
            type: LOGOUT
          });
        }
      } catch (err) {
        console.error(err);
        dispatch({
          type: LOGOUT
        });
      }
    };

    init();
  }, []);

  const login = async (email: string, password: string) => {
    const response = await axios.post('/auth/login', { email, password });
    const { token, user } = response.data;
    
    setSession(token);
    dispatch({
      type: LOGIN,
      payload: {
        isLoggedIn: true,
        user
      }
    });
  };

  const logout = () => {
    setSession(null);
    dispatch({ type: LOGOUT });
  };

  if (state.isInitialized !== undefined && !state.isInitialized) {
    return <Loader />;
  }

  return <AuthContext.Provider value={{ ...state, login, logout }}>{children}</AuthContext.Provider>;
}

export default AuthContext;
