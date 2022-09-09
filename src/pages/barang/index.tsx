import useBarang from "./hooks/useBarang"
import useColumns from "./hooks/useColumns"
import {Table, Input, Breadcrumb} from 'antd'
import {SearchOutlined} from '@ant-design/icons';
import useBarangStore from "./store";
import LayoutBased from "@/commons/components/Layout";

function index() {

  const {
    onChangePagination,     
    page,
    onChangeSearchInput,queryBarang
  } = useBarang()

  const {dataTable} = useBarangStore((state)=>state)
    
  const {columns} = useColumns()

  return (
    <div className="bg-white p-5">
      <h1 className="mb-2 text-xl">BARANG</h1>
      <Input 
        size="large"
        placeholder="search"
        prefix={<SearchOutlined />}
        className="w-[500px] mb-5"
        onChange={onChangeSearchInput}
      />
      <Table 
        columns={columns} 
        dataSource={dataTable.rows}
        loading={queryBarang.isLoading}
        pagination={{
          current:page, 
          pageSize:5,
          total:dataTable.totalRows,
          onChange:(page,pageSize) => {onChangePagination({page,pageSize})}
        }} />
    </div>
  )
}

export default index