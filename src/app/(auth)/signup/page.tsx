'use client';

import { ApiResponse } from '@/types/Response';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import * as z from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { toast } from "sonner"
import {  useDebouncedCallback } from 'use-debounce';
import axios, { AxiosError } from 'axios';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { signUpSchema } from '@/Schema/signUpSchema';

import localFont from 'next/font/local'

  const myFont = localFont({
    src: "../../../../public/fonts/1.ttf"
  });


export default function SignUpForm() {
  const [username, setUsername] = useState('');
  const [usernameMessage, setUsernameMessage] = useState('');
  const [isCheckingUsername, setIsCheckingUsername] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const debouncedUsername = useDebouncedCallback(setUsername, 300);

  const router = useRouter();
  

  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
    },
  });

  useEffect(() => {
    const checkUsernameUnique = async () => {
      if (username) {
        setIsCheckingUsername(true);
        setUsernameMessage(''); // Reset message
        try {
          const response = await axios.get<ApiResponse>(
            `/api/check-username-unique?username=${username}`
          );
          setUsernameMessage(response.data.message);
        } catch (error) {
          const axiosError = error as AxiosError<ApiResponse>;
          setUsernameMessage(
            axiosError.response?.data.message ?? 'Error checking username'
          );
        } finally {
          setIsCheckingUsername(false);
        }
      }
    };
    checkUsernameUnique();
  }, [username]);

  const onSubmit = async (data: z.infer<typeof signUpSchema>) => {
    setIsSubmitting(true);
    try {
      console.log('the data is ' , data)
      const response = await axios.post<ApiResponse>('/api/sign-up', data);
      console.log(response);


     toast(
  <div>
    <h4 className="text-sm font-semibold">Success</h4>
    <p className="text-sm text-gray-500">{response.data.message}</p>
  </div>
)


      router.replace(`/verify/${username}`);

      setIsSubmitting(false);
    } catch (error) {
      console.error('Error during sign-up:', error);

      const axiosError = error as AxiosError<ApiResponse>;

    
      const errorMessage = axiosError.response?.data.message;
    

  toast(
  <div>
    <h4 className="text-sm font-semibold">Success</h4>
    <p className="text-sm text-gray-500">{errorMessage}</p>
  </div>
)


      setIsSubmitting(false);
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
     
      <div className="w-full max-w-md p-8 space-y-8 backdrop-blur-xl rounded-lg shadow-md">
        <div className="text-center">
          <h1 className={`text-4xl text-white font-extrabold tracking-tight lg:text-6xl mb-6 ${myFont.className}`}>
            Join Us
          </h1>
          <p className="mb-4 text-white font-bold capitalize text-[18px]">Sign up to start your food adventure</p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex justify-center items-center flex-col">
            <FormField
              name="username"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='font-bold text-white'>Username</FormLabel>
                  <Input
                    {...field}
                    onChange={(e:React.ChangeEvent<HTMLInputElement>) => {
                      field.onChange(e);
                     debouncedUsername(e.target.value);
                    
                    }}
                    className='text-white font-semibold w-[300px]'
                  />
                  {isCheckingUsername && <Loader2 className="animate-spin text-white" />}
                  {!isCheckingUsername && usernameMessage && (
                    <p
                      className={`text-sm font-bold ${
                        usernameMessage === 'Username is unique'
                          ? 'text-green-500'
                          : 'text-red-500'
                      }`}
                    >
                     
                      {usernameMessage}
                    </p>
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField 
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='font-bold text-white '>Email</FormLabel>
                  <Input {...field} name="email" className='w-[300px] text-white' />
                  <p className='text-muted text-white text-sm '>We will send you a verification code</p>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="password"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='font-bold text-white'>Password</FormLabel>
                  <Input type="password" {...field} name="password"  className='w-[300px] text-white'/>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className='w-[300px] bg-white hover:bg-gray-200 text-black hover:scale-103 transition-transform duration-500' disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Please wait
                </>
              ) : (
                'Sign Up'
              )}
            </Button>
          </form>
        </Form>
        <div className="text-center mt-4">
          <p className='text-white font-semibold'>
            Already a member ?{' '}
            <Link href="/signin" className="text-green-500 hover:text-red-500">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
