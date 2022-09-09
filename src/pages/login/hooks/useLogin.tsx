import { ChangeEvent } from "react";
import useLoginStore from "../store";
import { useMutation } from "@tanstack/react-query";
import loginService from "../services/login.service";
import {message} from 'antd';
import {useNavigate} from "react-router-dom";

const useLogin = () => {
  const navigate = useNavigate()
  const {username, password,setUsername, setPassword} = useLoginStore((state) => state);
  const onChangeUsername = (e:ChangeEvent<HTMLInputElement>) => setUsername(e.target.value);
  const onChangePassword = (e:ChangeEvent<HTMLInputElement>) => setPassword(e.target.value);
  
  const loginQuery = useMutation(async() => loginService({username, password}),{
    onSuccess(data) {
      console.log(data)
      if(data.length > 0){
        message.success('Login Success');
        navigate('/barang',{replace:true})
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