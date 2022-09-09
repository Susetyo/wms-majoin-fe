import type { ColumnsType } from 'antd/es/table';
import moment from 'moment';

interface DataType {
  key: string;
  nomor_material: string;
  nama_material: number;
  qty: string;
  date:string;
  posisi:string;
  type:string;
}


function useColumns() {
  const columns: ColumnsType<DataType> = [
    {
      title: 'Nomor',
      dataIndex: 'nomor_material',
      key: 'nomor_material',
    },
    {
      title: 'Nama',
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
  ];

  return {
    columns
  }
}

export default useColumns