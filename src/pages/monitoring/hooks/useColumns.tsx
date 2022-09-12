import type { ColumnsType } from 'antd/es/table';
import moment from 'moment';
import {DataType} from '../store';
import userLoginStore from '@/pages/login/store'

function useColumns() {
  const {username} = userLoginStore((state)=>(state))
  const columns: ColumnsType<DataType> = [
    {
      title: 'ID Barang',
      dataIndex: 'nomor_material',
      key: 'nomor_material',
    },
    {
      title: 'Nama Barang',
      dataIndex: 'nama_material',
      key: 'nama_material',
    },
    {
      title: 'Qty',
      dataIndex: 'qty',
      key: 'qty',
    },
    {
      title: 'Posisi',
      dataIndex: 'posisi',
      key: 'posisi',
    },
    {
      title: 'Date',
      dataIndex:'date',
      key:'date',
      render:(_, record) => {
        const formatDate = moment(new Date(record.date)).format("YYYY-MM-DD")
        return (<div>{formatDate}</div>)
    
      }
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: 'Keterangan',
      dataIndex: 'note',
      key: 'note',
    },
    {
      title: 'User',
      dataIndex: 'id',
      key: 'id',
      fixed: 'right',
      width: 150,
      render:(_,record) => (<div>{username}</div>)
    },
  ];

  return {
    columns
  }
}

export default useColumns