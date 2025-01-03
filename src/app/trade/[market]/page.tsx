"use client"

import React from 'react'
import {useParams} from 'next/navigation'
import MarketBar from '@/components/MarketBar'
import TradeView from '@/components/TradeView'
import SwapUI from '@/components/SwapUI'

const page = () => {
    const {market} = useParams();

  return (
    <div className="flex flex-row ">
        <div className="flex flex-col flex-1 ">
            <div>
                <MarketBar market={market as string}/>
            </div>
            
            <div className="flex flex-row  h-[620px] border-y border-slate-800">
                <div className="flex flex-col flex-1 ">
                    <TradeView market={market as string}/>
                </div>
                <div className="w-[1px] flex-col border-slate-800 border-l"></div>
                <div className="flex flex-col w-[250px] overflow-hidden">
                    {/* <Depth market={market as string}> */}
                </div>
            </div>
            
        </div>
        <div className="w-[1px] flex-col border-slate-800 border-l"></div>
        <div>
            <div className="bg-baseBackgroundL0 min-w-[250px]">
                <SwapUI market = {market as string}/>

            </div>
        </div>

    </div>
  )
}

export default page