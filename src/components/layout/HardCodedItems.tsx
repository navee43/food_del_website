'use client'
import React, { useState } from 'react'
import { ShoppingCart } from 'lucide-react';
import { useRouter } from 'next/navigation';
function HardCodedItems({data}:any) {
    const [inData , setInData] = useState(data);
 const router = useRouter();

     const handleClick = (_id: number) => {
    console.log('id is ' , _id)
    router.push(`/menuItemdetail/${_id}`); 
  };

  return (
    <div className='flex justify-center gap-10 items-center mx-20  flex-wrap  md:w-[81rem]  w-[20rem] md:pt-25'>

            {inData && 
            inData.map((item:any, index:any)=>(
                
                 <div key={index} className='  h-[500px] w-[500px] md:w-[350px] bg-white md:h-[600px] space-y-2  flex flex-col justify-between md:p-4 pt-3 md:pt-6 pb-6 rounded-4xl gap-1  hover:scale-102 transition-transform duration-1000'>
                                  <div className='' onClick={()=>(handleClick(inData[index].id))}>
                                  <h4 className='text-sm md:text-md font-semibold px-5 '>PORK</h4>
                                  <h1 className='md:text-3xl text-xl font-bold px-5 tracking-wide'>{inData[index].name}</h1>
                                  </div>

                                  
                                  <div className=' flex justify-center '>
                                    <img  className=" w-[450px] h-[350px] md:h-[400px] md:w-[350px] p-4" 
                                    src={inData[index].image} alt=''

                                    onClick={()=>(handleClick(inData[index].id))}
                                    />
                      
                                  </div>
                      
                                  <div className='flex items-center justify-between px-6   '>
                                    <div>
                                      <p className='font-bold text-3xl'>₹{inData[index]?.price}</p>
                                      <p>220gm/600cal</p>
                                    </div>
                                    <ShoppingCart className='text-red-500 w-11 h-11 cursor-pointer' onClick={()=>(handleClick(inData[index].id))}/>
                                       
                                  </div>
                                 </div>

            ))
            
            
            }
    </div>
  )
}

export default HardCodedItems