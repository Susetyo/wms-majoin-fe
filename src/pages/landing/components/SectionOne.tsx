import React, {useContext, useRef} from 'react';
import { ScrollContext } from '../utils/ScrollObserver';
import s from '../styles/sectionOne.module.css'

const opacityForEachBlock = (sectionProgress: number, blockNo:number) => {
  const progress = sectionProgress - blockNo
  if(progress >=0 && progress < 1) return 1
  return 0.2
}

const SectionOne:React.FC = () => {
  const {scrollY}= useContext(ScrollContext)
  const refContainer = useRef<HTMLDivElement>(null)

  const numOfPages = 3
  let progress = 0

  const {current:elContainer} = refContainer
  if(elContainer){
    const {clientHeight,offsetTop} = elContainer;
    const screenH = window.innerHeight
    const halfH = screenH / 2
    const percentY = Math.min(clientHeight + halfH, Math.max(-screenH,scrollY - offsetTop) + halfH)/clientHeight;
    progress = Math.min(numOfPages - 0.5, Math.max(0.5, percentY*numOfPages))
  }


  return(
    <div className='bg-black text-white' ref={refContainer}>
      <div className='min-h-screen max-w-5xl mx-auto px-10 lg:px-2 py-24 md:py-28 lg:py-36 flex flex-col justify-center items-center text-4xl md:text-6xl lg:text-7xl tracking-tight font-semibold'>
        <div className="leading-[1.15]">
          <div 
            className={s.sectionOneText} 
            style={{
              opacity:opacityForEachBlock(progress, 0)
            }}>PT. Majoin Coness Indonesia hadir dengan konsep.</div>
          <span 
            className={`${s.sectionOneText} inline-block`}
            style={{
              opacity:opacityForEachBlock(progress, 1)
            }}
          >
            <strong>TOTAL SOLUTION</strong> yang merupakan jawaban dari kebutuhan akan kualitas 
            PRE ROLLED CONES terhadap pelanggan.
          </span>
          <span 
            className={`${s.sectionOneText} inline-block`}
            style={{
              opacity:opacityForEachBlock(progress, 2)
            }}
          >
            Kecepatan, kualitas layanan, respon yang segera, serta kendali mutu merupakan modal 
            utama dalam memenuhi kebutuhan pecinta cones.
          </span>
        </div>
      </div>
    </div>
  )
}

export default SectionOne;