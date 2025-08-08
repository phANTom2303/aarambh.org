import { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/admin/verify`, {
          withCredentials: true
        });

        console.log(response);

        if (response.data.success) {
          setAdmin({
            id: response.data.user._id,
            name: response.data.user.name,
          });
        }
      } catch (error) {
        console.log(error);
        console.log('No valid token found');
        setAdmin(null);
      } finally {
        setIsLoading(false);
      }
    };

    verifyToken();
  }, []);

  return (
    <AuthContext.Provider value={{ admin, setAdmin, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);