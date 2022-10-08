import {Modal, Form, Input, Button, message} from 'antd';
import useBarangStore, {defaultModal} from '../store';
import {addBarangService} from '../services/barang.service'
import {useMutation} from '@tanstack/react-query';
import {IPostData} from '@/commons/utils/postData';

interface IModal{
  isOpen:boolean
}

const {Item, useForm} = Form

const ModalAddBarang = ({isOpen}:IModal) => {
  const {modal, setModal} = useBarangStore((state)=>state);
  const [form] = useForm();

  const queryAddBarang = useMutation(({url,data}:IPostData)=> addBarangService({url,data}),{
    onSuccess:(res)=>{
      form.resetFields()
      setModal(defaultModal);
      message.success(res?.message);
    },
    onError:(err:any)=>{
      setModal(defaultModal);
      message.error(err)
    }
  })

  const onSubmit = async() => {
    try{
      setModal({...modal,isBtnLoading:true})
      const values = await form.getFieldsValue();
      console.log(values)
      const {nama_material, nomor_material} = values;
      queryAddBarang.mutate({
        url:`${import.meta.env.VITE_REST_URL}/api/barang`,
        data:{
          nama_material,
          nomor_material,
          qty:0
        }
      })
    }catch(e:any){
      message.error(e)
    }
  }

  return(
    <Modal
      open={isOpen}
      title="Tambah Barang"
      onCancel={()=> setModal(defaultModal)}
      okText="Submit"
      footer={null}
    >
      <Form
        form={form}
        layout='vertical'
      >
        <Item
          label='Nomor Barang'
          name='nomor_material'
        >
          <Input 
            placeholder='input nomor barang...' /> 
        </Item>
        <Item
          label='Nama Barang'
          name="nama_material"
        >
          <Input
            placeholder='input nama barang...' />
        </Item>

        <Item>
          <Button
            className='text-black'
            type="primary" 
            block 
            onClick={onSubmit}
            loading={modal.isBtnLoading}
          >
            Submit
          </Button>
        </Item>
      </Form>
      
    </Modal>    
  )
}

export default ModalAddBarang;