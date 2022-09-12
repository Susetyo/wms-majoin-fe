import useBarang from "./hooks/useBarang"
import useColumns from "./hooks/useColumns"
import {Table, Input, Button, PageHeader} from 'antd'
import {SearchOutlined} from '@ant-design/icons';
import useBarangStore from "./store";
import ModalAddBarang from "./components/ModalAddBarang";

function index() {

  const {
    onChangePagination,     
    page,
    onChangeSearchInput,queryBarang,
    onClickAddBarang
  } = useBarang()

  const {dataTable, modal} = useBarangStore((state)=>state)
    
  const {columns} = useColumns()

  return (
    <div className="bg-white p-5">
      <h1 className="mb-2 text-xl">BARANG</h1>
      <div className="flex justify-between gap-4">
        <Input 
          size="large"
          placeholder="search"
          prefix={<SearchOutlined />}
          className="w-[500px] mb-5"
          onChange={onChangeSearchInput}
        />
        <Button
          size="large"
          onClick={onClickAddBarang}
        >
          Tambah Barang
        </Button>
      </div>
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
      <ModalAddBarang 
        isOpen={modal?.name === 'modalAddBarang'}
      />
    </div>
  )
}

export default index