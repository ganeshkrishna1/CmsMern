
export const setUserInfo=(user)=>{
    localStorage.setItem('user',JSON.stringify(user));
}

export const getUserInfo = ()=>{
    return JSON.parse(localStorage.getItem('user'));
}

export const removeUserInfo = () =>{
    localStorage.removeItem('user');
}

export const getUserRole = () =>{
    return getUserInfo().role;
}

export const isOrganizer = () =>{
    return (getUserRole()==='organizer')? true:false;
}