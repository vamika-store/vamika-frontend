import { getProductBySlug } from '../api/fetchProducts';
import { setLoading } from '../store/features/common';
import store from '../store/store';

export const loadProductBySlug = async ({params}) => {

    try{
        store.dispatch(setLoading(true));
        if (!params?.slug){
            throw new Error('slug is missing');
            
        }
        const product = await getProductBySlug(params?.slug);
        if (!product){
            throw new Error('Product not found')
        }
        store.dispatch(setLoading(false));
        return {product};
    }
    catch(err){
        console.error('Error loading product:', err)
        store.dispatch(setLoading(false));
        return{ product: null };

    }
}