import React, {createContext, useState, useEffect} from 'react';
export const UserContext = createContext();
const apiUrl = 'https://98c7-223-185-33-135.ngrok-free.app/user/getAllUsers';

export const UserProvider = ({children}) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(apiUrl);
        const json = await response.json();
        setUsers(json);
      } catch (err) {
        console.error('Failed to fetch users:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <UserContext.Provider value={{users, loading}}>
      {children}
    </UserContext.Provider>
  );
};
