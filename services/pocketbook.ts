import axios from "axios";
import {useAuthStore} from "../states/index";
import { useUser } from "../hooks/userUser";

export const pocketBookApi = async (data:any) =>{
        console.log("Enter in API pcket book")
        const user = useUser()
        if(!user) return;
        
        console.log("Enter in Pocket book creation")
        console.log(user)
        console.log(`https://autoguardapi.leogroup.tech/api/PocketBook/CreatePocketBookEntry`)
        try {
                const res = await axios.post(`https://autoguardapi.leogroup.tech/api/PocketBook/CreatePocketBookEntry`,{params:{
            
                       data
                      
                }});
                console.log("Creation pocket book", res.data);
                console.log("Creation pocket book status", res.status);
        
        } catch (error) {
            console.log("Error in create pocket book: ", error)    
        }

    }