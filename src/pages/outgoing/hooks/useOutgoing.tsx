import {useQuery, useMutation} from '@tanstack/react-query'
import barangService from '@/pages/barang/services/barang.service'
import {message} from 'antd';
import { useState } from 'react';
import useDebounce from '@/commons/utils/useDebounce';
import useBarangStore from '../store';
import useLoginStore from '@/pages/login/store';
import {Form} from 'antd'
import outgoingService,{IData} from '../services/outgoing.service';
import moment from 'moment';
import useGeneratePdf from '@/commons/utils/useGeneratePdf';
import jsPDF from 'jspdf';


const useOutgoing = () => {
  const [form] = Form.useForm();
  const {id} = useLoginStore((state)=> state);
  const {filter, setFilter, options, setOptions, posisiOptions, setPosisiOptions, selectedPosisi, setSelectedPosisi} = useBarangStore((state)=> state)
  const [searchInput, setSearchInput] = useState<string>('');
  const [searchInputSecond, setSearchInputSecond] = useState<string>('');
  const debounce = useDebounce<string>(filter.keyword, 200);

  const generatePdf = (dataTable:any) => {
    const doc = new jsPDF()
    const pageWidth = doc.internal.pageSize.width || doc.internal.pageSize.getWidth();
    
    const tableColumn = ["Tanggal", "ID Barang", "Nama Barang", "Qty", "Posisi","Keterangan"];
    
    const tableRows:any = [[
      moment(dataTable.date).format('YYYY-MM-DD'),
      dataTable.nomor_material,
      dataTable.nama_barang,
      dataTable.qty,
      dataTable.posisi,
      dataTable.note
    ]]

    const additionalOptions = {
      startY: 15,
      theme: "grid",
      styles: {
        font: "times",
        halign: "center",
        cellPadding: 3.5,
        lineWidth: 0.5,
        lineColor: [0, 0, 0],
        textColor: [0, 0, 0]
      },
      headStyles: {
        textColor: [0, 0, 0],
        fontStyle: "normal",
        lineWidth: 0.5,
        lineColor: [0, 0, 0],
        fillColor: [166, 204, 247]
      },
      alternateRowStyles: {
        fillColor: [212, 212, 212],
        textColor: [0, 0, 0],
        lineWidth: 0.5,
        lineColor: [0, 0, 0]
      },
      tableLineColor: [0, 0, 0]
    }

    const title ={
      text: 'Surat Jalan',
      x:pageWidth / 2,
      y:10,
      options:{
        align:'center'
      }
    }

    const titleSave =   `surat_jalan_${moment(new Date()).format('YYYYMMDDhhmm')}.pdf`;

    useGeneratePdf({tableColumn,tableRows,additionalOptions,title, titleSave});
  }

  const queryPostOutoging = useMutation((data:IData) => outgoingService({
    url:`${import.meta.env.VITE_REST_URL}/api/outgoing`,
    data,
  }),{  
    onSuccess:(res)=>{
      form.resetFields();
      generatePdf(res?.data)
      message.success(res?.message)
    },
    onError:(err:any)=>{
      message.error(err?.message)
    }
  })

  useQuery(
    ['querySearchBarang',debounce],
    () => barangService({
      url:`${import.meta.env.VITE_REST_URL}/api/barang/search?nomorMaterial=${filter.keyword}&namaMaterial=${filter.keyword}&type=outgoing`
    }),
    {
      onError:(err:any) => {
        message.error(err)
      },
      onSuccess:(res:any) => {
        setPosisiOptions(res?.incomingLocation)
        setOptions(res?.rows)
      }
    }
  )

  const onCheck = async () => {
    try {
      const values = await form.validateFields();
      const params = {
        nomor_material: JSON.parse(values.id_barang).nomor_material,
        nama_barang: JSON.parse(values.id_barang).nama_material,
        qty:values.qty,
        posisi: values.posisi,
        date:moment(values.date).format('YYYY-MM-DD'),
        note:values.note,
        user_id:id
      }

      queryPostOutoging.mutate(params);
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

  const onSelectInputPosisi = (e:string):void => {
    setSelectedPosisi(e)
  }

  return{
    form,
    searchInput,
    searchInputSecond,
    options,
    posisiOptions,
    selectedPosisi, 
    setSelectedPosisi,
    onCheck,
    onChangeSearchInput,
    onSelectInput,
    onSelectInputPosisi
  } 
}

export default useOutgoing