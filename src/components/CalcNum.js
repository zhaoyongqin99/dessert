import React,{useState,useEffect} from 'react'

export default function CalcNum(props) {

    const [num,setNum]=useState(props.num);

    const [flag,setFlag]=useState(false);

    useEffect(()=>{
        // console.log(num);
        if(num<1){
           setNum(1) 
        }
    },[num])

     
    return (
        <div>
                <button onClick={()=>{
                    setNum(num-1)
                }}>-</button>
                <span>{num}</span>

                <button onClick={()=>{
                    setNum(num+1)
                }}>+</button>
        </div>
    )


}
