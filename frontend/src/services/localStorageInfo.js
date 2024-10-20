
export const setUserInfo=(user)=>{
    localStorage.setItem('user',JSON.stringify(user));
}

export const getUserInfo = ()=>{
    return JSON.parse(localStorage.getItem('user'));
}