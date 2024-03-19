import {axi, authApi} from "./useAxios";
import {Drink, Category} from '../pages/MainPage';


export const createCategoryRequest = async(name:string)=>{
    await authApi.post(`/backend/postC/`, {name});
};

export const createDrinkRequest = async(name:string, price:number)=>{
    await authApi.post(`/backend/post/`, {name, price});
};

export const getDrinkRequest = async(id:number)=>{
    const response = await axi.get(`/backend/get/${id}/`);
    return response.data;
};

export const getCategoryRequest = async(id:number)=>{
    const response = await axi.get(`/backend/getC/${id}/`);
    return response.data;
};

export const getCategoriesRequest = async()=>{
    try{
    const response = await axi.get(`/backend/getC/`);
    return response.data;
    } catch(error)
    {
        throw new Error('error');
    }
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

export const editCategoryRequest = async(data : Category)=>{
    const formdata = new FormData();
    formdata.append('name',data.name);
    await authApi.post(`/backend/editC/${data.id}`, formdata);
};

export const editDrinkRequest = async(data : Drink)=>{
    const formdata = new FormData();
    formdata.append('name',data.name);
    formdata.append('price',data.price);
    await authApi.post(`/backend/edit/${data.id}`, formdata);
};

export const deleteCategoryRequest = async(id:number)=>{
    await authApi.post(`/backend/deleteC/${id}`);
};

export const deleteDrinkRequest = async(id:number)=>{
    await authApi.post(`/backend/delete/${id}`);
};

