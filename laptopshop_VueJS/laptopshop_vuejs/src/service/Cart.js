import axios from "axios"

const cartApi = {
    addToCart: async (cart)=>{
        const res = await axios.post(`cart/add-to-cart?productId=`+cart.productId+`&num=`+cart.num);
        return res.data
    },

    GetItemInCart: async ()=>{
        const res = await axios.get(`cart`);
        return res.data
    },

    editItemCart: async (id,num)=>{
        const res = await axios.get(`cart/edit-cart/${id}/${num}`)
        return res.data
    },

    deleteItemCart: async (id)=>{
        const res = await axios.get(`cart/delete-cart/${id}`)
        return res.data
    },

    clearCart: async ()=>{
        const res = await axios.get(`cart/clear-cart`)
        return res.data
    },
}

export default cartApi