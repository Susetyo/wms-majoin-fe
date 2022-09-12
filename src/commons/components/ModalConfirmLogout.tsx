import {Modal, Button } from 'antd';
import useModalStore, {defaultModal} from '../store/ModalStore';
import useLoginStore from '@/pages/login/store';

interface IModal{
  isOpen:boolean
}

const ModalConfirmLogout = ({isOpen}:IModal) => {
  const {setModal} = useModalStore((state)=>state);
  const loginStore = useLoginStore;
  const {setUsername,setPassword} = loginStore((state)=>state)

  return(
    <Modal
      open={isOpen}
      className="text-black"
      title="Logout"
      footer={null}
    >
      <div className='text-xl'>Apakah anda yakin untuk keluar?</div>
      <div className='flex mt-4 justify-end gap-4'>
        <Button
          onClick={()=> setModal(defaultModal)}
        >
          Cancel
        </Button>
        <Button 
          onClick={() => {
            setUsername('');
            setPassword('')
            loginStore.persist.clearStorage();
            setModal(defaultModal)
          }}
        >
          Ok
        </Button>
      </div>
    </Modal>    
  )
}

export default ModalConfirmLogout;