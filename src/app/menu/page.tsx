'use client'
import React, { useEffect, useState } from 'react'
import localFont from 'next/font/local'
import Image from 'next/image';
import pizza from '../../../public/images/piz2.png'
import slice from '../../../public/images/slice.png'



import { ShoppingCart } from 'lucide-react';

import {burgers, CarsoulStaticData, pizzas}  from '@/data/HardcodedData'


import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import HardCodedItems from '@/components/layout/HardCodedItems';




const myFont = localFont({
  src: "../../../public/fonts/3.otf"
});
const my2Font = localFont({
  src: "../../../public/fonts/4.otf"
});
const my3Font = localFont({
  src: "../../../public/fonts/5.ttf"
});

function MenuPage() {

  type MenuItem = {
  _id: number;
  ItemName: string;
  description: string;
  price: number;
  image?: string; // optional
  category?: string; // optional
};


  const [menuItemData , setMenuItemData] = useState<MenuItem[]>([]);
const [mounted, setMounted] = useState(false);
 const router = useRouter();

  const handleClick = (_id: number) => {
    console.log('id is ' , _id)
    router.push(`/menuItemdetail/${_id}`); 
  };


   


useEffect(()=>{
   const  newAddeditems=async()=> {
    setMounted(true);
     try {
       const newAddedItemsResp = await axios.get('/api/menuitem')
     if(!newAddedItemsResp){
       console.log("there is some error while fetching the items ")
     }
     setMenuItemData(newAddedItemsResp.data.data);
    //  console.log(menuItemData);
    //  console.log(newAddedItemsResp);
      
     } catch (error) {
      console.log("error while hitting the menuitem endpoint" , error)
      
     }

    
   }
 newAddeditems();

},[])
// useEffect(() => {
//   // console.log("Updated menuItemData:", menuItemData); 
// }, [menuItemData]);


if (!mounted) {
    return <p className="text-center mt-10">Loading menu...</p>; // 👈 avoids hydration mismatch
  }

    
  return (
    <div className='w-full flex flex-col justify-center items-center overflow-hidden'>

        <div className=" text-center bg-red-500 md:pb-[35rem] pb-[10rem] "> 
            <h1 className={` text-[4rem] md:text-[16rem] tracking-widest font-bold text-yellow-300 ${myFont.className}`}>pizza</h1>
              <Image
        src={pizza} // path to your burger image
        alt="pizza"
       className="absolute top-[41%] md:top-[75%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-40 md:w-[50rem] md:h-[50rem] w-[20rem] h-[20rem] transition-transform hover:rotate-[360deg] duration-3000"

      />
          <Image
      src={slice}
        alt="finger chips "
        className="absolute top-[60%] left-20 -translate-x-2/3  -translate-y-1 z-10 size-[25rem] md:block hidden  rotate-180"
       />

<div className="absolute top-1/2 right-0 -translate-y-1/2 overflow-hidden w-[400px] h-[500px] md:block hidden">
  <Image

    src={slice}
    alt="sliice"
    className="translate-x-1/2"
  />
</div> 


    </div>
        


 <div className="block md:hidden pt-25">
  <Carousel className="w-full max-w-74">
    <CarouselContent>
      {CarsoulStaticData.map((item, index) => (
        <CarouselItem key={index}>
          <div className="p-0">
            <Card>
              <CardContent className="flex flex-col aspect-square items-center justify-center p-2 space-y-4">
                <p className={`text-lg md:text-2xl font-bold text-yellow-500 ${myFont.className}`}>
                  {item.name}
                </p>

                <span className="text-2xl font-semibold">
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={300}
                    height={300}
                    onClick={() => handleClick(item.id)}
                    className="hover:rotate-[360deg] transition-transform duration-1000 w-60 h-60 "
                  />
                </span>

                <div className="flex items-center justify-between px-6 w-full">
                  <div>
                    <p className="font-bold text-2xl">₹{item.price}</p>
                    <p>220gm/600cal</p>
                  </div>
                  <ShoppingCart className="text-red-500 w-10 h-10" />
                </div>
              </CardContent>
            </Card>
          </div>
        </CarouselItem>
      ))}
    </CarouselContent>
    <CarouselPrevious />
    <CarouselNext />
  </Carousel>
</div>


<div className="max-w-5xl hidden md:block">
  <Carousel>
    <CarouselContent className="-ml-1">
      {CarsoulStaticData.map((item, index) => (
        <CarouselItem key={index} className="pl-1 md:basis-1/2 lg:basis-1/3">
          <div className="p-1">
            <Card>
              <CardContent className="flex flex-col aspect-square items-center justify-center p-0 space-y-5">
                <p className={`text-2xl font-bold text-yellow-500 ${myFont.className}`}>
                  {item.name}
                </p>

                <span className="text-2xl font-semibold">
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={300}
                    height={300}
                    onClick={() => handleClick(item.id)}
                    className="hover:rotate-[360deg] transition-transform duration-1000 w-60 h-60"
                  />
                </span>

                <div className="flex items-center justify-between px-6 w-full">
                  <div>
                    <p className="font-bold text-3xl">₹{item.price}</p>
                    <p>220gm/600cal</p>
                  </div>
                  <ShoppingCart className="text-red-500 w-11 h-11" />
                </div>
              </CardContent>
            </Card>
          </div>
        </CarouselItem>
      ))}
    </CarouselContent>
    <CarouselPrevious />
    <CarouselNext />
  </Carousel>
</div>

          



 <div className='my-20 md:my-30 flex flex-col justify-center items-center w-full'>
          <h1 className={` text-[4rem] md:text-[6rem]  text-center tracking-wide font-bold text-yellow-300 ${my2Font.className}`}>Bestsellers</h1>
          <div className='flex flex-row  md:w-[81rem] w-[18rem]'>
 <HardCodedItems data={pizzas}/>

           {/* <div className='   w-full h-[500px] md:w-[350px] bg-white md:h-[600px]   flex flex-col justify-between md:p-4 pt-3 md:pt-6 pb-6 rounded-[40px] gap-1  hover:scale-102 transition-transform duration-1000'>
            <div className=''>
            <h4 className='text-sm md:text-md font-semibold px-5 '>PORK</h4>
            <h1 className='md:text-4xl text-2xl font-bold px-5 tracking-wide'>Bacon+Cheese +Green Burger</h1>
            </div>
            <div className=' flex justify-center '>
              <img  className=" w-[450px] md:h-[400px] md:w-[350px]" 
              src="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cGl6emF8ZW58MHx8MHx8fDA%3D" alt="" />

            </div>

            <div className='flex items-center justify-between px-6   '>
              <div>
                <p className='font-bold text-3xl'>$6.00</p>
                <p>220gm/600cal</p>
              </div>
              <ShoppingCart className='text-red-500 w-11 h-11 '/>
                 
            </div>
           </div>

          <div className='w-full h-[500px] md:w-[350px] bg-white md:h-[600px]   flex flex-col justify-between md:p-4 pt-3 md:pt-6 pb-6 rounded-[40px] gap-1  hover:scale-102 transition-transform duration-1000 '>
            <div className=''>
            <h4 className='text-sm md:text-md font-semibold px-5  '>PORK</h4>
            <h1 className='md:text-4xl text-2xl font-bold px-5 tracking-wide'>Black Angus Burger</h1>
            </div>
            <div className=' flex justify-center '>
              <img  className="w-[450px] md:h-[400px] md:w-[350px]" 
              src="https://images.unsplash.com/photo-1588315029754-2dd089d39a1a?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzl8fHBpenphfGVufDB8fDB8fHww" alt="" />

            </div>

            <div className='flex items-center justify-between px-6   '>
              <div>
                <p className='font-bold text-3xl'>$6.00</p>
                <p>220gm/600cal</p>
              </div>
              <ShoppingCart className='text-red-500 w-11 h-11 '/>
                  
            </div>
           </div>

          <div className='w-full h-[500px] md:w-[350px] bg-white md:h-[600px]   flex flex-col justify-between md:p-4 pt-3 md:pt-6 pb-6 rounded-[40px] gap-1  hover:scale-102 transition-transform duration-1000  '>
            <div className=''>
            <h4 className='text-sm md:text-md font-semibold px-5 '>PORK</h4>
            <h1 className='md:text-4xl text-2xl font-bold px-5 tracking-wide'>Bøfsandwich</h1>
            </div>
            <div className=' flex justify-center '>
              <img  className="w-[450px] md:h-[400px] md:w-[350px]" 
              src="https://images.unsplash.com/photo-1615719413546-198b25453f85?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDR8fHBpenphfGVufDB8fDB8fHww" alt="" />

            </div>

            <div className='flex items-center justify-between px-6   '>
              <div>
                <p className='font-bold text-3xl'>$6.00</p>
                <p>220gm/600cal</p>
              </div>
              <ShoppingCart className='text-red-500 w-11 h-11 '/>
                
            </div>
           </div> */}

          

          
    </div>

    </div>


        

    

     <div className='w-full h-screen  relative '> 
       
    <svg
      className="relative block w-full h-16"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1440 320"
      preserveAspectRatio="none"
    >
      <path
        fill="black" // <-- wave color (same as your beige background)
        d="M0,64L48,74.7C96,85,192,107,288,144C384,181,480,235,576,245.3C672,256,768,224,864,181.3C960,139,1056,85,1152,90.7C1248,96,1344,160,1392,192L1440,224V320H0Z"
      ></path>
    </svg>
 
      
                <img src="https://eatsy.bold-themes.com/burger/wp-content/uploads/sites/2/2021/02/hero_menu.jpg" alt="" />
                <div className=' absolute top-30 left-6 md:top-50 md:left-85 flex flex-col items-center mx-auto space-y-0' >
                  <p className={`text-yellow-200 font-bold   ${my2Font.className} text-[3rem] z-50  md:text-[10rem]`}>Flame Grilled</p>
                  <p  className={`text-yellow-200 font-bold   ${my2Font.className} text-[2rem] z-50  md:text-5xl`}> Enjoy the tastiest burgers in town</p>
                </div>

                <div className="w-full overflow-hidden leading-none relative">

  <svg
    viewBox="0 0 500 80"
    preserveAspectRatio="none"
    className="block w-full h-[100px] rotate-180"
  >
    <path
      d="M0.00,39.98 C150.00,150.00 349.92,-50.00 500.00,49.98 L500.00,150.00 L0.00,150.00 Z"
      fill="#black"
    />
  </svg>
</div>

                
              </div>
    


        <div className='flex justify-center gap-10 items-center mx-20  flex-wrap  md:w-[81rem] w-[18rem]  md:pt-30'>
       
       <HardCodedItems data={burgers}/>
      
                 {/* <div className='   w-full h-[500px] md:w-[350px] bg-white md:h-[600px]   flex flex-col justify-between md:p-4 pt-3 md:pt-6 pb-6 rounded-[40px] gap-1  hover:scale-102 transition-transform duration-1000'>
                  <div className=''>
                  <h4 className='text-sm md:text-md font-semibold px-5 '>PORK</h4>
                  <h1 className='md:text-4xl text-2xl font-bold px-5 tracking-wide'>Bacon+Cheese +Green Burger</h1>
                  </div>
                  <div className=' flex justify-center '>
                    <img  className=" w-[450px] md:h-[400px] md:w-[350px]" 
                    src="https://eatsy.bold-themes.com/burger/wp-content/uploads/sites/2/2018/09/product_01-640x640.avif" alt="" />
      
                  </div>
      
                  <div className='flex items-center justify-between px-6   '>
                    <div>
                      <p className='font-bold text-3xl'>$6.00</p>
                      <p>220gm/600cal</p>
                    </div>
                    <ShoppingCart className='text-red-500 w-11 h-11 '/>
                     
                  </div>
                 </div>
      
                <div className='w-full h-[500px] md:w-[350px] bg-white md:h-[600px]   flex flex-col justify-between md:p-4 pt-3 md:pt-6 pb-6 rounded-[40px] gap-1  hover:scale-102 transition-transform duration-1000 '>
                  <div className=''>
                  <h4 className='text-sm md:text-md font-semibold px-5  '>PORK</h4>
                  <h1 className='md:text-4xl text-2xl font-bold px-5 tracking-wide'>Black Angus Burger</h1>
                  </div>
                  <div className=' flex justify-center '>
                    <img  className="w-[450px] md:h-[400px] md:w-[350px]"
                     src="https://eatsy.bold-themes.com/burger/wp-content/uploads/sites/2/2018/09/product_02-640x640.avif" alt="" />
      
                  </div>
      
                  <div className='flex items-center justify-between px-6   '>
                    <div>
                      <p className='font-bold text-3xl'>$6.00</p>
                      <p>220gm/600cal</p>
                    </div>
                    <ShoppingCart className='text-red-500 w-11 h-11 '/>
                        
                  </div>
                 </div>
      
                <div className='w-full h-[500px] md:w-[350px] bg-white md:h-[600px]   flex flex-col justify-between md:p-4 pt-3 md:pt-6 pb-6 rounded-[40px] gap-1  hover:scale-102 transition-transform duration-1000  '>
                  <div className=''>
                  <h4 className='text-sm md:text-md font-semibold px-5 '>PORK</h4>
                  <h1 className='md:text-4xl text-2xl font-bold px-5 tracking-wide'>Bøfsandwich</h1>
                  </div>
                  <div className=' flex justify-center '>
                    <img  className="w-[450px] md:h-[400px] md:w-[350px]" 
                    src="https://eatsy.bold-themes.com/burger/wp-content/uploads/sites/2/2018/09/product_08.jpg" alt="" />
      
                  </div>
      
                  <div className='flex items-center justify-between px-6   '>
                    <div>
                      <p className='font-bold text-3xl'>$6.00</p>
                      <p>220gm/600cal</p>
                    </div>
                    <ShoppingCart className='text-red-500 w-11 h-11 '/>
                       
                  </div>
                 </div>
      
      
                 <div className='w-full h-[500px] md:w-[350px] bg-white md:h-[600px]   flex flex-col justify-between md:p-4 pt-3 md:pt-6 pb-6 rounded-[40px] gap-1  hover:scale-102 transition-transform duration-1000  '>
                  <div className=''>
                  <h4 className='text-sm md:text-md font-semibold px-5 '>PORK</h4>
                  <h1 className='md:text-4xl text-2xl font-bold px-5 tracking-wide'>Bøfsandwich</h1>
                  </div>
                  <div className=' flex justify-center '>
                    <img  className="w-[450px] md:h-[400px] md:w-[350px]" 
                    src="http://res.cloudinary.com/dmlbubaom/image/upload/v1755504842/nextjs_uploads/hym3n055yie1oqqiqgk5.jpg" alt="" />
      
                  </div>
      
                  <div className='flex items-center justify-between px-6   '>
                    <div>
                      <p className='font-bold text-3xl'>$6.00</p>
                      <p>220gm/600cal</p>
                    </div>
                    <ShoppingCart className='text-red-500 w-11 h-11 '/>
                       
                  </div>
                 </div>


                 <div className='   w-full h-[500px] md:w-[350px] bg-white md:h-[600px]   flex flex-col justify-between md:p-4 pt-3 md:pt-6 pb-6 rounded-[40px] gap-1  hover:scale-102 transition-transform duration-1000'>
                  <div className=''>
                  <h4 className='text-sm md:text-md font-semibold px-5 '>PORK</h4>
                  <h1 className='md:text-4xl text-2xl font-bold px-5 tracking-wide'>Bacon+Cheese +Green Burger</h1>
                  </div>
                  <div className=' flex justify-center '>
                    <img  className=" w-[450px] md:h-[400px] md:w-[350px]"
                     src="https://res.cloudinary.com/dmlbubaom/image/upload/v1755499593/nextjs_uploads/xzfxcbidseml9xewjycl.jpg" alt="" />
      
                  </div>
      
                  <div className='flex items-center justify-between px-6   '>
                    <div>
                      <p className='font-bold text-3xl'>$6.00</p>
                      <p>220gm/600cal</p>
                    </div>
                    <ShoppingCart className='text-red-500 w-11 h-11 '/>
                       
                  </div>
                 </div>

      
                <div className='w-full h-[500px] md:w-[350px] bg-white md:h-[600px]   flex flex-col justify-between md:p-4 pt-3 md:pt-6 pb-6 rounded-[40px] gap-1  hover:scale-102 transition-transform duration-1000 '>
                  <div className=''>
                  <h4 className='text-sm md:text-md font-semibold px-5  '>PORK</h4>
                  <h1 className='md:text-4xl text-2xl font-bold px-5 tracking-wide'>Black Angus Burger</h1>
                  </div>
                  <div className=' flex justify-center '>
                    <img  className="w-[450px] md:h-[400px] md:w-[350px]" 
                    src="https://res.cloudinary.com/dmlbubaom/image/upload/v1755503264/nextjs_uploads/iqqxf8ewxt6ihsf4z1af.jpg" alt="" />
      
                  </div>
      
                  <div className='flex items-center justify-between px-6   '>
                    <div>
                      <p className='font-bold text-3xl'>$6.00</p>
                      <p>220gm/600cal</p>
                    </div>
                    <ShoppingCart className='text-red-500 w-11 h-11 '/>
                       
                  </div>
                 </div>
                 
      
                <div className='w-full h-[500px] md:w-[350px] bg-white md:h-[600px]   flex flex-col justify-between md:p-4 pt-3 md:pt-6 pb-6 rounded-[40px] gap-1  hover:scale-102 transition-transform duration-1000  '>
                  <div className=''>
                  <h4 className='text-sm md:text-md font-semibold px-5 '>PORK</h4>
                  <h1 className='md:text-4xl text-2xl font-bold px-5 tracking-wide'>Bøfsandwich</h1>
                  </div>
                  <div className=' flex justify-center '>
                    <img  className="w-[450px] md:h-[400px] md:w-[350px]"
                     src="https://res.cloudinary.com/dmlbubaom/image/upload/v1755503356/nextjs_uploads/pg0icpixaayui7hx1nac.jpg" alt="" />
      
                  </div>
      
                  <div className='flex items-center justify-between px-6   '>
                    <div>
                      <p className='font-bold text-3xl'>$6.00</p>
                      <p>220gm/600cal</p>
                    </div>
                    <ShoppingCart className='text-red-500 w-11 h-11 '/>
                      
                  </div>
                 </div>
      
      
                 <div className='w-full h-[500px] md:w-[350px] bg-white md:h-[600px]   flex flex-col justify-between md:p-4 pt-3 md:pt-6 pb-6 rounded-[40px] gap-1  hover:scale-102 transition-transform duration-1000  '>
                  <div className=''>
                  <h4 className='text-sm md:text-md font-semibold px-5 '>PORK</h4>
                  <h1 className='md:text-4xl text-2xl font-bold px-5 tracking-wide'>Bøfsandwich</h1>
                  </div>
                  <div className=' flex justify-center '>
                    <img  className="w-[450px] md:h-[400px] md:w-[350px]" 
                    src="https://res.cloudinary.com/dmlbubaom/image/upload/v1755504089/meat-burger-wooden-board-french-fries-side-view_d0eszt.jpg" alt="" />
      
                  </div>
      
                  <div className='flex items-center justify-between px-6   '>
                    <div>
                      <p className='font-bold text-3xl'>$6.00</p>
                      <p>220gm/600cal</p>
                    </div>
                    <ShoppingCart className='text-red-500 w-11 h-11 '/>
                       
                  </div>
                 </div>    */}
      
              </div>


        <div className=' w-full  my-10 relative h-screen '>
          <svg
      className="relative block w-full h-16"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1440 320"
      preserveAspectRatio="none"
    >
      <path
        fill="black" // <-- wave color (same as your beige background)
        d="M0,64L48,74.7C96,85,192,107,288,144C384,181,480,235,576,245.3C672,256,768,224,864,181.3C960,139,1056,85,1152,90.7C1248,96,1344,160,1392,192L1440,224V320H0Z"
      ></path>
    </svg>

          <img className='object-cover h-screen w-full' src="https://res.cloudinary.com/dmlbubaom/image/upload/v1755505347/hands-holding-shish-kebab-with-colorful-bell-peppers_qbkgtt.jpg" alt="" />
          <div className='absolute md:top-17 md:left-60 flex flex-col items-center top-25 md:p-0 pt-10 text-center'>
            <p className={`${my2Font.className} text-[3rem] md:text-[6rem] font-bold text-yellow-200`}>Check out our newly added items</p>
            {/* <p className={`${my2Font.className} text-6xl font-bold text-yellow-200`}></p> */}
          </div>





 <div className="block md:hidden pt-25 w-5xl mb-10 absolute top-50 left-12">
  <Carousel className="w-full max-w-74">
    <CarouselContent>
      {menuItemData.map((item, index) => (
        <CarouselItem key={index}>
          <div className="p-0">
            <Card>
              <CardContent className="flex flex-col aspect-square items-center justify-center  space-y-4">
                <p className={`text-lg md:text-2xl font-bold text-yellow-500 ${myFont.className}`}>
                  {item.ItemName}
                </p>

                <span className="text-2xl font-semibold">
                  <Image
                    src={item.image||""}
                    alt={item.ItemName}
                    width={300}
                    height={300}
                    onClick={() => handleClick(item._id)}
                    className=" md:w-60 md:h-60 w-[250px] h-[250px] rounded-4xl"
                  />
                </span>

                <div className="flex items-center justify-between px-6 w-full">
                  <div>
                    <p className="font-bold text-2xl">₹{item.price}</p>
                    <p>220gm/600cal</p>
                  </div>
                  <ShoppingCart className="text-red-500 w-10 h-10" />
                </div>
              </CardContent>
            </Card>
          </div>
        </CarouselItem>
      ))}
    </CarouselContent>
    <CarouselPrevious />
    <CarouselNext />
  </Carousel>
</div>

           <div className='  w-5xl mb-10 absolute top-50 left-50 hidden md:block'>

      

      <Carousel className="" 
        
        >
      <CarouselContent className="-ml-1 ">
        {menuItemData.map((item, index) => (
          <CarouselItem key={index} className="pl-1 md:basis-1/2 lg:basis-1/3 ">
            <div className="p-1 ">
              <Card className='h-[450px]'>
                 
                <CardContent className="flex flex-col aspect-square items-center justify-center p-0 space-y-5">
                  <p className={`text-2xl font-bold text-yellow-500 ${myFont.className}`}>{menuItemData[index].ItemName}</p>
                 
                  <span className="text-2xl font-semibold">
                  <Link href={`/menuItemdetail/${item._id}`}>
                       <Image 

                                src={item.image|| ""}
                                alt="Product"
                                  width={300}
                                  height={300}
                                  className=" rounded-3xl h-70 w-70 "/>
                                  </Link>
                   </span>
                   
                    <div className='flex items-center justify-between px-6   w-full'>
              <div>
                <p className='font-bold text-3xl'>₹{item.price}</p>
                <p>220gm/600cal</p>
              </div>
              
              <Link href={`/menuItemdetail/${item._id}`}><ShoppingCart className='text-red-500 w-11 h-11 ' /></Link>
                
            </div>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>



        </div>

        </div>


        





    </div>
  )
}

export default MenuPage