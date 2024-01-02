import { UserDetails, UserGmailDetails } from "../Action/UserAction"

const initialstate={
    email:"",
    familyName:"",
    givenName:"",
    G_Emailid:"",
    name:"",
    photo:""
}

export const UserReducer=(state = initialstate, action)=>{
    switch(action.type){
        case UserGmailDetails:
            return{
                ...state,
                email:action.payload.email,
                familyName:action.payload.familyName,
                givenName:action.payload.givenName,
                G_Emailid:action.payload.G_Emailid,
                name:action.payload.name,
                photo:action.payload.photo,
            }
            default:
                return state;
    }
}