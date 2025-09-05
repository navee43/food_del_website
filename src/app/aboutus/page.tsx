import React from 'react'
import localFont from 'next/font/local'
import burgerImage from '../../../public/images/beef.png'
import Image from 'next/image';
import bike from '../../../public/images/bike.png'
import shopping_bag from '../../../public/images/shopping-bag.png'
import Link from 'next/link';

  const myFont = localFont({
    src: "../../../public/fonts/4.otf"
  });

function AboutUsPage() {


  

  return (
   <div className="w-full">
  {/* Hero Section */}
  <div
    className="w-full h-[50vh] md:h-[70vh]"
    style={{
      backgroundImage:
        'url("https://eatsy.bold-themes.com/burger/wp-content/uploads/sites/2/2021/02/hero_about_us.jpg")',
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
      backgroundPosition: "center",
    }}
  >
    <div className="flex flex-col items-center justify-center h-full px-4 text-center">
      <h1
        className={`text-3xl md:text-7xl lg:text-[10rem] tracking-wide font-bold text-yellow-300 ${myFont.className}`}
      >
        Crazy Good Food
      </h1>
      <h2
        className={`text-lg md:text-3xl lg:text-5xl tracking-wide font-bold text-yellow-300 mt-4 ${myFont.className}`}
      >
        We strive to elevate the burger experience
      </h2>
    </div>
  </div>

  {/* SVG Divider */}
  <div className="w-full overflow-hidden leading-none relative">
    <svg
      viewBox="0 0 300 80"
      preserveAspectRatio="none"
      className="block w-full h-[100px] rotate-180"
    >
      <path
        d="M0.00,39.98 C150.00,150.00 349.92,-50.00 500.00,49.98 L500.00,150.00 L0.00,150.00 Z"
        fill="black"
      />
    </svg>
  </div>

  {/* Flipping Since Section */}
  <div className="flex flex-col items-center justify-center w-full pb-10 px-4 h-screen">
    <h1
      className={`text-3xl sm:text-5xl md:text-7xl lg:text-[7rem] tracking-wide font-bold text-yellow-300 text-center ${myFont.className}`}
    >
      Flipping Since ‘2004
    </h1>

    {/* Features Grid */}
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-10 md:px-20 px-3">
      {/* Card */}
      <div className="bg-white flex flex-col items-center p-8 space-y-4 rounded-3xl shadow-md py-10">
        <Image src={burgerImage} alt="" className="w-16 h-16" />
        <div className="text-center">
          <p className="font-semibold text-xl">Unique Taste</p>
          <p>A burger is more than just a meal, it is a wish fulfilled.</p>
        </div>
      </div>

      <div className="bg-white flex flex-col items-center p-8 space-y-4 rounded-3xl shadow-md">
        <Image src={shopping_bag} alt="" className="w-16 h-16" />
        <div className="text-center">
          <p className="font-semibold text-xl">Quality Service</p>
          <p>Fresh ingredients and quick delivery right at your doorstep.</p>
        </div>
      </div>

      <div className="bg-white flex flex-col items-center p-8 space-y-4 rounded-3xl shadow-md">
        <Image src={bike} alt="" className="w-16 h-16" />
        <div className="text-center">
          <p className="font-semibold text-xl">Fast Delivery</p>
          <p>We bring your cravings faster than you can imagine.</p>
        </div>
      </div>
    </div>
  </div>

  {/* About Us Section */}
  <div
    className="w-full bg-cover bg-center"
    style={{
      backgroundImage:
        'url("https://eatsy.bold-themes.com/burger/wp-content/uploads/sites/2/2021/02/background_06-scaled-1.jpg")',
    }}
  >
    {/* Top SVG */}
    <div className="overflow-hidden leading-none relative">
      <svg
        viewBox="0 0 500 150"
        preserveAspectRatio="none"
        className="block w-full h-[100px] rotate-180"
      >
        <path
          d="M0.00,39.98 C150.00,150.00 349.92,-50.00 500.00,49.98 L500.00,150.00 L0.00,150.00 Z"
          fill="#fb2c36"
        />
      </svg>
    </div>

    <div className="flex flex-col items-center justify-center px-4">
      <h1
        className={`text-3xl sm:text-6xl md:text-8xl lg:text-[10rem] tracking-wide font-extrabold text-red-700 text-center ${myFont.className}`}
      >
        About Us
      </h1>

      {/* First Content Block */}
      <div className="bg-white flex flex-col md:flex-row items-center gap-10 md:gap-20 rounded-3xl max-w-7xl w-full min-h-[70vh] md:min-h-screen p-6 sm:p-10">
        <div className="w-full md:w-1/2">
          <Image
            src="https://eatsy.bold-themes.com/burger/wp-content/uploads/sites/2/2021/02/inner_image_02.jpg"
            alt="Our Story"
            className="rounded-3xl w-full"
          />
        </div>
        <div className="w-full md:w-1/2 text-center md:text-left">
          <p className="text-3xl sm:text-5xl md:text-7xl font-bold text-red-700">
            Our Story
          </p>
          <p className="font-serif mt-4 text-sm sm:text-base md:text-lg">
            At Gomino, food isn’t just about eating—it’s about experiences,
            comfort, and connection. We started with a simple idea: bringing
            fresh, mouth-watering meals straight to your doorstep without
            compromising on taste or quality.
          </p>
        </div>
      </div>

      {/* Second Content Block */}
      <div className="bg-white flex flex-col md:flex-row items-center gap-10 md:gap-20 rounded-3xl max-w-7xl w-full min-h-[70vh] md:min-h-screen p-6 sm:p-10 mt-20">
        <div className="w-full md:w-1/2">
          <Image
            src="https://res.cloudinary.com/dmlbubaom/image/upload/v1756063093/gomino_bags_t9blpj.png"
            alt="Delivery and Takeaways"
            className="rounded-3xl w-full"
          />
        </div>
        <div className="w-full md:w-1/2 text-center md:text-left">
          <p className="text-3xl sm:text-5xl md:text-6xl font-bold text-red-700">
            Delivery & Takeaways
          </p>
          <p className="font-serif mt-4 text-sm sm:text-base md:text-lg">
            We’ve made things doubly easy for you by offering takeaway options
            as well as door-to-door delivery every day. What more could you need
            when you have meat covered in cheese nestled between bread?
          </p>
        </div>
      </div>

      {/* Back to Home Button */}
      <Link
        href="/"
        className="bg-red-500 text-center rounded-3xl px-6 py-3 my-10 text-white font-bold hover:scale-105 transition-transform duration-500 border-2 border-transparent hover:border-white"
      >
        Back to Home
      </Link>
    </div>
  </div>
</div>

  )
}

export default AboutUsPage