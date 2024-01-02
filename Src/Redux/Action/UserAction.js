export const UserDetails="UserDetails";
export const UserGmailDetails="UserGmailDetails";

export const HandelUserDetails=(props)=>({
    type:UserDetails,
    payload:props
})

export const HandelUserGoogleDetails=(props)=>({
    type:UserGmailDetails,
    payload:props
})