import {useQuery, useQueryClient, useMutation} from '@tanstack/react-query'
import barangService from '@/pages/barang/services/barang.service'
import {message} from 'antd';
import { useState } from 'react';
import useDebounce from '@/commons/utils/useDebounce';
import useBarangStore from '../store';
import useLoginStore from '@/pages/login/store';
import {Form} from 'antd'
import incomingService,{IData} from '../services/incoming.service';
import moment from 'moment';


const useIncoming = () => {
  const [form] = Form.useForm();
  const {id} = useLoginStore((state)=> state);
  const {filter, setFilter, options, setOptions} = useBarangStore((state)=> state)
  const [searchInput, setSearchInput] = useState<string>('');
  const [searchInputSecond, setSearchInputSecond] = useState<string>('')
  const debounce = useDebounce<string>(filter.keyword, 200);

  const queryPostIncoming = useMutation((data:IData) => incomingService({
    url:'http://localhost:8000/api/incoming',
    data,
  }),{  
    onSuccess:(res)=>{
      form.resetFields();
      message.success(res?.message)
    },
    onError:(err:any)=>{
      message.error(err?.message)
    }
  })

  useQuery(
    ['querySearchBarang',debounce],
    () => barangService({
      url:`http://localhost:8000/api/barang/search?nomorMaterial=${filter.keyword}&namaMaterial=${filter.keyword}`
    }),
    {
      onError:(err:any) => {
        message.error(err)
      },
      onSuccess:(res:any) => {
        setOptions(res?.rows)
      }
    }
  )

  const onCheck = async () => {
    try {
      const values = await form.validateFields();
      const params = {
        nomor_material: JSON.parse(values.id_barang).nomor_material,
        qty:values.qty,
        posisi: values.posisi,
        date:moment(values.date).format('YYYY-MM-DD'),
        note:values.note,
        user_id:id
      }

      queryPostIncoming.mutate(params);
    } catch (errorInfo) {
      console.log('Failed:', errorInfo);
    }
  };

  const onChangeSearchInput = (e:string,type:string):void => {
    if(type === 'id'){
      setSearchInput(e)
    }else{
      setSearchInputSecond(e)
    }

    if(e) setFilter({...filter,keyword:e})
  };

  const onSelectInput = (e:string):void =>{
    setSearchInput(JSON.parse(e).nomor_material)
    setSearchInputSecond(JSON.parse(e).nama_material)
    setFilter({...filter,keyword:JSON.parse(e).nama_material})
  }

  return{
    form,
    searchInput,
    searchInputSecond,
    options,
    setOptions,
    onCheck,
    onChangeSearchInput,
    onSelectInput
  } 
}

export default useIncoming