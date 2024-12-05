import { ImageBackground, StyleSheet, View, Image, Pressable,Text } from 'react-native';
import React from 'react';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';

const HomePage = ({navigation}) => {
  const scale = useSharedValue(1); 
  const opacity = useSharedValue(1); 
  const translateY = useSharedValue(0); 
  const translateYshadow = useSharedValue(0); 
  const translateYpoints = useSharedValue(0); 
  const scaleView = useSharedValue(0); 
  const opacityGetStarted = useSharedValue(0); 
  const scaleGetStarted = useSharedValue(0); 
  const opacityLogo = useSharedValue(0); 

  const handleScreenPress = () => {
    // Toggle scale and opacity
    scale.value = withTiming(scale.value === 1 ? 1.3 : 1, { duration: 500 });
    scaleView.value = withTiming(scaleView.value === 1 ? 0.8 : 1, { duration: 500 });
    opacity.value = withTiming(opacity.value === 1 ? 1 : 1, { duration: 500 });
    translateY.value = withTiming(translateY.value === 0 ? 65 : 0, { duration: 500 }); 
    translateYshadow.value = withTiming(translateYshadow.value === 0 ? -40 : 0, { duration: 500 }); 
    translateYpoints.value = withTiming(translateYpoints.value === 0 ? -280 : 0, { duration: 500 }); 
    opacityGetStarted.value = withTiming(opacityGetStarted.value === 0 ? 1 : 0, { duration: 1000 }); 
    scaleGetStarted.value = withTiming(scaleGetStarted.value === 0 ? 0.7 : 0, { duration: 500 }); 
    opacityLogo.value = withTiming(opacityLogo.value === 0 ? -50 : 0, { duration: 500 }); 
  };

  // Animated styles for background scaling
  const animatedBackgroundStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value},{ translateY: translateY.value}],
  }));

  const animated2ptsStyle = useAnimatedStyle(() => ({
    transform: [
        { translateY: translateYpoints.value},
        { scale: scaleView.value},
    ],
  }));

  // Animated styles for image opacity
  const animatedImageStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translateYshadow.value}],
  }));

  const animatedLogo = useAnimatedStyle(() => ({
    transform: [{ translateY: opacityLogo.value}],
  }));

  const animatedGetStarted = useAnimatedStyle(() => ({
    opacity: opacityGetStarted.value,
    transform: [{ scale: scaleGetStarted.value},]
  }));

  return (
    <Pressable onPress={handleScreenPress}
    style={{ backgroundColor: '#153A54', zIndex: 0, flex: 1 }}>

        <Animated.Image style={[{position:'absolute' , top:'75%' , left:155, zIndex:2 , width:50,height:50}, animatedLogo]}
        source={require('../../assets/logo.png')}/>

        <Animated.View style={[{ flex: 0.75, zIndex: 1 }, animatedBackgroundStyle]}>

        <ImageBackground style={{ flex: 1 }}
        source={require('../../assets/LEARN2DRIVE.png')}>

          <Animated.View style={[styles.points , animated2ptsStyle]}>

            <Animated.View style={[styles.getStarted , animatedGetStarted]}>

                <Pressable onPress={()=>navigation.navigate('signup')}
                 style={{backgroundColor:'#ffffff',width:'60%',borderRadius:50,elevation:10,marginTop:40}}>
                    <Text style={{textAlign:'center',color:'#153A54',padding:15,paddingHorizontal:30,fontSize:20,fontWeight:700}}>Get Started</Text>
                </Pressable>

                <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
                    <Text style={{textAlign:'center',color:'#153A54',marginVertical:20,fontSize:20}}>Already have an account ? </Text>
                    <Pressable onPress={()=>navigation.navigate('login')}><Text style={{color:'red',textDecorationLine:'underline',fontSize:17}}>SignIn</Text></Pressable>
                </View>
            </Animated.View>
            
          </Animated.View>
          <Animated.Image style={[{ marginTop: 130, position:'static' }, animatedImageStyle]}
            source={require('../../assets/shadow.png')}/>
        </ImageBackground>

      </Animated.View>

    </Pressable>
  );
};

export default HomePage;

const styles = StyleSheet.create({
  points: {
    flexDirection: 'col',
    justifyContent: 'center',
    top: '95%',
    zIndex: 2,
    alignItems: 'center',
  },
  getStarted: {
    flexDirection: 'col',
    justifyContent: 'center',
    top: '90%',
    zIndex: 2,
    alignItems: 'center',
  },
  point: {
    width: 10,
    height: 10,
    borderRadius: 50,
  },
  firstText: {
    color: '#153A54',
    fontSize:20,
  },
});
