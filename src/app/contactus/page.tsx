"use client"
 
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import React from 'react'
import localFont from 'next/font/local'
import { Button } from "@/components/ui/button"
import { CheckCircle2 ,X } from "lucide-react"
import {toast} from 'sonner'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

import { sendFeedbackSchema } from "@/Schema/sendFeedBackSchema"
import { sendFeedBackEmail } from "@/helper/sendFeedBackEmail"





  const myFont = localFont({
    src: "../../../public/fonts/4.otf"
  });

function ContactPage() {

 const form = useForm<z.infer<typeof sendFeedbackSchema>>({
    resolver: zodResolver(sendFeedbackSchema),
    defaultValues: {
      Name: "",
      Email:"",
      comment:"",
      subject:""
      
    },
  })
  async function onSubmit(values: z.infer<typeof sendFeedbackSchema>) {
 const emailResponse = await sendFeedBackEmail(values.Email , values.Name , values.subject , values.comment);
   

   if(emailResponse.success){ 
    toast("email sent", {
            description: "mail has been sent  successfully",
            icon: <CheckCircle2 className="text-white" />,
            style: {
              background:
               "linear-gradient(135deg, #0a0a0a 0%, #2c2c2c 60%, #f5f5dc 100%)"
               ,
              color: "white",
              borderRadius: "1rem", // rounded-xl
              boxShadow:
                "0 8px 16px rgba(99, 102, 241, 0.5), 0 4px 6px rgba(139, 92, 246, 0.4)", 
              padding: "1rem 1.25rem",
              fontWeight: "600",
              fontSize: "1rem",
              // border:"10px",
              gap:"1rem"
            },
            className: "backdrop-blur-md", 
          })
   }
  else {
     toast("something went wrong", {
                description: "email not sent",
                icon: <X className="text-white" />,
                style: {
                  background:
                   "linear-gradient(135deg, #0a0a0a 0%, #2c2c2c 60%, #f5f5dc 100%)"
    
                   ,
    
    
                  color: "white",
                  borderRadius: "1rem", // rounded-xl
                  boxShadow:
                    "0 8px 16px rgba(99, 102, 241, 0.5), 0 4px 6px rgba(139, 92, 246, 0.4)", 
                  padding: "1rem 1.25rem",
                  fontWeight: "600",
                  fontSize: "1rem",
                  // border:"10px",
                  gap:"1rem"
                },
                className: "backdrop-blur-md", 
              })
   }
  
  }



return (
  <div className="w-full bg-amber-100">
  {/* Hero Section */}
  <div
    className="w-full h-[50vh] md:h-[70vh] flex items-center justify-center"
    style={{
      backgroundImage:
        'url("https://images.unsplash.com/photo-1662945863417-2a6cca902d58?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0")',
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
      backgroundPosition: "center",
    }}
  >
    <div className="flex flex-col items-center justify-center px-4 text-center">
      <h1
        className={`text-3xl sm:text-5xl md:text-8xl lg:text-[10rem] tracking-wide font-bold text-yellow-300 ${myFont.className}`}
      >
        Let’s Get Together
      </h1>
      <h2
        className={`text-lg sm:text-2xl md:text-4xl tracking-wide font-bold text-yellow-300 mt-4 ${myFont.className}`}
      >
        We strive to elevate the food experience
      </h2>
    </div>
  
  </div>
    <div className="w-full overflow-hidden leading-none relative">

  <svg
    viewBox="0 0 400 80"
    preserveAspectRatio="none"
    className="block w-full h-[100px] rotate-180"
  >
    <path
      d="M0.00,39.98 C150.00,150.00 349.92,-50.00 500.00,49.98 L500.00,150.00 L0.00,150.00 Z"
      fill="black"
    />
  </svg>
</div>

  {/* Contact Form Section */}
  <div className="w-full bg-amber-100 py-12 px-4 sm:px-8 lg:px-20 flex items-center justify-center">
    <div className="flex flex-col items-center justify-center py-10 px-4 sm:px-10 bg-white rounded-2xl shadow-md md:w-5xl">
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-red-900 mb-10 text-center">
        Contact Us!
      </h1>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full max-w-2xl flex flex-col"
        >
          {/* Name + Email */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="Name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="Email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Subject */}
          <FormField
            control={form.control}
            name="subject"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Subject</FormLabel>
                <FormControl>
                  <Input placeholder="Subject" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Comment */}
          <FormField
            control={form.control}
            name="comment"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Comment</FormLabel>
                <FormControl>
                  <textarea
                    {...field}
                    rows={5}
                    placeholder="Comment"
                    className="border rounded-2xl px-5 py-3 w-full outline-none focus:ring-2 focus:ring-red-400"
                  ></textarea>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-red-500 hover:bg-red-600 text-white px-8 sm:px-10 py-3 rounded-full w-max self-center font-semibold transition"
          >
            Send
          </button>
        </form>
      </Form>

      {/* Info Section */}
      <div className="text-center mt-12 max-w-3xl text-red-900 px-4">
        <h2 className="text-lg sm:text-xl font-semibold">
          Are you looking for help to place an order or have questions about an existing order?
        </h2>
        <p className="text-gray-700 mt-3 text-sm sm:text-base">
          Fill out the contact form above to get in touch with us! <br />
          You can also check out our FAQ section, the answer might already be there!
        </p>
        <h3 className="text-base sm:text-lg font-bold mt-6">Otherwise…</h3>
        <p className="text-xs sm:text-sm text-gray-600">
          Please note that <span className="font-semibold">gomino.com</span> is the ONLY official
          website of Gomino Eats. Be aware of phishing scams and fraudulent outreach.
        </p>
      </div>
    </div>
  </div>
</div>

  );
}

export default ContactPage