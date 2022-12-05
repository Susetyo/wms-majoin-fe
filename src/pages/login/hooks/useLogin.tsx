import { ChangeEvent, useMemo } from "react";
import useLoginStore from "../store";
import { useMutation } from "@tanstack/react-query";
import loginService from "../services/login.service";
import { message } from "antd";
import { useNavigate } from "react-router-dom";

const useLogin = () => {
  const navigate = useNavigate();
  const { username, password, setUsername, setPassword, setId, setRole, role } =
    useLoginStore((state) => state);
  const onChangeUsername = (e: ChangeEvent<HTMLInputElement>) =>
    setUsername(e.target.value);
  const onChangePassword = (e: ChangeEvent<HTMLInputElement>) =>
    setPassword(e.target.value);

  const generateUrl = (role: string) => {
    switch (role) {
      case "admin_i":
        return "/incoming";
      case "admin_b":
      case "admin_bm":
        return "/barang";
      case "admin_o":
      case "admin_om":
        return "/outgoing";
      default:
        return "/monitoring";
    }
  };

  const loginQuery = useMutation(
    async () => loginService({ username, password }),
    {
      onSuccess(data) {
        if (data.length > 0) {
          setId(data[0]?.id);
          setRole(data[0]?.role);
          message.success("Login Success");
          navigate(generateUrl(data[0]?.role), { replace: true });
        } else {
          console.log("wrong password");
          message.error("Please check your username and password");
        }
      },
      onError(error: any) {
        message.error(error);
      },
    }
  );

  const onSubmit = async () => {
    if (username && password) {
      loginQuery.mutate();
    }
  };

  return {
    onChangeUsername,
    onChangePassword,
    onSubmit,
  };
};

export default useLogin;
