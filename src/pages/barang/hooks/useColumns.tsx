import type { ColumnsType } from 'antd/es/table';

interface DataType {
  key: string;
  nomor_material: string;
  nama_material: number;
  qty: string;
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
  ];

  return {
    columns
  }
}

export default useColumns