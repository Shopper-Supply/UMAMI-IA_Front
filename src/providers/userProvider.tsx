import { IFormLogin } from "@/interfaces/form";
import { createContext, useContext, useEffect, useState } from "react";
import { getProfile } from "@/services/get";
import { IUserDetail, IUserRelatory } from "@/interfaces/people";
import { useRouter } from "next/router";

interface IUserProvider {
  children: React.ReactNode;
}

interface IUserContext {
  user?: IFormLogin;
  setUser: (user: IFormLogin) => void;

  userData: IUserRelatory | undefined;
  setUserData: React.Dispatch<React.SetStateAction<IUserRelatory | undefined>>;

  token?: string;
  setToken: (token: string) => void;

  auth: boolean;
  setAuth: (auth: boolean) => void;
}

const UserContext = createContext<IUserContext>({
  user: {
    username: "",
    email: "",
    password: "",
  },
  setUser: () => {},

  userData: { username: "", email: "", name: "" },
  setUserData: () => {},

  token: "",
  setToken: () => {},

  auth: false,
  setAuth: () => {},
});

export const UserProvider = ({ children }: IUserProvider) => {
  const [user, setUser] = useState<IFormLogin | undefined>({ password: "" });
  const [userData, setUserData] = useState<IUserRelatory | undefined>();
  const [token, setToken] = useState<string>();
  const [auth, setAuth] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    setToken(sessionStorage.getItem("UMAMI@TOKEN") || undefined);
    token ? setAuth(true) : setAuth(false);

    if (token !== undefined) {
      getProfile(token).then((res) => setUserData(res));
    } else {
      router.push("/");
    }
  }, [token, userData, router]);

  return (
    // setContent é utilizado para definir qual componente deverar ser exibido quando o modal for aberto.
    <UserContext.Provider
      value={{
        user,
        setUser,
        userData,
        setUserData,

        token,
        setToken,

        auth,
        setAuth,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
