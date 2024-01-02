import { Alert, Image, PermissionsAndroid, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import CustomeButton from '../../Componets/CustomeButton';
import RNFetchBlob from 'react-native-fetch-blob'
import { COLORS, FONTS, SIZES } from '../../Constants/Theme';
import { GetFileExtension } from '../../Helpers/GetFileExtension';

const DowmloadImage = () => {

    const REMOTE_IMAGE_PATH="https://static.scientificamerican.com/sciam/cache/file/EAF12335-B807-4021-9AC95BBA8BEE7C8D_source.jpg"

    const checkPermission=async()=>{
       try{
        const granted= await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
            {
            title: 'Storage Permission Required',
            message:
              'App needs access to your storage to download Photos',
        })
        if(granted == PermissionsAndroid.RESULTS.GRANTED){
                HandleDownload();
        }else{
            Alert.alert('Storage Permission Not Granted');
        }
       }catch(error){
        console.log(error)
       }
    }

    const HandleDownload=async()=>{
        try{
            let date = new Date();
            let Image_URL= REMOTE_IMAGE_PATH;
            let ext = GetFileExtension(Image_URL);
            ext = '.' + ext[0];
            const{config,fs}=RNFetchBlob;
            let PictureDir = fs.dirs.PictureDir;
            let options = {
              fileCache: true,
              addAndroidDownloads: {
                // Related to the Android only
                useDownloadManager: true,
                notification: true,
                path:
                  PictureDir +
                  '/image_' + 
                  Math.floor(date.getTime() + date.getSeconds() / 2) +
                  ext,
                description: 'Image',
              },
            };
            config(options)
              .fetch('GET', Image_URL)
              .then(res => {
                // Showing alert after successful downloading
                console.log('res -> ', JSON.stringify(res));
                Alert.alert('Image Downloaded Successfully.');
              });
          
        }catch(error){
            console.log(error)
        }
    }

 

  return (
    <View style={styles.container}>
      <View style={{ alignItems: 'center' }}>
        <Text style={{ fontSize:SIZES.font20,fontStyle:FONTS.SecondaryBold, textAlign: 'center',color:COLORS.Secondary }}>
            Image Download 
        </Text>
      </View>
      <View style={{padding:20}}>
      <Image
        source={{
          uri: REMOTE_IMAGE_PATH,
        }}
        style={{
          width: '100%',
          height: 200,
          resizeMode: 'cover',
          margin: 5
        }}
        />
      </View>
      <View style={{marginVertical:20,flex:1,marginHorizontal:40}}>
        <CustomeButton
        Label={"Download Image"}
        onPress={()=> checkPermission()}
        />
      </View>
    </View>
  );
};



export default DowmloadImage

const styles = StyleSheet.create({
    container: {
      flex: 1,
     // justifyContent: 'center',
      paddingTop:30
    },
    button: {
      width: '70%',
      padding: 10,
      margin: 10,
      height:50
    },
    text: {
      color: '#fff',
      fontSize: 20,
      textAlign: 'center',
      padding: 5,
    },
  });
