import axios from "axios"

const favourApi = {
    addToFavour: async (id)=>{
        const res = await axios.post(`favour/add-to-favour?productId=`+id);
        return res.data
    },

    GetItemInFavour: async ()=>{
        const res = await axios.get(`favour`);
        return res.data
    },

    deleteItemFavour: async (id)=>{
        const res = await axios.post(`favour/delete-favour?id=`+id)
        return res.data
    }
}

export default favourApi