import {Drawer, DatePicker, Form,Select, Button} from 'antd';
import useMonitoringStore from '../store';
import {useMemo} from 'react'

interface Props{
  form?:any;
  show:boolean;
  title:string;
  onClose:()=>void;
  onChangeRangePicker:(e:any) => void;
  onSelect:(e:any) => void;
  onSubmitFilterSide:() => void;
}

const {RangePicker} = DatePicker;
const { Option } = Select;

export default function FilterSide({
  form,
  show,
  title,
  onClose,
  onChangeRangePicker, 
  onSelect,
  onSubmitFilterSide
}:Props) {
  const {filter, setFilter} = useMonitoringStore((state)=>state);

  const checkFilter = () => {
    return filter?.date?.length === 0 && !filter.type
  }

  const isDisabled = useMemo(() => checkFilter(),[filter.date,filter.type]);

  const onReset = () => {
    form.resetFields()
    setFilter({...filter,date:[],type:''})
  } 

  return (
    <Drawer
      title={title} 
      placement="right" 
      onClose={onClose} 
      open={show}
      footerStyle={{
        display:"flex",
        alignItems:'center',
        justifyContent:'flex-end',
        gap:14
      }}
      footer={
        <>
          <Form.Item className='m-0'>
            <Button size='large' onClick={onReset}>
              Reset
            </Button>
          </Form.Item>
          <Form.Item className='m-0'>
            <Button
              disabled={isDisabled}
              size='large' 
              onClick={onSubmitFilterSide}>
              Terapkan
            </Button>
          </Form.Item>
        </>
      }>
      <Form
        layout='vertical'
        form={form}
      >
        <Form.Item 
          label="Date"
          name="date"
        >
          <RangePicker size='large' className='w-full' onChange={onChangeRangePicker}/>
        </Form.Item>
        <Form.Item 
          label="Tipe"
          name="type"
        >
          <Select size='large' onChange={onSelect} placeholder="Select type">
            <Option key="1" value="incoming">Incoming</Option>
            <Option key="2" value="outgoing">Outgoing</Option>
          </Select>
        </Form.Item>
      </Form>
    </Drawer>
  )
}
