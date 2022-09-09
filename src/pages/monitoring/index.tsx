import useMonitoring from "./hooks/useMonitoring"
import useColumns from "./hooks/useColumns"
import {Table, Input, Button} from 'antd'
import {SearchOutlined, FilterOutlined } from '@ant-design/icons';
import FilterSide from './components/FilterSide'
import useMonitoringStore from "./store";

function index() {
  const {
    onChangePagination,     
    page,
    form,
    onChangeSearchInput,
    queryMonitoring,
    open,
    onShowDrawer,
    onClose,
    onChangeRangePicker,
    onSelectType,
    onSubmitFilterSide
  } = useMonitoring()

  const {dataTable} = useMonitoringStore((state)=>state)
  const {columns} = useColumns()

  return (
    <div className="bg-white p-5">
      <h1 className="mb-2 text-xl">MONITORING</h1>
      <div className="w-full flex gap-4">
        <Input 
          size="large"
          placeholder="search"
          prefix={<SearchOutlined />}
          className="w-[500px] mb-5"
          onChange={onChangeSearchInput}
        />
        <Button
          className="flex items-center"
          size="large"
          icon={<FilterOutlined />}
          onClick={onShowDrawer}
        >
          Search
        </Button>
      </div>
      <Table 
        columns={columns} 
        dataSource={dataTable.rows}
        loading={queryMonitoring.isLoading}
        pagination={{
          current:page, 
          pageSize:5,
          total:dataTable.totalRows,
          onChange:(page,pageSize) => {onChangePagination({page,pageSize})}
        }} />
        <FilterSide
          form={form}
          title="Filter"
          show={open}
          onChangeRangePicker={onChangeRangePicker}
          onSelect={onSelectType}
          onClose={onClose}
          onSubmitFilterSide={onSubmitFilterSide}
        />
    </div>
  )
}

export default index