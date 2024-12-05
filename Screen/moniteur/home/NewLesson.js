import { Modal, StyleSheet, Text, View , Pressable, TouchableOpacity, Image, TextInput, Platform } from 'react-native'
import React, { useState , useEffect } from 'react'
import LinearGradient from 'react-native-linear-gradient'
import MapView from 'react-native-maps'
import SelectDropdown from 'react-native-select-dropdown'
import { request, PERMISSIONS } from 'react-native-permissions';
import Geolocation from '@react-native-community/geolocation';

const NewLesson = () => {

    /******************************************************** enable permission *************************************************/
    const [Location, setLocation] = useState()
    useEffect(() => {
        console.log(Location)
    }, [Location])
    console.log(Location)
    

    const intial_region={
        latitude: Location?.latitude ? Location.latitude : 36.80804992591348 ,
        longitude: Location?.longitude ? Location.longitude : 10.18000934447451,
        latitudeDelta: 0.008, 
        longitudeDelta: 0.008,
    }

    const getCurrentLocation = () => {
        Geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            setLocation({ latitude, longitude });
          },
          (error) => {
            console.error('Erreur getting location:', error.message);
          },
          {
            enableHighAccuracy: true,
            timeout: 15000,
            maximumAge: 10000,
          }
        );
      };

    const requestPermission = async () => {
        const permission =
        Platform.OS === 'ios'
            ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
            : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION;

        const result = await request(permission); // check then make request to avoid requesting everytime
        if (result === 'granted') {
            console.log('Permission accordée');
            getCurrentLocation(); // Appelle la fonction pour récupérer la position
        } else {
            console.log('Permission refusée');
        }
    };

    useEffect(() => {
        requestPermission()
      }, []);

    const [Error_selected, setError_selected] = useState(false)
    const [Warning_selected, setWarning_selected] = useState(false) // kala karhba , vitesse , 
    const handleErrClicked = ()=>{
        setError_selected(true)
        setWarning_selected(false)

    }
    const handleWarClicked = ()=>{
        setWarning_selected(true)
        setError_selected(false)
    }

    const errors_type = [
        {title: 'type 1'},
        {title: 'type 2'},
        {title: 'type 3'},
        {title: 'type 4'},
        {title: 'type 5'},
    ]


    const [HoursModal, setHoursModal] = useState(true)
    const [SelectedHour, setSelectedHour] = useState('')

  return (
    <>

    <LinearGradient 
    colors={['#000B14', '#020F19', '#051622', '#09202F', '#11324A', '#153A54']}
    style={styles.screen}>

        <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',marginBottom:15}}>
            <Pressable style={{flexDirection:'row',alignItems:'center',gap:10}}>
                <Image style={{width:15 , height:15}} source={require('../../../assets/icons/arrow.png')} />
                <Text style={{fontWeight:700,color:'white'}}>Client profile</Text>
            </Pressable>
            <Pressable /* onPress={resetCamera} */
            style={{padding:5,paddingHorizontal:15, backgroundColor:'red',borderRadius:20}}>
                <Text style={{fontWeight:700,color:'white'}}>Reset</Text>
            </Pressable>
        </View>

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

        {
            Warning_selected && (
                <View style={{borderWidth:1 , borderColor:'#FCD116' , borderRadius:10,padding:10,marginBottom:20}}>
                    <Text style={{color:'#FCD116',fontWeight:700,marginBottom:10}}>Add description :</Text>
                    <TextInput placeholder='describe the warning here ..'
                    style={{backgroundColor:'white', padding:10 ,borderRadius:10 }}/>
                    <View style={{flexDirection:'row', justifyContent:'space-between',marginTop:20,alignItems:'center',paddingHorizontal:7}}>
                        <View style={{flexDirection:'row',gap:5}}>
                            <Image style={{width:20 , height:20}}  source={require('../../../assets/icons/yellowFlag.png')} />
                            <Image style={{width:20 , height:20}}  source={require('../../../assets/icons/yellowFlag.png')} />
                        </View>
                        <TouchableOpacity
                        style={{backgroundColor:'#FCD116',padding:10,borderRadius:10,elevation:10}} >
                            <Text style={{color:'#ffffff',fontWeight:700,paddingHorizontal:10}}>Confirm</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )
        }

        {
            Error_selected && (
                <View style={{borderWidth:1 , borderColor:'red' , borderRadius:10,padding:10,marginBottom:20}}>
                    <Text style={{color:'red',fontWeight:700,marginBottom:10}}>Add description :</Text>
                    <TextInput placeholder='describe the error here ..'
                    style={{backgroundColor:'white', padding:10 ,borderRadius:10 , marginBottom:10}}/>
                    <SelectDropdown
                    data={errors_type}
                    onSelect={(error, index) => {
                        console.log(error.titte)
                    }}
                    renderButton={(selectedItem, isOpened) => {
                        return (
                        <View style={styles.dropdownButtonStyle}>
                            <Text style={styles.dropdownButtonTxtStyle}>
                            {(selectedItem && selectedItem.title) || 'type'}
                            </Text>
                            <Image source={require('../../../assets/icons/blackArrow.png')} style={{height:15 , width:15,transform :[{rotate:'270deg'}]}}/>
                        </View>
                        );
                    }}
                    renderItem={(item, index, isSelected) => {
                        return (
                        <View style={{...styles.dropdownItemStyle, ...(isSelected && {backgroundColor: '#D2D9DF'})}}>
                            <Text style={styles.dropdownItemTxtStyle}>{item.title}</Text>
                        </View>
                        );
                    }}
                    showsVerticalScrollIndicator={false}
                    dropdownStyle={styles.dropdownMenuStyle}
                    />
                    <View style={{flexDirection:'row', justifyContent:'space-between',marginTop:20,alignItems:'center',paddingHorizontal:7}}>
                        <View style={{flexDirection:'row',gap:5}}>
                            <Image style={{width:20 , height:20}}  source={require('../../../assets/icons/redFlag.png')} />
                            <Image style={{width:20 , height:20}}  source={require('../../../assets/icons/redFlag.png')} />
                        </View>
                        <TouchableOpacity
                        style={{backgroundColor:'red',padding:10,borderRadius:10,elevation:10}} >
                            <Text style={{color:'#ffffff',fontWeight:700,paddingHorizontal:10}}>Confirm</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )
        }
        
        <MapView style={{height:'50%'}}
        initialRegion={intial_region}
        showsMyLocationButton
        showsUserLocation
        >
        </MapView>

    </LinearGradient>

    {/*********************************************************************** MODALS ***************************************************************/}

    <Modal transparent visible={HoursModal} >
    <View style={{justifyContent:'center',alignItems:'center',flex:1,backgroundColor:'rgba(0,0,0,0.6)'}} >
        <View style={{backgroundColor:'white',elevation:10,borderRadius:10}} >

            <Text style={{color:'black',marginBottom:20,paddingTop:20,paddingHorizontal:20}}>Set the lesson's hours :</Text>
            <View style={{flexDirection:'row',gap:10,justifyContent:'center',paddingHorizontal:20,marginBottom:20}}>
                <Pressable onPress={()=>setSelectedHour('1')}
                style={{borderWidth:1 , borderColor:'#C00F0C',padding:10,borderRadius:10, backgroundColor: SelectedHour == 1 ? '#C00F0C' : null}}>
                    <Text style={{textAlign:'center',fontWeight:700,color: SelectedHour == 1 ? 'white' : '#C00F0C'}}>1 Hour</Text>
                </Pressable>
                <Pressable onPress={()=>setSelectedHour('2')}
                style={{borderWidth:1 , borderColor:'#C00F0C',padding:10,borderRadius:10, backgroundColor: SelectedHour == 2 ? '#C00F0C' : null}}>
                    <Text style={{textAlign:'center',fontWeight:700,color: SelectedHour == 2 ? 'white' : '#C00F0C'}}>2 Hour</Text>
                </Pressable>
            </View>
            {
                SelectedHour && (
                    <TouchableOpacity onPress={()=>setHoursModal(false)}
                    style={{borderTopWidth:1, borderTopColor:'#C00F0C',padding:10}}>
                        <Text style={{textAlign:'center',fontWeight:700,color:'#C00F0C'}}>OK</Text>
                    </TouchableOpacity>
                )
            }
        </View>
    </View>
    </Modal>

    </>
  )
}

export default NewLesson

const styles = StyleSheet.create({
    screen:{
        flex:1 , 
        padding:10,
        paddingTop:15
    },
    dropdownButtonStyle: {
        width: '100%',
        height: 40,
        backgroundColor: '#ffffff',
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 12,
    },
    dropdownButtonTxtStyle: {
        flex: 1,
        fontSize: 18,
        fontWeight: '500',
        color: '#151E26',
    },
    dropdownItemTxtStyle: {
        flex: 1,
        fontSize: 18,
        fontWeight: '500',
        color: '#151E26',
      },
    dropdownItemStyle: {
        width: '100%',
        flexDirection: 'row',
        paddingHorizontal: 12,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 8,
    },
    dropdownMenuStyle: {
        backgroundColor: '#E9ECEF',
        borderRadius: 8,
    },
})