import {useState} from 'react'
import {useForm,SubmitHandler} from 'react-hook-form'


const SwapUI = ({market}:{market:string}) => {
    const [activeTab,setActiveTab] = useState('buy');
    const [type,setType] = useState("limit")
    
    

  return (
    <div>
        <div className="flex flex-col">
            <div className="flex flex-row w-full h-[60px]">
                <div className={`font-bold border-b-2   border-solid  w-1/2 flex justify-center items-center cursor-pointer ${activeTab=="buy"?'border-green-900 bg-opacity-50 bg-green-900 ':'border-baseBackgroundMed bg-black bg-opacity-40'}`}
                onClick={()=>{
                    setActiveTab('buy')
                }}
                >
                    Buy
                </div>
                <div className={`font-bold border-b-2  border-solid w-1/2 flex justify-center items-center cursor-pointer ${activeTab=="sell"?'border-redBorder  bg-redBackgroundTransparent':'border-baseBackgroundMed bg-black bg-opacity-40'}`} onClick={()=>{
                    setActiveTab("sell");
                }}>
                    Sell
                </div>
            </div>
            <div className="flex flex-col gap-1 p-2">
                <div className="flex flex-row space-x-6">
                    <button
                    onClick={()=>{
                        setType("limit")
                    }}
                    className={`font-medium text-sm
                        ${type=="market"&&'hover:border-white pb-1 border-b-2'}
                      ${type=='limit'?'pb-1 border-b-2 border-green-500 border-solid':'pb-1 border-b-2 border-transparent border-solid'}`}>Limit</button>
                    <button
                    onClick={()=>{
                        setType("market")
                    }}
                     className={`font-medium text-sm 
                     ${type=="limit"&&'hover:border-white pb-1 border-b-2'}
                     ${type=='market'?'pb-1 border-b-2 border-green-500 border-solid':'pb-1 border-b-2 border-transparent border-solid'}`}>Market</button>
                </div>
                <div className="flex flex-col space-y-2">
                    <div className="flex flex-row justify-between items-center">
                        <p className="text-xs text-baseTextMidEmphasis">Available Balance</p>
                        <p className="text-xs text-baseTextHighEmphasis">36.94 USDC</p>
                    </div>
                </div>
                <div>
                    
                </div>
            </div>
        </div>
    </div>
  )
}

export default SwapUI