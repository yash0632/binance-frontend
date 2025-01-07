"use client";
import { useState, useEffect,useRef } from "react";
import { bids as askData } from "@/utils/bidsTest";
import BidTable from "./BidTable";
import AskTable from "./AskTable";
import { asks  as bidData} from "@/utils/AskTest";
import { SignalingManager } from "@/utils/SignalingManager";
import { set } from "react-hook-form";
import { getDepth } from "@/utils/httpClient";

const DepthAndTrades = ({ market }: { market: string }) => {
  const [bids,setBids] = useState(bidData);
  const [asks,setAsks] = useState(askData);



  useEffect(()=>{
    
    async function setDepth(){
      const responseData = await getDepth({market});
      setBids(responseData.bids);
      setAsks(responseData.asks);
    }

    //setDepth();

    SignalingManager.getInstance().registerCallback("depth",(data)=>{
      
      
      console.log(data);
      if(data.bids){

        console.log("having")
        setBids((originalBids)=>{
          const bidsAfterUpdate:any[] = [...(originalBids || [])];
          
          for(let j = 0;j < data.bids.length;j++){
          
            let found = false;
            if(originalBids){
              for(let i = 0;i < originalBids.length;i++){
                if(bidsAfterUpdate[i][0] == data.bids[j][0]){
                  bidsAfterUpdate[i][1] = data.bids[j][1];
                  found = true;
                  if(bidsAfterUpdate[i][1] == "0.00"){
                      bidsAfterUpdate.splice(i,1);
                  }
                  
                  break;
                }
              }
            }
            
            
  
            if(!found){
              bidsAfterUpdate.push(data.bids[j]);
            }
          }
          console.log("bidsAfterUpdate:",bidsAfterUpdate);
          return bidsAfterUpdate
        })
      }
      
      
      if(data.asks){
        setAsks((originalAsks)=>{
          const asksAfterUpdate:any[] = [...(originalAsks || [])];
          for(let j = 0;j < data.asks.length;j++){
            let found = false;
            if(originalAsks){
              for(let i = 0;i < originalAsks.length;i++){
            
                if(asksAfterUpdate[i][0] == data.asks[j][0]){
                  asksAfterUpdate[i][1] = data.asks[j][1]; 
                  found = true;
                  break;
                }
              }
            }
            
            if(!found){
              asksAfterUpdate.push(data.asks[j]);
            }
          }
          return asksAfterUpdate;    
        }) 
      }
       

      
    },`ticker-${market}`)
    SignalingManager.getInstance().sendMessage({
      "method":"SUBSCRIBE",
      "params":[`depth.200ms.${market}`]
    })

    return ()=>{
      SignalingManager.getInstance().deregisterCallback("depth",`ticker-${market}`)
      SignalingManager.getInstance().sendMessage({
        "method":"UNSUBSCRIBE",
        "params":[`depth.200ms.${market}`]
      })
    }

  },[market])
  console.log("bids:",bids);
  console.log("asks:",asks);

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
      <div>{activeTab == "books" && <DepthComponent bidsData={bids} asksData={asks} />}</div>
      <div>{activeTab == "trades" && <TradesComponent />}</div>
    </div>
  );
};

function DepthComponent({bidsData,asksData}:{bidsData:any[],asksData:any[]}) {
    




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
          
            <AskTable asks={asksData} />
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
            <BidTable bids={bidsData} />
            
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
