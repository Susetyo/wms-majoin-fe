import Header from './components/Header'
import SectionOne from './components/SectionOne'
import {Layout} from 'antd'
import ScrollObserver from './utils/ScrollObserver'

const {Content} = Layout

function index() {
  return (
    <ScrollObserver>
      <Layout>
        <Header />
        <SectionOne />
        <SectionOne />
        {/* <SectionTwo /> */}
      </Layout>
    </ScrollObserver>
  )
}

export default index