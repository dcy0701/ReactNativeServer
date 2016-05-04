'use strict';

var React = require('react-native');
var {
  StyleSheet,
  Text,
  View,
  TabBarIOS,
  NavigatorIOS,
  ScrollView,
  Dimensions,
  TouchableOpacity
} = React;
console.log(require('image!icon_tabbar_homepage_selected'));

import Camera from 'react-native-camera';
import Location from './Location';

// console.log(require('image!icon_tabbar_homepage_selected'));

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
                <TouchableOpacity style={styles.capture}>
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
      })
      .catch(err => console.error(err));
  }
});


var Home = React.createClass({
  getInitialState(){
    return {
      selectedTab:'sign'
    }
  },
  changeTab(tabName){
    this.setState({
      selectedTab:tabName
    });
  },
  render: function() {
    return (
      <TabBarIOS style={{flex:1}}>
        <TabBarIOS.Item
          title = "签到"
          icon = {require('image!icon_tabbar_homepage_selected')}
          //systemIcon = "bookmarks"
          onPress = {()=> this.changeTab('sign')}
          selected = { this.state.selectedTab === 'sign'}>
          <NavigatorIOS
            style={styles.container}
            initialRoute={{
              title: '签到',
              component: Location,
              rightButtonIcon: require('image!icon_tabbar_onsite_selected'),
            }}
          />
        </TabBarIOS.Item>

        <TabBarIOS.Item
          title = "主页"
          icon = {require('image!icon_tabbar_onsite')}
          onPress = {()=> this.changeTab('home')}
          selected = { this.state.selectedTab === 'home'}>
          <NavigatorIOS
            style={styles.container}
            initialRoute={{
              title: '主页',
              component: Sign,
            }}
          />
        </TabBarIOS.Item>

        <TabBarIOS.Item
          title = "个人中心"
          icon = {require('image!icon_tabbar_mine')}
          onPress = {()=> this.changeTab('usercenter')}
          selected = { this.state.selectedTab === 'usercenter'}>
          <NavigatorIOS
            style={styles.container}
            initialRoute={{
              title: '个人中心',
              component: Sign,
            }}
          />
        </TabBarIOS.Item>

        <TabBarIOS.Item
          title = "更多"
          icon = {require('image!icon_tabbar_misc')}
          onPress = {()=> this.changeTab('more')}
          selected = { this.state.selectedTab === 'more'}>
          <NavigatorIOS
            style={styles.container}
            initialRoute={{
              title: '更多',
              component: Sign
            }}
          />
        </TabBarIOS.Item>
      </TabBarIOS>
    );
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
    backgroundColor: '#fff',
    borderRadius: 5,
    //color: 'pink',
    padding: 10,
    margin:40
  },
  btn:{
      color:'pink',
  },
  container:{
    flex:1,
    backgroundColor:'white',
  },
});

module.exports=Home;
