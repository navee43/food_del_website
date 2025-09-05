import React from 'react';
import localFont from 'next/font/local'

import { CirclePlus } from 'lucide-react';
import { ShoppingCart } from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

import { Card, CardContent } from "@/components/ui/card"
import Image from 'next/image';

import gominoBag from '../../../public/images/gominoBag.png'
import beef from '../../../public/images/beef.png'
import bike1 from '../../../public/images/bike.png'

import burgers from '../../../public/images/burgers.png'
import pizza from '../../../public/images/piz.png'
import rew1 from '../../../public/images/rew1.jpg'
import rew2 from '../../../public/images/rew2.jpg'
import rew3 from '../../../public/images/rew3.jpg'
import rew4 from '../../../public/images/rew4.jpg'






const myFont = localFont({
  src: "../../../public/fonts/3.otf"
});
const my2Font = localFont({
  src: "../../../public/fonts/4.otf"
});
const my3Font = localFont({
  src: "../../../public/fonts/5.ttf"
});

function Hero() {


  
    return (
    <div className="w-full overflow-hidden ">
      <div className=" text-center bg-red-500 md:pb-[25rem] pb-[10rem]"> 
          <h1 className={` text-[4rem] md:text-[13rem] tracking-wide font-bold text-yellow-300 ${myFont.className}`}>Delicious </h1>
          <h1 className={` text-[4rem]  md:text-[13rem] tracking-wide font-bold text-yellow-300 ${myFont.className}`}> Burgers</h1>
         
          <img
        src="https://eatsy.bold-themes.com/burger/wp-content/uploads/sites/2/2025/06/floating_burger_01.avif" // path to your burger image
        alt="Burger"
       className="absolute top-[48%] md:top-[90%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 md:w-[60rem] md:h-[60rem] w-[20rem] h-[20rem]"

      />

      <img
      src="https://eatsy.bold-themes.com/burger/wp-content/uploads/sites/2/2025/06/floating_fries_02.avif" // path to your burger image
        alt="finger chips "
        className="absolute top-3/4 left-0 -translate-x-2/3 -translate-y-1 z-10 size-[40rem] md:block hidden "
       />

      <div className="absolute top-1/2 right-0 -translate-y-1/2 overflow-hidden w-[400px] h-[500px] md:block hidden">
  <img
    src="https://eatsy.bold-themes.com/burger/wp-content/uploads/sites/2/2025/06/floating_fries_02.avif"
    alt="fries"
    className="translate-x-2/3"
  />
</div>
</div>
      
      {/* <section className="relative bg-blue-900 w-full h-screen  flex items-center justify-center">
        

        
       
      </section> */}

     
      {/* <section className="bg-black  p-16 text-center">
        <h2 className="text-3xl font-bold text-gray-900">Next Section</h2>
        <p className="mt-4 text-lg text-gray-700">
          This section starts right after the wave.
        </p>
         <div className="w-full overflow-hidden leading-none">
          <svg
            viewBox="0 0 500 150"
            preserveAspectRatio="none"
            className="relative block w-full h-[100px]"
          >
            <path
              d="M0.00,49.98 C150.00,150.00 349.92,-50.00 500.00,49.98 L500.00,150.00 L0.00,150.00 Z"
              fill="blue" // next section color
            />
          </svg>
        </div>
      </section> */}

  



      <div className='pb-45 flex flex-col justify-center items-center'>
          <h1 className={` text-[3rem] md:text-[6rem]  text-center tracking-wide font-bold text-yellow-300 ${my2Font.className}`}>Bestsellers</h1>
          <div className='flex justify-center gap-10 items-center mx-20  flex-wrap  md:w-[81rem] w-[18rem]'>


           <div className='   w-full h-[500px] md:w-[350px] bg-white md:h-[600px]   flex flex-col justify-between md:p-4 pt-3 md:pt-6 pb-6 rounded-[40px] gap-1  hover:scale-102 transition-transform duration-1000'>
            <div className=''>
            <h4 className='text-sm md:text-md font-semibold px-5 '>PORK</h4>
            <h1 className='md:text-4xl text-2xl font-bold px-5 tracking-wide'>Bacon+Cheese +Green Burger</h1>
            </div>
            <div className=' flex justify-center '>
              <img  className=" w-[450px] md:h-[400px] md:w-[350px]" src="https://eatsy.bold-themes.com/burger/wp-content/uploads/sites/2/2018/09/product_01-640x640.avif" alt="" />

            </div>

            <div className='flex items-center justify-between px-6   '>
              <div>
                <p className='font-bold text-3xl'>$6.00</p>
                <p>220gm/600cal</p>
              </div>
              <ShoppingCart className='text-red-500 w-11 h-11 '/>
                  {/* <CirclePlus  /> */}
            </div>
           </div>

          <div className='w-full h-[500px] md:w-[350px] bg-white md:h-[600px]   flex flex-col justify-between md:p-4 pt-3 md:pt-6 pb-6 rounded-[40px] gap-1  hover:scale-102 transition-transform duration-1000 '>
            <div className=''>
            <h4 className='text-sm md:text-md font-semibold px-5  '>PORK</h4>
            <h1 className='md:text-4xl text-2xl font-bold px-5 tracking-wide'>Black Angus Burger</h1>
            </div>
            <div className=' flex justify-center '>
              <img  className="w-[450px] md:h-[400px] md:w-[350px]" src="https://eatsy.bold-themes.com/burger/wp-content/uploads/sites/2/2018/09/product_02-640x640.avif" alt="" />

            </div>

            <div className='flex items-center justify-between px-6   '>
              <div>
                <p className='font-bold text-3xl'>$6.00</p>
                <p>220gm/600cal</p>
              </div>
              <ShoppingCart className='text-red-500 w-11 h-11 '/>
                  {/* <CirclePlus  /> */}
            </div>
           </div>

          <div className='w-full h-[500px] md:w-[350px] bg-white md:h-[600px]   flex flex-col justify-between md:p-4 pt-3 md:pt-6 pb-6 rounded-[40px] gap-1  hover:scale-102 transition-transform duration-1000  '>
            <div className=''>
            <h4 className='text-sm md:text-md font-semibold px-5 '>PORK</h4>
            <h1 className='md:text-4xl text-2xl font-bold px-5 tracking-wide'>Bøfsandwich</h1>
            </div>
            <div className=' flex justify-center '>
              <img  className="w-[450px] md:h-[400px] md:w-[350px]" src="https://eatsy.bold-themes.com/burger/wp-content/uploads/sites/2/2018/09/product_08.jpg" alt="" />

            </div>

            <div className='flex items-center justify-between px-6   '>
              <div>
                <p className='font-bold text-3xl'>$6.00</p>
                <p>220gm/600cal</p>
              </div>
              <ShoppingCart className='text-red-500 w-11 h-11 '/>
                  {/* <CirclePlus  /> */}
            </div>
           </div>

           <div className='relative hover:scale-102 transition-transform duration-1000'  >
            <img className='md:w-[740px] md:h-[600px] rounded-4xl w-full h-[300px]  ' src="https://plus.unsplash.com/premium_photo-1666830497544-5f5b306ef0b5?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8aGFsbG93ZWVuJTIwYnVyZ2VyfGVufDB8fDB8fHww" alt="" />
            <div className='absolute  inset-0 flex pt-20 justify-center'>
                <p className={`text-white text-4xl md:text-7xl font-bold ${my2Font.className} `}>Halloween special offer</p>
              </div>

            <div className='absolute bottom-0  md:p-5 flex  items-center px-10 md:px-20 w-full justify-between p-3' >
              
              <div  className=''>
                <p className='text-white text-sm  md:text-2xl font-bold'>$11.00</p>
                <p className='text-white  text-sm md:text-md font-bold'>220gm/600 cal</p>

              </div>

                 <div>
                    <ShoppingCart className='text-red-500 w-8 h-8 '/>
                 </div>
            </div>
           </div>

           <div className='w-full h-[500px] md:w-[350px] bg-white md:h-[600px]   flex flex-col justify-between md:p-4 pt-3 md:pt-6 pb-6 rounded-[40px] gap-1  hover:scale-102 transition-transform duration-1000  '>
            <div className=''>
            <h4 className='text-sm md:text-md font-semibold px-5 '>PORK</h4>
            <h1 className='md:text-4xl text-2xl font-bold px-5 tracking-wide'>Bøfsandwich</h1>
            </div>
            <div className=' flex justify-center '>
              <img  className="w-[450px] md:h-[400px] md:w-[350px]" src="https://eatsy.bold-themes.com/burger/wp-content/uploads/sites/2/2018/09/product_04-640x640.avif" alt="" />

            </div>

            <div className='flex items-center justify-between px-6   '>
              <div>
                <p className='font-bold text-3xl'>$6.00</p>
                <p>220gm/600cal</p>
              </div>
              <ShoppingCart className='text-red-500 w-11 h-11 '/>
                 
            </div>
           </div>






           



      

        </div>
      </div>

       <div className="w-full overflow-hidden leading-none">
          <svg
            viewBox="0 0 500 150"
            preserveAspectRatio="none"
            className="relative block w-full h-[100px]"
          >
            <path
              d="M0.00,39.98 C150.00,150.00 349.92,-50.00 500.00,49.98 L500.00,150.00 L0.00,150.00 Z"
              fill="#FFEDB8" // next section color
            />
          </svg>
        </div>
























{/* <div className="w-full overflow-hidden leading-none relative">
//bottom
  <svg
    viewBox="0 0 500 150"
    preserveAspectRatio="none"
    className="block w-full h-[100px] rotate-180"
  >
    <path
      d="M0.00,39.98 C150.00,150.00 349.92,-50.00 500.00,49.98 L500.00,150.00 L0.00,150.00 Z"
      fill="#FFEDB8"
    />
  </svg>
</div> */}



<div className='flex w-full  flex-col md:flex-row   '>
        <div className='bg-[#FFEDB8]  w-full md:w-1/2'>
          <Image src={gominoBag} alt=""  className='h-full pr-5'/>
         

        </div>

        <div className='bg-[#FFEDB8]  md:w-1/2 pt-10 space-y-7 pl-5' >
          <div>
            <p className={`${my2Font.className} text-red-500 text-5xl md:text-7xl font-bold`}>Free delivery 7 <br/> days a week</p>
          </div>


          <div className='md:space-y-14 space-y-10'>

          <div className='flex space-x-10  flex-col md:flex-row '>

            <div>
              <Image src={beef} alt='' className= 'h-18 w-18 md:h-25    md:w-25 bg-white p-3 md:p-6 rounded-full '/>
            <div className="hidden md:block after:content-[''] after:block after:w-1 after:h-1 after:bg-red-500 after:rounded-full after:mx-auto 
              after:[box-shadow:0_10px_#ef4444,0_20px_#ef4444,0_30px_#ef4444,0_40px_#ef4444] pt-4">
              </div>
            </div>
            <div>
              <p className='font-bold capitalize text-xl'>Choose Burger</p>
              <p className='text-lg'>choose you favourite pizza or burger of your choice</p>
            </div>

          </div>

          <div className='flex space-x-10  flex-col md:flex-row '>
            
           <div>
             <Image src={bike1} alt='' className='h-18 w-18 md:h-25    md:w-25 bg-white p-3 md:p-6 rounded-full'/>
             <div className="hidden md:block after:content-[''] after:block after:w-1 after:h-1 after:bg-red-500 after:rounded-full after:mx-auto 
             after:[box-shadow:0_10px_#ef4444,0_20px_#ef4444,0_30px_#ef4444,0_40px_#ef4444] pt-4">
             </div>
           </div>

            <div>
              <p className='font-bold capitalize text-xl'>Delivery or Takeaway</p>
              <p className='text-lg'>we will deliver it in 15 min </p>
            </div>

          </div>

          <div className='flex space-x-10  flex-col md:flex-row '>
           <div>
             <Image src={burgers} alt='' className='h-18 w-18 md:h-25    md:w-25 bg-white p-3 md:p-6 rounded-full'/>
            
           </div>
            <div>
              <p className='font-bold capitalize text-xl'>Enjoy Burger</p>
              <p className='text-lg'>enjoy the hot and Delicious burger or pizza</p>
            </div>
          </div>




          </div>

        </div>

      </div>




<div className="w-full overflow-hidden leading-none relative">

  <svg
    viewBox="0 0 500 150"
    preserveAspectRatio="none"
    className="block w-full h-[100px] rotate-180"
  >
    <path
      d="M0.00,39.98 C150.00,150.00 349.92,-50.00 500.00,49.98 L500.00,150.00 L0.00,150.00 Z"
      fill="#FFEDB8"
    />
  </svg>
</div>



  <div className="w-full  pb-20 ">
      <div className=" text-center bg-red-500 md:pb-[25rem] pb-[10rem] relative"> 
          <h1 className={` text-[4rem] md:text-[13rem] tracking-wide font-bold text-yellow-300 ${myFont.className} pb-25 md:pb-0`}>Reviews </h1>
          {/* <h1 className={` text-[4rem]  md:text-[13rem] tracking-wide font-bold text-yellow-300 ${myFont.className}`}> Burgers</h1> */}
         
          <Image
          src={pizza}
        alt="pizza"
       className="absolute  right-10  top-0 md:right-105 md:top-5   z-10 w-[20rem] h-[20rem]    md:w-[40rem] md:h-[40rem] hover:rotate-180 transform-all duration-1000" 

      />

      
  <img
      src="https://eatsy.bold-themes.com/burger/wp-content/uploads/sites/2/2025/06/floating_fries_02.avif" // path to your burger image
        alt="finger chips "
        className="absolute top-3/4 left-0 -translate-x-2/3 -translate-y-1 z-10 size-[40rem] md:block hidden "
       />

      <div className="absolute top-1/2 right-0 -translate-y-1/2 overflow-hidden w-[400px] h-[500px] md:block hidden">
  <img
    src="https://eatsy.bold-themes.com/burger/wp-content/uploads/sites/2/2025/06/floating_fries_02.avif"
    alt="fries"
    className="translate-x-2/3"
  />
</div>



      </div>


     <div className='flex flex-col items-center  space-y-10  md:space-y-0'>    

      <div  className='flex  items-center space-x-15  md:space-x-30 flex-row px-6   md:px-0'>

         <div>
        <Image src={rew4} alt='' className='md:h-[25rem] md:w-[25rem] w-[6rem] h-[6rem]  rounded-full'/>
      </div>
      <p className={`text-yellow-300 text-3xl md:text-7xl font-bold ${my2Font.className}`}>"Pretty impressive! Legit<br/> taste of burgers!!!"</p>
      </div>


      <div className='flex  items-center space-x-15  md:space-x-30 flex-row  px-6  md:px-0 '>

        <p className={`text-yellow-300 text-3xl md:text-7xl font-bold ${my2Font.className}`}>"I don't remember a single <br/>mouthful  I didn't enjoy!"</p>
        <div>
        <Image src={rew3} alt='' className='md:h-[25rem] md:w-[25rem] w-[6rem] h-[6rem]   rounded-full'/>
      </div>
      

      </div>


      <div className='flex  items-center  space-x-15 md:space-x-30 flex-row  px-6 md:px-0'>
        <div>
        <Image src={rew2} alt='' className='md:h-[25rem] md:w-[25rem] w-[6rem] h-[6rem]   rounded-full'/>
      </div>
      <p className={`text-yellow-300 text-3xl md:text-7xl font-bold ${my2Font.className}`}>"Gomino burgers are some of the <br/> most tastiest burgers I've had!"</p>
      </div>


      <div className='flex  items-center space-x-15 md:space-x-30 flex-row  px-6  md:px-0'>
         <p className={`text-yellow-300 text-3xl md:text-7xl font-bold ${my2Font.className}`}>"Awesome service and <br/> even better pizza"</p>
        <div>
        <Image src={rew1} alt='' className='md:h-[25rem] md:w-[25rem] w-[6rem] h-[6rem]   rounded-full'/>
      </div>
     
      </div>



     </div>

      </div>
  





   


{/* free delivery 7 days part  */}
      







<div className="w-full overflow-hidden leading-none">
          <svg
            viewBox="0 0 500 150"
            preserveAspectRatio="none"
            className="relative block w-full h-[100px]"
          >
            <path
              d="M0.00,39.98 C150.00,150.00 349.92,-50.00 500.00,49.98 L500.00,150.00 L0.00,150.00 Z"
              // fill="black" 
              fill="#FFEDB8"
            />
          </svg>
        </div>


{/* contact less delivery part  */}
                  <div className='flex  flex-col md:flex-row  items-center justify-between px-20 bg-[#FFEDB8]   py-20 '>

                    <div className='  w-full space-y-2 md:space-y-6 pb-10'>
                      <h1 className={`${my2Font.className} text-red-500 font-bold text-4xl md:text-7xl `}>Contactless  delivery <br/> available</h1>
                      <div>
                        <p className='text-xl font-bold'>Order by phone</p>
                        <p className='text-red-500 font-bold text-2xl'>1-800-123-3-4567</p>
                      </div>
                      <div className='flex space-x-20 md:flex-row flex-col space-y-3' >
                        <div className='space-y-1'>
                          <p  className='text-xl font-bold '>Location</p>
                          <p className='text-lg'>60 East 65th Street,<br /> New York</p>
                        </div>

                        <div className='space-y-1'>
                          <p className='text-xl font-bold '>Delivery hours</p>
                          <p >Monday – Saturday :<br/>
                              11AM – 11PM</p>
                              <p className=''><span className='font-bold'> Sunday:</span><br/>
                              11AM – 08PM</p>
                        </div>

                        <div><p className='text-xl font-bold space-y-2'>Takeaway hours</p>
                        <p className=''><span className='font-bold'>  Monday – Saturday :<br/></span>
                    01PM – 10PM</p>
                        <p className=''>
                         <span className='font-bold'> Sunday :</span> Closed
                        </p>
                        
                        
                        </div>
                      </div>

                    </div>


                    <div className='w-[20rem] h-[30rem]   md:h-[35rem] md:w-[55rem] border-8 border-white rounded-4xl '>
                      <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3402.5500847857284!2d76.18734297549939!3d31.481560449058662!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391adb5aa39796f9%3A0x3d5e714694324768!2sIIIT%20Una%2C%20Academic%20Block!5e0!3m2!1sen!2sin!4v1755106510986!5m2!1sen!2sin" 
                       style={{ border: 0 ,borderRadius: '27px'}} 
                       width="100%"
                       height="100%" allowFullScreen={true}
                       loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>

                    </div>

                  </div>




    </div>
  );
}

export default Hero;
