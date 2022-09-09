import {Card, Input, Button} from 'antd'
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import useLoginStore from '../store';
import useLogin from '../hooks/useLogin';

const FormLogin = () => {
  const {username, password} = useLoginStore((state) => state);
  const {onChangeUsername, onChangePassword, onSubmit} = useLogin()
  return(
    <div className='w-[50%] md:w-[50%] lg:w-[30%]'>
      <Card 
      title={<h2 className='text-center'> Login </h2>} 
      bordered
      className="text-white">
        <div>Username:</div>
        <Input 
          value={username}
          onChange={onChangeUsername}
          className='mt-2'
          size="large"
          placeholder="Username..."  />
        <div className='mt-4'>Password:</div>
        <Input.Password
          value={password}
          onChange={onChangePassword}
          className='mt-2'
          size="large"
          placeholder="Password"
          iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
        />
        <Button 
          size="large" 
          className='mt-4'
          onClick={onSubmit}
          block>
          Login
        </Button>
      </Card>
    </div>
  )
}

export default FormLogin;