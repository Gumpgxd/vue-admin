import request from "../request";

const getUser = async () => {
    return await request.get('/users/verify',{headers:{'showLoading':false}})
}

const Login = async (params:any) => {
    return await request.post<string>('/users/login',JSON.stringify(params))
}


export {
    Login,
    getUser,
}