import {useQuery, useQueryClient} from '@tanstack/react-query'
import barangService from '../services/barang.service'
import {message} from 'antd';
import React, { useEffect, useState } from 'react';
import useDebounce from '@/commons/utils/useDebounce';
import useBarangStore from '../store';

interface IPagination{
  page:number,
  pageSize:number
}

const useBarang = () => {
  const LIMIT = 5;
  const {filter, setFilter, setDataTable, modal, setModal} = useBarangStore((state)=> state)
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(5);
  const [searchInput, setSearchInput] = useState<string>('');
  const [offset, setOffset] = useState<number>(0);
  const debounce = useDebounce<string>(filter.keyword, 500);

  const queryClient = useQueryClient();

  const queryBarang = useQuery(
    ['queryBarang'],
    () => barangService({
      url:`${import.meta.env.VITE_REST_URL}/api/barang?page=${page}&keyword=${searchInput}&limit=${LIMIT}&offset=${offset}`
    }),
    {
      onError:(err:any) => {
        message.error(err)
      },
      onSuccess:(res:any) => {
        setDataTable(res)
      }
    }
  )

  useEffect(()=>{
    queryClient.removeQueries(['queryBarang'], { exact: true })
    queryClient.cancelQueries(['queryBarang'], { exact: true })
    queryBarang.refetch()
  },[debounce,page, modal])


  const onChangePagination = ({page,pageSize}:IPagination) => {
    setPage(page)
    setPageSize(pageSize)
    setOffset((page-1)*LIMIT)
  }

  const onChangeSearchInput = (e:React.ChangeEvent<HTMLInputElement>):void => {
    setSearchInput(e.target.value)
    setFilter({...filter,keyword:e.target.value})
  };

  const onClickAddBarang = () => setModal({...modal,name:"modalAddBarang"})

  return{
    queryBarang,
    onChangePagination,
    page,
    pageSize,
    onChangeSearchInput,
    onClickAddBarang
  } 
  
}

export default useBarang