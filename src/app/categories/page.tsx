// 'use client'
// import { useProfile } from '@/components/userProfile'
// import { profile } from 'console';
// import React, { useState } from 'react'
// import UserTabs from '@/components/layout/userTabs';
// import axios from 'axios';

// function CategoriesPage() {

//             const   { loading:profileLoading , data:profileData} = useProfile(); 

//            const [newCategory , setNewCategory] = useState("")

            
//                     if(profileLoading){
//                         return 'loading user profile ...'
//                     }

//                     if(!profileData.data.userInfo.admin){
//                         return "not an admin";
//                     }
//   const handleCategorySubmit = async(e:any)=>{
//     e.preventDefault();
//     try {
//         const response = await axios.post('/api/categories' , {newCategory})
//         if(response.status===200){
//             console.log("ok")
//         }
        
//     } catch (error) {
//         console.error("error while creating category",error)
        
//     }

//   }



//   return (
//     <div className='bg-red-500 w-full h-screen flex flex-col items-center  '>
//         <UserTabs admin={true}/>


//         <form onSubmit={handleCategorySubmit} className='pt-10 flex flex-col items-center'>
//             <label htmlFor="">new category </label>
//             <input type="text" className='w-lg bg-white p-2 rounded-3xl ' placeholder="category" 
//              value={newCategory}
//              onChange={(e)=>(setNewCategory(e.target.value))}
//              />
//             <button type='submit' className='bg-blue-500 p-2 w-20 rounded-2xl mt-10'> create</button>

//         </form>
       


//     </div>
//   )
// }

// export default CategoriesPage