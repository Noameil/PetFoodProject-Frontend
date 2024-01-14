import { ReactNode, createContext, useEffect, useState } from "react";
import { Cart, User } from "../backend/@Types";
import { getUser } from "../backend/Network";

interface AuthContextState {
  isLoggedIn: boolean;
  token?: string;
  user:User | undefined;
  username?: string;
  login: (username: string, token: string) => void;
  logout: () => void;
  updateLocalCart:(cart:Cart) => void
}

const initialState = {
  isLoggedIn: false,
  user:undefined,
  login: (username: string, token: string) => {},
  logout: () => {},
  updateLocalCart: (cart:Cart) => {} 
};


export const isAdmin = (user: User | undefined) =>   user && user.roles.find(role => role.roleId === 2) 


//create context
const AuthContext = createContext<AuthContextState>(initialState);

//wrapper component rafce:
//used only in index.tsx (מנגיש את הקונטקסט לכל האפליקציה)
export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState<string>();
  const [token, setToken] = useState<string>();

  const [user, setUser] = useState<User | undefined>()

  const updateLocalCart = (cart: Cart) => {
    if(!user)return
    setUser({...user, cart})
  }  

  useEffect(() => {
    //code that runs once, thus no infinite render loop
    //run code once the component is loaded to the dom:
    const data = localStorage.getItem("user");
    if (data) {
      const user = JSON.parse(data);
      setIsLoggedIn(true);
      setToken(user.token);
      setUsername(user.username);
      fetchUserWithRoles()
    }
  }, []);

  const fetchUserWithRoles = () => {
    const fetchUser = async () => {
      const _user = await getUser()
      setUser(_user)
    }
    fetchUser()
  }
  const auth = {
    isLoggedIn: isLoggedIn,
    token,
    user,
    username,
    login: (username: string, token: string) => {
      setUsername(username);
      setToken(token);
      setIsLoggedIn(true);
      fetchUserWithRoles()
    },
    logout: () => {
      localStorage.removeItem("user");
      setUsername(undefined);
      setToken(undefined);
      setIsLoggedIn(false);
      setUser(undefined)
    },
    updateLocalCart
  };
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

export default AuthContext;
