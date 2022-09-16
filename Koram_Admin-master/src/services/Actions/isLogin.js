 const isLogin = (res)=>{
    return{
        type:"login",
        data: res
    }
}

export default isLogin