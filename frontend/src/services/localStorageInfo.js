
export const setUserInfo=(user)=>{
    localStorage.setItem('user',user);
}

export const getUserInfo = ()=>{
    return localStorage.getItem('user');
}