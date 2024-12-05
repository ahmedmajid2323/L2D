import { StyleSheet, Text, View, Image, ScrollView, Pressable } from 'react-native'
import React, { useRef, useState } from 'react'
import LinearGradient from 'react-native-linear-gradient'
import Ionicons from 'react-native-vector-icons/Ionicons'
import MapView, { Marker , animateCamera } from 'react-native-maps';

const Map_details = ({navigation}) => {

    const intial_region={
        latitude: 36.80804992591348, 
        longitude: 10.18000934447451, 
        latitudeDelta: 0.008, 
        longitudeDelta: 0.008,
    }

    /*****************************************************handle map pressing************************************************/
    const [PressedError, setPressedError] = useState()
    const focusedRegionRef = useRef()

    const changeCamera = (region , index)=>{
        focusedRegionRef.current.animateCamera(
            {center: region , zoom: 18},
            {duration:3000}
        )
        setPressedError(index)
    }

    const resetCamera = ()=>{
        focusedRegionRef.current.animateCamera(
            { center: { latitude: intial_region.latitude, longitude: intial_region.longitude }, zoom: 16 }, 
            { duration: 2000 } 
          );
        setPressedError(null); 
    }

    /***********************************************************data for errors*********************************************/
    const errors_data = [
        {
            region:{
                latitude: 36.80857526530639, 
                longitude: 10.183209670558915, 
                latitudeDelta: 0.09, 
                longitudeDelta: 0.09,
            },
            description:'incidunt iste laborum soluta aperiam illo placeat! Cumque adipisci architecto doloribus enim reprehenderit nam!',
        },
        {
            region:{
                latitude: 36.80590441328538, 
                longitude: 10.178392586068087, 
                latitudeDelta: 0.09, 
                longitudeDelta: 0.09,
            },
            description:'incidunt iste laborum soluta aperiam illo placeat! Cumque adipisci architecto doloribus enim reprehenderit nam!',
        },
        {
            region:{
                latitude:  36.80648294509326, 
                longitude: 10.183787720697813, 
                latitudeDelta: 0.09, 
                longitudeDelta: 0.09,
            },
            description:'incidunt iste laborum soluta aperiam illo placeat! Cumque adipisci architecto doloribus enim reprehenderit nam!',
        },
    ]

    /***********************************************************data for warnings*********************************************/
    const warnings_data = [
        {},
    ]

    const [Error_selected, setError_selected] = useState(false)
    const [Warning_selected, setWarning_selected] = useState(false) // kala karhba , vitesse , 
    const handleErrClicked = ()=>{
        setError_selected(true)
        setWarning_selected(false)

    }
    const handleWarClicked = ()=>{
        setWarning_selected(true)
        setError_selected(false)
        setPressedError()
    }

  return (
    <LinearGradient
    colors={['#000B14', '#020F19', '#051622', '#09202F', '#11324A', '#153A54']}
    style={{flex:1,paddingVertical:20,padding:10}}>

    <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',marginBottom:20}}>
        <Pressable style={{flexDirection:'row',alignItems:'center',gap:10}}>
            <Image style={{width:15 , height:15}} source={require('../../../assets/icons/arrow.png')} />
            <Text style={{fontWeight:700,color:'white'}}>Lessons</Text>
        </Pressable>
        <Pressable onPress={resetCamera}
        style={{padding:5,paddingHorizontal:15, backgroundColor:'red',borderRadius:20}}>
            <Text style={{fontWeight:700,color:'white'}}>Reset</Text>
        </Pressable>
    </View>
    
   
    <MapView
    ref={focusedRegionRef}
    style={{height:300,borderRadius:30,marginBottom:20}}
    initialRegion={intial_region}
    >
        <Marker 
        coordinate={{ 
            latitude: 36.80857526530639, 
            longitude: 10.183209670558915, 
            latitudeDelta: 0.09, 
            longitudeDelta: 0.09,
        }}
        anchor={{ x: 0.5, y: 0.5 }} >
            <Image
            source={require('../../../assets/icons/redFlag.png')} 
            style={{ width: 15, height: 15}} />
        </Marker>

        <Marker
        coordinate={{ 
            latitude: 36.80590441328538, 
            longitude: 10.178392586068087, 
            latitudeDelta: 0.09, 
            longitudeDelta: 0.09,
        }}
        anchor={{ x: 0.5, y: 0.5 }} >
            <Image
            source={require('../../../assets/icons/redFlag.png')} 
            style={{ width: 15, height: 15 }} />
        </Marker>

        <Marker
        coordinate={{ 
            latitude:  36.80648294509326, 
            longitude: 10.183787720697813, 
            latitudeDelta: 0.09, 
            longitudeDelta: 0.09,
        }}
        anchor={{ x: 0.5, y: 0.5 }} >
            <Image
            source={require('../../../assets/icons/redFlag.png')} 
            style={{ width: 15, height: 15 }} />
        </Marker>


    </MapView>

    <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-evenly',marginBottom:20}}>
        <Pressable onPress={handleWarClicked}
        style={{gap:10,flexDirection:'row',alignItems:'center',padding:10,paddingHorizontal:20,borderWidth:2,borderColor:'#FCD116',borderRadius:50,backgroundColor: Warning_selected ?'#FFFBC2' : null}}>
            <Image style={{width:20,height:20}} source={require('../../../assets/icons/yellowFlag.png')} />
            <Text style={{color:'#FCD116',fontWeight:700}} >Warnings (5)</Text>
        </Pressable>
        <Pressable onPress={handleErrClicked}
        style={{gap:10,flexDirection:'row',alignItems:'center',padding:10,paddingHorizontal:20,borderWidth:2,borderColor:'#D30707',borderRadius:50,backgroundColor: Error_selected ? '#FF8F8F' : null}}>
            <Image style={{width:20,height:20}} source={require('../../../assets/icons/redFlag.png')} />
            <Text style={{color:'#D30707',fontWeight:700}} >Errors (5)</Text>
        </Pressable>
    </View>

    <ScrollView>
        { Error_selected && 
            errors_data.map((error , i)=>(
                        <Pressable onPress={()=>changeCamera(error.region , i)} key={i} 
                        style={{borderRadius:10,borderWidth:1,borderColor:'#D30707',padding:10,marginBottom:10,flexDirection:'row',alignItems:'center',gap:20,backgroundColor: i == PressedError ? '#FFDFDF' : null}}>
                            <Image style={{width:50 , height:50}} source={require('../../../assets/alerts/stopSign.png')} />
                            <View style={{width:250}}>
                                <Text style={{color: i == PressedError ? '#153A54' : 'white'}}>{error.description}</Text>
                            </View>
                        </Pressable>
            ))
        }

        { Warning_selected && (
            <>
            <View style={{borderRadius:10,borderWidth:1,borderColor:'#FCD116',padding:10,marginBottom:10,flexDirection:'row',alignItems:'center',gap:20}}>
                <Image style={{width:50 , height:50}} source={require('../../../assets/alerts/warning.png')} />
                <View style={{width:250}}>
                    <Text style={{color:'white'}}>incidunt iste laborum soluta aperiam illo placeat! Cumque adipisci architecto doloribus enim reprehenderit nam!</Text>
                </View>
            </View>
            <View style={{borderRadius:10,borderWidth:1,borderColor:'#FCD116',padding:10,marginBottom:10,flexDirection:'row',alignItems:'center',gap:20}}>
                <Image style={{width:50 , height:50}} source={require('../../../assets/alerts/warning.png')} />
                <View style={{width:250}}>
                    <Text style={{color:'white'}}>incidunt iste laborum soluta aperiam illo placeat! Cumque adipisci architecto doloribus enim reprehenderit nam!</Text>
                </View>
            </View>
        </>
            )
        }
        
    </ScrollView>

    </LinearGradient>
      
  )
}

export default Map_details

const styles = StyleSheet.create({})