"use client";
import { useState, useEffect,useRef } from "react";
import { bids } from "@/utils/bidsTest";
import BidTable from "./BidTable";
import AskTable from "./AskTable";
import { asks } from "@/utils/AskTest";

const DepthAndTrades = ({ market }: { market: string }) => {
    
  const [activeTab, setActiveTab] = useState("books");

  return (
    <div className=" flex flex-col space-y-4">
      <div className="flex flex-row space-x-4 justify-evenly mt-2 mx-2">
        <div onClick={()=>{
          setActiveTab("books")
        }} className="bg-neutral-800 rounded-lg cursor-pointer">
          <p className="font-medium text-md px-4 py-2">Book</p>
        </div>
        <div onClick={()=>{
            setActiveTab("trades")      
        }}  className="bg-neutral-800 rounded-lg cursor-pointer">
          <p className="font-medium text-md px-4 py-2">Trades</p>
        </div>
      </div>
      <div>{activeTab == "books" && <DepthComponent />}</div>
      <div>{activeTab == "trades" && <TradesComponent />}</div>
    </div>
  );
};

function DepthComponent() {
    const scrollableRef = useRef<HTMLDivElement>(null);
    

    useEffect(()=>{
      if(scrollableRef.current){
        const midpoint = scrollableRef.current.scrollHeight - scrollableRef.current.clientHeight;
        scrollableRef.current.scrollTo({top:midpoint/2,behavior:"smooth"});
      }
    },[])
    
    
    

  return (
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
      <div className="h-[30.25rem] space-y-1">

        <div  id="scrollableDiv" ref={scrollableRef} className="h-[25.25rem] overflow-y-auto" style={{scrollbarWidth:"none"}}>
          
            <AskTable asks={asks} />
            <div className="flex flex-row justify-between px-3 py-0">
              <p className="text-lg font-bold">215</p>
              <button onClick={(e)=>{
                  e.preventDefault();
                  console.log(scrollableRef.current?.scrollHeight);
                  if(scrollableRef.current){
                        let midPoint = (scrollableRef.current.scrollHeight - scrollableRef.current.clientHeight)/2;
                        scrollableRef.current.scrollTo({
                            top: midPoint,
                            behavior: "smooth",
                          })
                  }
                  console.log(scrollableRef.current?.scrollTop);
                  console.log(scrollableRef.current?.scrollHeight)
                  console.log(scrollableRef.current?.clientHeight)  
                  
              }} className={`text-xs cursor-pointer text-blue-600 ${scrollableRef.current?.scrollTop == (scrollableRef.current?.scrollHeight)/2 ? "opacity-0" : ""}`}>Recenter</button>
            </div>
            <BidTable bids={bids} />
            
        </div>
        <div className="h-[1.5rem] bg-green-300">


        </div>
      </div>
    </div>
  );
}


function TradesComponent() {
  return(
    <div>
      Trades
    </div>
  )
}

export default DepthAndTrades;
