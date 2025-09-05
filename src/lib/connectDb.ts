

import mongoose from "mongoose";


type ConnectionObject = {
    isConnected? :number
}
//is ka type is connected hota h and ye value optional hoti h jaruri nahi ye humesa yahi aye 

const connection : ConnectionObject = {}
// here we created a variable named connection and its type is connection object initialy ye empty hi rahega 

    async function connectDb():Promise<void>{
        // here above jb database se connect hoga to kuch to return hoga to vo promis hot h and usko handle karne ki liye
        // ye kiya and iska type void likha means kuch bhi ho skta h 
        //here pehle check karenge ki connection already bana hua h ki na 
        if(connection.isConnected){
            console.log("already connected to database ")
            return  
        }
 //and agar connected na h to connect karo 
        try {
            // console.log(process.env.MONGODB_URI)
const db = await mongoose.connect(`${process.env.MONGODB_URI}/${process.env.DATABASE_NAME}`)
          connection.isConnected =   db.connections[0].readyState
          console.log("DB connected successfully ")
        } catch (error) {
            console.log("database connection error")
            process.exit(1)
        }


    }
    export default connectDb