import { Dimensions } from 'react-native';
const { width, height } = Dimensions.get("window");

export const SIZES={
    width,
    height,

    
    font9: 9,
    font10: 10,
    font12: 12,
    font14: 14,
    font16: 16,
    font18: 18,
    font20: 20,
    font22: 22,
    font24: 24,
    font30:30
}

export const COLORS={
    Primary:'#fac33e' , 
    Secondary:'#03456e',
    white:'#fff',
    whiteBG:'#FFFCFC',
    blackT:'#222222',
    blackOg:'#000000',
    gray:'rgba(200, 200, 200, 0.2)',
    grayD:'rgba(130, 130, 129, 1)',
    placeholder:'rgba(34, 34, 34, 0.5)',
    borderC:'rgba(0, 0, 0, 0.8)',
    borderC2:'#03456e',
    red:'#FF0000',
    Active:'#9BE81F',
    Inactive:'#EC3D3D',
    //uv
    subtext:'#263238',
}

export const FONTS={
        Primary :'Helvetica',
        PrimaryBold :'Helvetica-Bold',
        Secondary:'Helvetica',
        SecondaryBold:'Helvetica-Bold',
}

export const Theme={SIZES,COLORS,FONTS};