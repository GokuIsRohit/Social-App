import { GoogleSignin } from '@react-native-google-signin/google-signin';

export const ConfigureGoogleSign=async()=>{
    GoogleSignin.configure({
        // webClientId: "4734518046878-at8vj35e4rince436cqfapic1qmcmvb4.apps.googleusercontent.com",// my clientID
        offlineAccess: false,
         androidClientId: "4734518046878-at8vj35e4rince436cqfapic1qmcmvb4.apps.googleusercontent.com"
    });
}