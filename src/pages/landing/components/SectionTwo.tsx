import React from 'react';
import {TileWrapper, TileBackground, TileContent, Tile} from './Tile'
import { WorkBackground, WorkContainer, WorkLeft, WorkRight } from './Work';
import WhiteProduct from '@/assets/white_product.jpeg';
import BlackProduct from '@/assets/black_product.jpeg';
import BrownProduct from '@/assets/brown_product.jpeg';

const SectionTwo = () => (
  <TileWrapper numOfPages={3}>
    <TileBackground>
      <WorkBackground />
    </TileBackground>
    <TileContent>
      <Tile page={0} renderContent={({progress})=>(
        <WorkContainer>
          <WorkLeft progress={progress}>
            <div>Zetla is made</div>
            <div className='text-4xl md:text-5xl font-semibold tracking-tight'>
              of very thin hemp paper
            </div>
          </WorkLeft>
          <WorkRight progress={progress}>
            <div className='h-[300px] lg:h-[600px] w-[800] rounded-lg'>
              <img src={WhiteProduct} className="w-full h-full object-cover rounded-lg" alt="rolling-papper" />
            </div>
          </WorkRight>
        </WorkContainer>
      )}></Tile>
    </TileContent>
    <TileContent>
      <Tile page={1} renderContent={({progress})=>(
        <WorkContainer>
          <WorkLeft progress={progress}>
            <div>Zelta glue</div>
            <div className='text-4xl md:text-5xl font-semibold tracking-tight'>
              is only 0.5 mm wide.
            </div>
          </WorkLeft>
          <WorkRight progress={progress}>
            <div className='h-[300px] lg:h-[600px] w-[800] rounded-lg'>
              <img src={BrownProduct} className="w-full h-full object-cover rounded-lg" alt="rolling-papper" />
            </div>          
          </WorkRight>
        </WorkContainer>
      )}></Tile>
    </TileContent>
    <TileContent>
      <Tile page={2} renderContent={({progress})=>(
        <WorkContainer>
        <WorkLeft progress={progress}>
          <div>Zelta cone sleeve</div>
          <div className='text-4xl md:text-5xl font-semibold tracking-tight'>
            is almost tasteless and burns evenly
          </div>
        </WorkLeft>
        <WorkRight progress={progress}>
          <div className='h-[300px] lg:h-[600px] w-[800] rounded-lg'>
            <img src={BlackProduct} className="w-full h-full object-cover rounded-lg" alt="rolling-papper" />
          </div>             
        </WorkRight>
      </WorkContainer>
      )}></Tile>
    </TileContent>
  </TileWrapper>
)

export default SectionTwo