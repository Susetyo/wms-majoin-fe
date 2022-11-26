import Header from './components/Header'
import SectionOne from './components/SectionOne'
import SectionTwo from './components/SectionTwo'
import SectionThree from './components/SectionThree'
import {Layout} from 'antd'
import ScrollObserver from './utils/ScrollObserver'

const {Content} = Layout

function index() {
  return (
    <ScrollObserver>
      <Layout>
        <Header />
        <SectionOne />
        <SectionTwo />
        <SectionThree />
      </Layout>
    </ScrollObserver>
  )
}

export default index