import {axi} from "./useAxios";

export const loginRequest = async (email: string, password: string) =>{
   const response = await axi.post("/backend/login/", {email, password});
   return response;
}   