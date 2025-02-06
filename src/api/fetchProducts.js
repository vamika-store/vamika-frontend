import axios from "axios";
import { API_BASE_URL, API_URLS } from "./constant"


export const getAllProducts = async (id, typeId) => {

    if (!id) {
        console.error('Error: categoryId is required');
        return;
    }

    let url = API_BASE_URL + API_URLS.GET_PRODUCTS + `?categoryId=${id}`;
    if(typeId){
        url += `&typeId=${typeId}`;
    }

    console.log(`Fetching products with URL: ${url}`);

    try{
        const result = await axios(url,{
            method:"GET"
        });
        return result?.data;

    }
    catch(err){
        console.error('AxiosError:',err);
    }
}

export const getProductBySlug = async (slug) => {
    if (!slug) {
        console.error('Error: slug is required');
        return;
    }
    const url = API_BASE_URL + API_URLS.GET_PRODUCTS + `?slug=${slug}`;

    console.log(`Fetching product with URL: ${url}`);

    try{
        const result = await axios(url,{
            method:"GET",
        });
        return result?.data?.[0];
    }
    catch(err){
        console.error('AxiosError:', err);
    }
}
