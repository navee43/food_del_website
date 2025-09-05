'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { signIn } from 'next-auth/react';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signInSchema } from "@/Schema/signInSchema"
import {toast }  from 'sonner'
import googleimg from '../../../../public/images/google.png'
import Image from 'next/image';

import localFont from 'next/font/local'

  const myFont = localFont({
    src: "../../../../public/fonts/1.ttf"
  });


export default function SignInForm() {
  const router = useRouter();

  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      identifier: '',
      password: '',
    },
  });


  const onSubmit = async (data: z.infer<typeof signInSchema>) => {
    const result = await signIn('credentials', {
      redirect: false,
      identifier: data.identifier,
      password: data.password,
    });

    if (result?.error) {
      if (result.error === 'CredentialsSignin') {
        toast.error("incorrect username or password")
      } else {  
        toast.error(result.error)
      }
    }
    if (result?.url) {
      router.replace('/');
    }
  };

  return (
  
     <div className="flex flex-col justify-center items-center w-full h-screen"
      style={{
          backgroundImage:
            'url("https://res.cloudinary.com/dmlbubaom/image/upload/v1756142845/delicious-burger-studio_dgk6lz.jpg")',
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
    >
      
      <div className="w-full max-w-md p-8 space-y-8 backdrop-blur-xl rounded-lg shadow-md ">
        <div className="text-center">
          <h1 className={`text-4xl font-extrabold tracking-tight lg:text-6xl mb-6 text-white ${myFont.className}`}>
            Welcome Back
          </h1>
          <p className="mb-4 text-white font-bold text-[20px]">Sign in </p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex flex-col justify-center items-center">
            <FormField
              name="identifier"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-white font-bold'>Email/Username</FormLabel>
                  <Input {...field}  className='w-[300px] text-white font-semibold'/>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="password"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-white font-bold'>Password</FormLabel>
                  <Input type="password" {...field} className='w-[300px] text-white ' />
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className='w-[300px] bg-white text-black hover:bg-gray-400 hover:border-2 border-white hover:scale-103 transition-transform duration-500 ' type="submit">Sign In</Button>
             <button type="button" onClick={() => signIn('google', {callbackUrl: '/'})}
                className="flex gap-4 justify-center border-2 border-black rounded-4xl p-2   hover:scale-103 transition-transform duration-500
                 bg-white font-semibold">
          <Image src={googleimg} alt={''} width={24} height={24} />
          Login with google
        </button>
          </form>
         


        </Form>
        <div className="text-center mt-4">
          <p className='text-white font-semibold'>
            Not a member yet ?{' '}
            <Link href="/signup" className="text-red-500 hover:text-green-500">
              Sign up
            </Link>
          </p>
        </div>
      </div>
        <div className="w-full overflow-hidden leading-none relative">
  {/* <svg
    viewBox="0 0 300 80"
    preserveAspectRatio="none"
    className="block w-full h-[100px] rotate-180"
  >
    <path
      d="M0.00,39.98 C150.00,150.00 349.92,-50.00 500.00,49.98 L500.00,150.00 L0.00,150.00 Z"
      fill="black"
    />
  </svg> */}
           </div>

      
    </div>
   
  );
}