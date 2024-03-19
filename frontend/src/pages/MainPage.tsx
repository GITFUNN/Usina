import { createDrinkRequest, getDrinkRequest, 
    getDrinksRequest, editDrinkRequest, deleteDrinkRequest} from "../api/general"
import { useState} from "react";
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Toaster, toast } from 'react-hot-toast';



export interface Drink{
    name:string,
    price:number,
    id:number,
}
export interface Category{
    name:string,   
    id:number,
}



const MainPage = ()=>{
    const queryClient  = useQueryClient();
    const[name, setName] = useState("");
    const[price, setPrice] = useState(0);
    const[show, setShow] = useState(false);



    const {data, error} = useQuery({
        queryKey:['drink'],
         queryFn: getDrinksRequest
    });

    const createMutation = useMutation({
        mutationFn: () => createDrinkRequest(name, price),
        onSuccess: () => {
          setShow(false);
        },
    
        onError: (error) => {
          if (typeof error === 'string') {
            console.log(error);
          };
        },
      });

      const deleteDrinkMutation = useMutation({
        mutationFn:deleteDrinkRequest,
        onSuccess: ()=>{
          queryClient.invalidateQueries(["drink"]) 
          toast.success("Borrado!");
        },
        onError: (error) => {
          console.error(error);
        },
      })

      if (error instanceof Error) return <>{toast.error(error.message)}</>

    return(
        <>
        <div className="min-h-screen bg-black text-xl">
            <div className="flex flex-col font-semibold items-center py-8">
                <div className=" flex h-14 border w-full rounded-xl bg-white items-center md:w-5/12" >
                    <p className=" px-3">
                    Cervezas
                    </p>
                </div>
            </div>
        </div>
        </>
    )
}


export default MainPage