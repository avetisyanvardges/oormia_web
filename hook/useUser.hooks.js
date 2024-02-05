/* eslint-disable no-shadow */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  login as loginService,
  logout as logoutService,
} from "../services/user";
import { notification } from "antd";

export function useUser() {
  const [user, setUser] = useState(null);
  const [refreshState, setRefreshState] = useState(false);

  const navigate = useNavigate();

  const logOut = (user) => {
    logoutService(user).then(async ({}) => {
      localStorage.removeItem("token");
      localStorage.removeItem("name");
      localStorage.removeItem("email");
      setUser(false);
      navigate("/");
    });
  };

  const logIn = (user) =>
    loginService(user).then((data) => {
      navigate("/");
      localStorage.setItem("token", data?.data?.token);
      localStorage.setItem("name",data?.data?.user?.name)
      localStorage.setItem("email",data?.data?.user?.email)
      return user;
    })

  const isAuth = localStorage.getItem("token");

  useEffect(() => {
    if (isAuth?.length > 0) {
      setUser(true);
    } else {
      setUser(false);
    }

    return () => {
      setUser(null);
    };
  }, [refreshState, isAuth]);

  const refreshUser = () => {
    setRefreshState(!refreshState);
    console.log(refreshState, user);
  };

  return { user, logOut, logIn, refreshUser };
}
