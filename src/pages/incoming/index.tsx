import { Input, Form,Button,DatePicker, Select} from 'antd'
import {useState, useEffect} from 'react'
import type { DatePickerProps, RangePickerProps } from 'antd/es/date-picker';
import moment from 'moment'
import useIncoming from './hooks/useIncoming';

const {Option} = Select
const { TextArea } = Input;

function index() {
  const {   
    form,
    searchInput,
    searchInputSecond,
    options,
    onCheck,
    onChangeSearchInput,
    onSelectInput
  } = useIncoming();

  return (
    <div className="bg-white p-5 md:w-[600px]">
      <h1 className="mb-4 text-xl">Form Incoming</h1>
      <Form 
        form={form}
        layout="vertical"
        name="dynamic_rule"
        initialValues={{ date: moment(new Date()) }}
        >

        <Form.Item
          name="date"
          label="Tanggal Incoming"
          
        >
          <DatePicker 
            value={moment(new Date())}
            showTime 
            inputReadOnly
            disabled
            className='w-full'
          />
        </Form.Item>

        <Form.Item name="id_barang" label="Cari ID barang">
          <Select
            searchValue={searchInput}
            onSearch={(e) => onChangeSearchInput(e,'id')}
            onChange={onSelectInput}
            className='w-full'
            showSearch
            placeholder="Search to Select"
            optionFilterProp="children"
          >
            {options?.map((o)=>(<Option key={o.id} value={JSON.stringify(o)}>{o.nomor_material}</Option>))}
          </Select>
        </Form.Item>

        <Form.Item name="id_barang" label="Cari nama barang">
          <Select
            searchValue={searchInputSecond}
            onSearch={(e) => onChangeSearchInput(e,'name')}
            onChange={onSelectInput}
            className='w-full'
            showSearch
            placeholder="Search to Select"
            optionFilterProp="children"
          >
            {options?.map((o)=>(<Option key={o.id} value={JSON.stringify(o)}>{o.nama_material}</Option>))}
          </Select>
        </Form.Item>

        <Form.Item
          name="qty"
          label="Quantity"
          rules={[
            {
              required: true,
              message: 'Please input your quantity',
            },
          ]}
        >
          <Input type='number' placeholder="quantity..." />
        </Form.Item>


        <Form.Item
          name="posisi"
          label="Posisi"
          rules={[
            {
              required: true,
              message: 'Please input your posisi',
            },
          ]}
        >
          <Input placeholder="posisi barang..." />
        </Form.Item>

        <Form.Item
          name="note"
          label="Keterangan"
          rules={[
            {
              required: true,
              message: 'Please input your keterangan',
            },
          ]}
        >
          <TextArea 
            rows={4}
            placeholder="keterangan..." />
        </Form.Item>

        <Form.Item>
          <Button
            className='text-black'
            type="primary" 
            block 
            onClick={onCheck}
          >
            Submit
          </Button>
        </Form.Item>

      </Form>
    </div>
  )
}

export default index