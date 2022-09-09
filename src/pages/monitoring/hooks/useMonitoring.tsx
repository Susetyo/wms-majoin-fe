import {useQuery, useQueryClient} from '@tanstack/react-query'
import barangService from '../services/barang.service'
import {message} from 'antd';
import React, { useEffect, useState } from 'react';
import useDebounce from '@/commons/utils/useDebounce';
import useMonitoringStore from '../store';
import {Form} from 'antd';
import moment from 'moment';

interface IPagination{
  page:number,
  pageSize:number
}

const useMonitoring = () => {
  const [form] = Form.useForm();
  const LIMIT = 5;
  const {filter, setFilter, setDataTable} = useMonitoringStore((state)=> state)
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(5);
  const [searchInput, setSearchInput] = useState<string>('');
  const [offset, setOffset] = useState<number>(0);
  const [open, setOpen] = useState(false);
  const debounce = useDebounce<string>(filter.keyword, 500);
  const queryClient = useQueryClient();

  const queryMonitoring = useQuery(
    ['queryMonitoring'],
    () => {
      const startDate = filter.date?.length > 0 ? moment(filter.date[0]).format('YYYY-MM-DD') : '';
      const endDate = filter.date?.length > 0 ? moment(filter.date[1]).format('YYYY-MM-DD') : '';
      const queryUrl = `keyword=${searchInput}&startDate=${startDate}&endDate=${endDate}&type=${filter.type}&limit=${LIMIT}&offset=${offset}`

      return barangService({
        url:`http://localhost:8000/api/transaction?${queryUrl}`
      })
    },
    {
      onError:(err:any) => {
        message.error(err)
      },
      onSuccess:(res:any) => {

        const injectKey = res.rows.map((r:any,index:number) => ({...r,key:`${index}`}))
        setDataTable({...res,rows:injectKey})
      }
    }
  )

  useEffect(()=>{
    queryClient.removeQueries(['queryMonitoring'], { exact: true })
    queryClient.cancelQueries(['queryMonitoring'], { exact: true })
    queryMonitoring.refetch()
  },[debounce,page, filter])


  const onChangePagination = ({page,pageSize}:IPagination) => {
    setPage(page)
    setPageSize(pageSize)
    setOffset((page-1)*LIMIT)
  }

  const onChangeSearchInput = (e:React.ChangeEvent<HTMLInputElement>):void => {
    setSearchInput(e.target.value)
    setFilter({...filter,keyword:e.target.value})
  };

  const onShowDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    form.resetFields();
    setOpen(false);
  };

  const onChangeRangePicker = (e:any) => {
    console.log(e,"range-picker")
    setFilter({...filter,date:e})
  }

  const onSelectType = (e:any) => {
    console.log(e,"select")
    setFilter({...filter,type:e})
  }

  const onSubmitFilterSide = async() => {
    const values = await form.validateFields();
    setOpen(false);
    setFilter({...filter,date:values?.date,type:values?.type})
  }

  return{
    queryMonitoring,
    page,
    form,
    pageSize,
    open,
    onChangePagination,
    onChangeSearchInput,
    onShowDrawer,
    onClose,
    onChangeRangePicker,
    onSelectType,
    onSubmitFilterSide
  } 
  
}

export default useMonitoring