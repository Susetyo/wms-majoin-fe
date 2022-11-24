import { ChangeEvent, useMemo } from "react";
import useLoginStore from "../store";
import { useMutation } from "@tanstack/react-query";
import loginService from "../services/login.service";
import {message} from 'antd';
import {useNavigate} from "react-router-dom";

const useLogin = () => {
  const navigate = useNavigate()
  const {username, password,setUsername, setPassword, setId} = useLoginStore((state) => state);
  const onChangeUsername = (e:ChangeEvent<HTMLInputElement>) => setUsername(e.target.value);
  const onChangePassword = (e:ChangeEvent<HTMLInputElement>) => setPassword(e.target.value);
  
  const generateUrl = () => {
    switch(username){
      case 'Shofi.Majoin':
      case 'Sintya.majoin':
      case 'User1.Majoin':
        return '/incoming'
      case 'Lia.Majoin':
        return'/barang'
      case 'Afin.Majoin':
        return'/barang'
      case 'Gaby.Majoin':
        return '/outgoing'
      case 'User2.Majoin':
        return '/outgoing'
      default:
        return '/barang'
    }
  }

  const loginQuery = useMutation(async() => loginService({username, password}),{
    onSuccess(data) {
      if(data.length > 0){
        setId(data[0]?.id);
        message.success('Login Success');
        navigate(generateUrl(),{replace:true})
      }else{
        console.log('wrong password')
        message.error('Please check your username and password');
      }
    },
    onError(error:any) {
      message.error(error);
    },
  })
  
  const onSubmit = async() => {
    if(username && password){
      loginQuery.mutate()
    }
  }


  return{
    onChangeUsername,
    onChangePassword,
    onSubmit
  }
}

export default useLogin;