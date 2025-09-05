import React from 'react'
import localFont from 'next/font/local'

import { Instagram ,MapPin, Github ,Twitter ,Clock10,BriefcaseBusiness, Phone} from 'lucide-react';
import { Separator } from "@/components/ui/separator"
import logo from '../../../public/images/logo.png'
import Image from 'next/image';


const Font = localFont({
  src: "../../../public/fonts/5.ttf"
});

function footer() {
  return (
   

        <div className="w-full object-cover bg-center bg-no-repeat bg-cover overflow-x-hidden"
    
    style={{ backgroundImage: "url('https://images.unsplash.com/photo-1637771622300-6f968a373415?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')" }}
    >
            
            {/* <div className='w-full h-screen z-50'><img src="https://imgs.search.brave.com/voRxaoQsNb5lgOljgV3xwl6OhsoCufsjwYnuZSNKhVw/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvY29tbW9ucy90/aHVtYi9iL2I2L0lt/YWdlX2NyZWF0ZWRf/d2l0aF9hX21vYmls/ZV9waG9uZS5wbmcv/OTYwcHgtSW1hZ2Vf/Y3JlYXRlZF93aXRo/X2FfbW9iaWxlX3Bo/b25lLnBuZw" alt="" /></div> */}
               <div className=" top-0 left-0 w-full">
    <svg viewBox="0 0 1440 320" className="w-full h-24"  preserveAspectRatio="none">
      <path
        fill="#FFEDB8"
        d="M0,160L60,165.3C120,171,240,181,360,170.7C480,160,600,128,720,106.7C840,85,960,75,1080,101.3C1200,128,1320,192,1380,224L1440,256V0H0Z"
      ></path>
    </svg>
               </div>
          

             <div className=' flex flex-col items-center space-y-7  md:gap-10  pt-12  '>
              <Image src={logo} alt="" className="w-30 h-30 " />
              {/* <img  className="w-19 h-19 " src="https://eatsy.bold-themes.com/burger/wp-content/uploads/sites/2/2021/02/footer_logo.png" alt="" /> */}
              <h1 className={`${Font.className} text-white text-center text-3xl md:text-5xl `}>Stay informed about special offers</h1>
              <h3 className={`${Font.className} text-white text-xl md:text-2xl`}>Subscribe to the newsleter</h3>
             <div className="relative  md:w-lg  ">
                  <input 
                         type="email" 
                          placeholder="enter your email" 
                           className="text-gray-900 bg-white p-5  md:w-full rounded-4xl pr-[8rem]  " />
                      <button className="absolute top-0 right-0 bg-red-500 text-black h-full w-[7rem] md:w-[10rem] rounded-4xl cursor-pointer">
                        Subscribe
                      </button>
              </div>
           
            </div>


            <div className='text-white   flex justify-start md:justify-center flex-col md:flex-row md:items-center gap-5 md:gap-40 w-full pt-10 pl-10 pb-8 '>

             <div className='flex flex-col justify-center   '>
              <p className='uppercase  text-red-500 font-semibold  pb-2'>Let&apos;s get together </p>
              <div className='gap-3 flex flex-col pb-2 '>
                <p className='flex gap-3'>  <MapPin /> 60 East 65th Street, NY</p>
                <p className='flex gap-3'>  <Clock10 />Mon - Sat: 11AM - 11PMSun: 11AM - 08PM</p>
                <p className='flex gap-3'> <BriefcaseBusiness />Mon - Sat: 01PM - 10PM</p>
                <p className='flex gap-3'><Phone/>1-800-700-600</p>
              </div>
              <div className='flex gap-3 pl-10 '>
                <Instagram  className='bg-red-500 rounded-full p-1'/>
                <Github  className='bg-red-500 rounded-full p-1'/>
                <Twitter  className='bg-red-500 rounded-full p-1'/>
              </div>

            </div>

            <div>
              <p className='uppercase text-red-500 font-semibold'>about us</p>
              <div className='capitalize'>
                <p>our story </p>
                <p>our team</p>
                <p>our food</p>
                <p>health measures</p>
              </div>
            </div>

            <div>
              <p className='uppercase text-red-500 font-semibold'>quick menu</p>
              <div className='capitalize'>
                <p>pork burgers</p>
                <p>chicken burgers</p>
                <p>drinks</p>
                <p>pizza</p>
              </div>
            </div>
            
            
           </div>

          <div className="flex  flex-col justify-center  items-center pb-10">
  <div className="w-[390px] md:w-full md:px-10 flex flex-col items-center justify-center ">
    <Separator  className='my-3'/>
   
  </div>
   <p className='text-white pl-10'>©2025 All rights reserved</p>
</div>







           </div>

          

           
  )
}

export default footer








