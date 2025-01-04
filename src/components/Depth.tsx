"use client"
import {useState,useEffect} from 'react'
import { bids } from '@/utils/bidsTest';
import BidTable from './BidTable';

const Depth = ({market}:{market:string}) => {
    const [activeTab,setActiveTab] = useState('books');


    

  return (
    <div className=" flex flex-col space-y-4">
        <div className="flex flex-row space-x-4 justify-evenly mt-2 mx-2">
            <div className="bg-neutral-800 rounded-lg cursor-pointer">
                <p className="font-medium text-md px-4 py-2">Book</p>
            </div>
            <div  className="bg-neutral-800 rounded-lg cursor-pointer">
                <p  className="font-medium text-md px-4 py-2">Trades</p>
            </div>
        </div>
        <div >
            {activeTab == 'books' && <BooksComponent/>}

        </div>
    </div>
  )
}

function BooksComponent(){
    
    console.log("bids:",bids);
    return(
        <div>
            <div className="items-center flex-row border-b-1 border-b-borderColor flex px-3 py-2 text-baseTextMedEmphasis gap-x-4">
                <div className=" space-y-1 ">
                    <p className="text-xs font-semibold font-sans">Price (USDC)</p>
                </div>
                <div className=" space-y-1">
                    <p className="text-xs font-semibold font-sans">Size (SOL)</p>
                    
                </div>
                <div className=" space-y-1">
                    <p className="text-xs font-semibold font-sans">Total (SOL)</p>
                </div>
            </div>
            <div>
                <BidTable bids={bids}/>
            </div>
            
        </div>

    )
}


export default Depth