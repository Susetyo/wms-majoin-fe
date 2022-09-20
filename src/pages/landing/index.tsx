import React from 'react'
import Header from './components/Header'
import SectionOne from './components/SectionOne'
import {Layout} from 'antd'
import ScrollObserver from './utils/ScrollObserver'
import {DownOutlined} from '@ant-design/icons'
import Logo from '@/assets/logo.png'
import './style.css'

const {Content} = Layout

function index() {
  return (
    <ScrollObserver>
      <Layout>
        <Header />
        <SectionOne />
      </Layout>
    </ScrollObserver>
  )
}

export default index