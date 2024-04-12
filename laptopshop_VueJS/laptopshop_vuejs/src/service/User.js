
import axios from "axios"

const userApi = {

    signUp: async (data)=>{
        const res = await axios.post('register',data) 
        return res.data
    },
    verify: async (data)=>{
        const res = await axios.get('register/verify?token='+data) 
        return res.data
    },

    login: async(data)=>{
        const res = await axios.post('login',data) 
        return res.data
    },

    loginGG: async ()=>{
        const res = await axios.post('loginCode',data1) 
        return res.data
    },

    logout: async (token)=>{
        const res = await axios.get("logout?token="+token)
        return res.data
    },

    getInfo: async (accessToken)=>{
        const res = await axios.post('getInfo',accessToken) 
        return res.data
    },

    getPurchaseHistory: async (status)=>{
        const res = await axios.get('purchase-history?status='+status);
        return res.data
    },

    postPurchaseHistory: async (id,status)=>{
        const res = await axios.post(`purchase-history/cancelled?id=`+id+`&status=`+status)
        return res.data
    },

    postSendMailCancelled: async (codeOrder)=>{
        const res = await axios.post(`purchase-history/send-mail-cancelled?codeOrder=${codeOrder}`)
        return res.data
    },

    findByRangeDay: async (data)=>{
        const res = await axios.post(`purchase-history/range-day`,data)
        return res.data
    },

    getTotalOrderReceived: async ()=>{
        const res = await axios.get('purchase-history/totalOrder');
        return res.data
    },

    postProfile: async (data)=>{
        const res = await axios.post('user/profile', data)
        return res.data
    },

    getProfile: async ()=>{
        const res = await axios.get('user/profile')
        return res.data
    },

    postChangePW: async (oldPW, newPW)=>{
        const res = await axios.post('user/profile/change-password?oldPW='+oldPW+'&newPW='+newPW)
        return res.data
    },

    // Admin
    getListUserAdmin: async (page, fullname,sex,address,email,stateUser,authType)=>{
        const res = await axios.get('admin/user',
            {params: {fullname:fullname,sex:sex,address:address,
                    email:email,stateUser:stateUser,authType:authType,page:page}}) 
        return res.data
    },

    getListAdmin: async (page, fullname,sex,address,email,stateUser,authType)=>{
        const res = await axios.get('admin/user/getAdmin',
            {params: {fullname:fullname,sex:sex,address:address,
                    email:email,stateUser:stateUser,authType:authType,page:page}}) 
        return res.data
    },

    addUser: async (data)=>{
        const res = await axios.post("admin/user/add",data)
        return res.data
    },

    getEditUser: async (id)=>{
        const res = await axios.get("admin/user/edit/"+id)
        return res.data
    },

    postEditUser: async (data)=>{
        const res = await axios.post("admin/user/edit",data)
        return res.data
    },

    lockUser: async (id)=>{
        const res = await axios.post("admin/user/lock?id="+id)
        return res.data
    },

    unlockUser: async (id)=>{
        const res = await axios.post("admin/user/unlock?id="+id)
        return res.data
    },

    deleteUser: async (id)=>{
        const res = await axios.post("admin/user/delete?id="+id)
        return res.data
    },
}

export default userApi;