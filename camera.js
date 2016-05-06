'use strict'

import React,{
    StyleSheet,
    Text,
    View,
    TabBarIOS,
    NavigatorIOS,
    ScrollView,
    Dimensions,
    TouchableOpacity
} from 'react-native';

console.log('加载拍照组件，开启拍照，跳转至拍照路由');

import Camera from 'react-native-camera';

import PhotoView from './photoView';

var Sign = React.createClass({
  getInitialState(){
    return {
      test:'test'
    }
  },
  render: function(){
    return(
      <View>
        <View style={styles.container}>
           <Camera
             ref={(cam) => {
               this.camera = cam;
             }}
             style={styles.preview}
             captureTarget={Camera.constants.CaptureTarget.disk}
             aspect={Camera.constants.Aspect.fit}>
                <TouchableOpacity onPress={this.takePicture} style={styles.capture}>
                    <Text style={styles.btn} onPress={this.takePicture}>点击拍照</Text>
                </TouchableOpacity>
           </Camera>
        </View>
      </View>
    )
  },
  takePicture() {
    this.camera.capture()
      .then((data) => {
          console.log(data);
          this.props.navigator.push({
              component:PhotoView,
              title:'预览',
              navigationBarHidden:true,
              rightButtonTitle:'重新拍摄',
              passProps:{
                  imageUrl:data,
                  passMes:this.props.passMes
              },
              OnRightButtonPress:function(){
                  // 此处放弃拍照 直接签到
                  console.log('此功能暂未开发');
              }
          });
          //此处跳转路由
          console.log(this.props.navigator);
      })
      .catch(err => console.error(err));
  }
});

var styles = StyleSheet.create({
  pageView:{
    backgroundColor: '#fff',
    flex:1
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: Dimensions.get('window').height-50,
    width: Dimensions.get('window').width
  },
  capture: {
    flex: 0,
    backgroundColor: '#FE433C',
    borderRadius: 5,
    //color: 'pink',
    padding: 10,
    margin:40
  },
  btn:{
      fontSize:12,
      color:'white',
      fontWeight:'bold'
  },
  container:{
    flex:1,
    backgroundColor:'white',
  },
});

module.exports=Sign;
