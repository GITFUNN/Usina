import {axi, authApi} from "./useAxios";
import {Drink} from '../pages/MainPage';



export const createDrinkRequest = async(name:string, price:number)=>{
    await authApi.post(`/backend/post/`, {name, price});
};

export const getDrinkRequest = async(id:number)=>{
    const response = await axi.get(`/backend/get/${id}/`);
    return response.data;
};




export const getDrinksRequest = async()=>{
    try{
    const response = await axi.get(`/backend/get/`);
    return response.data;
    } catch(error)
    {
        throw new Error('error');
    }
};



export const editDrinkRequest = async(data : Drink)=>{
    const formdata = new FormData();
    formdata.append('name',data.name);
    formdata.append('price',data.price);
    await authApi.put(`/backend/edit/${data.id}/`, formdata);
};



export const deleteDrinkRequest = async(id:number)=>{
    await authApi.delete(`/backend/delete/${id}/`);
};

