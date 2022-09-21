import {useState, useCallback, useRef, useContext, useEffect} from 'react';
import Logo from '@/assets/logo.png'
import {DownOutlined} from '@ant-design/icons'
import {ScrollContext} from '../utils/ScrollObserver';
import s from '../styles/header.module.css'

const Header = () =>  {
  const [imageLoaded, setImageLoaded] = useState(false)
  const refContainer = useRef<HTMLDivElement>(null);
  const {scrollY} = useContext(ScrollContext);

  let progress = 0;

  const {current:elContainer} = refContainer;

  if(elContainer){
    progress= Math.min(1, scrollY/elContainer.clientHeight);
  }

  const handleImageLoaded = useCallback(() => {
    setImageLoaded(true)
  },[])

  useEffect(()=> {
    if(progress > 0.8){
      setImageLoaded(false)
    }else{
      setImageLoaded(true)
    }
  },[progress])
  
  return (
    <div
      ref={refContainer} 
      style={{
        transform:`translateY(-${progress*20})vh`
      }}
      className={`${s.headerContainer} sticky flex flex-col items-center justify-center min-h-screen bg-fixed bg-center bg-cover custom-img`}>
      <div className={`transition-opacity duration-1000 absolute top-10 flex justify-center w-full ${imageLoaded ? 'opacity-100' : 'opacity-0' }`}>
        <img onLoad={handleImageLoaded} height={100} width={100} className='' src={Logo} alt="logo-majoin" />
      </div>
      <div className='title-section-one'>
        <h1 className='text-center text-3xl md:text-6xl lg:text-7xl text-white tracking-tight'>PT. MAJOIN CONNES INDONESIA</h1>
        <h2 className='text-center text-2xl md:text-3xl lg:text-4xl text-white tracking-tight'>“Working together, achieve the goal together”</h2>
      </div>
      <DownOutlined 
        className={`
          absolute bottom-10 flex 
          justify-center text-2xl 
          md:text-5xl text-white
          transition-all
          duration-1000
          ${imageLoaded ? 'opacity-100' : 'opacity-0 -translate-y-10'}
        `}
      />
    </div>
  )
}

export default Header