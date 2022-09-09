import {useQuery, useQueryClient, useMutation} from '@tanstack/react-query'
import barangService from '@/pages/barang/services/barang.service'
import {message} from 'antd';
import React, { useEffect, useState } from 'react';
import useDebounce from '@/commons/utils/useDebounce';
import useBarangStore from '../store';
import {Form} from 'antd'
import outgoingService,{IData} from '../services/outgoing.service';
import moment from 'moment';


const useOutgoing = () => {
  const [form] = Form.useForm();
  const {filter, setFilter, options, setOptions} = useBarangStore((state)=> state)
  const [searchInput, setSearchInput] = useState<string>('');
  const debounce = useDebounce<string>(filter.keyword, 200);
  const queryClient = useQueryClient()

  const queryPostOutoging = useMutation((data:IData) => outgoingService({
    url:'http://localhost:8000/api/outgoing',
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
    ['querySearchBarang'],
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

  useEffect(()=>{
    queryClient.removeQueries(['querySearchBarang'], { exact: true })
    queryClient.cancelQueries(['querySearchBarang'], { exact: true })
    queryClient.refetchQueries(['querySearchBarang'])
  },[debounce])

  const onCheck = async () => {
    try {
      const values = await form.validateFields();
      const params = {
        nomor_material: values.id_barang,
        qty:values.qty,
        posisi: values.posisi,
        date:moment(values.date).format('YYYY-MM-DD HH:mm')
      }

      queryPostOutoging.mutate(params);
      console.log('Success:', values);
    } catch (errorInfo) {
      console.log('Failed:', errorInfo);
    }
  };


  const onChangeSearchInput = (e:string):void => {
    setSearchInput(e)
    setFilter({...filter,keyword:e})
  };

  return{
    form,
    onCheck,
    onChangeSearchInput,
    searchInput,
    options,
    setOptions
  } 
}

export default useOutgoing