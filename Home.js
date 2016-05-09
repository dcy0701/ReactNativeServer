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
//console.log(require('image!icon_tabbar_homepage_selected'));

import Camera from 'react-native-camera';
import Location from './Location';

import My from './my';
import Recent from './Recent';
// console.log(require('image!icon_tabbar_homepage_selected'));

var Sign = React.createClass({
  getInitialState(){
    return {
      test:'test'
    }
  },
  render: function(){
    return(
        <View style={styles.container}>
           <Text>什么也没有</Text>
        </View>
    )
  },
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
  componentDidMount(){
    console.log(this.props.logout);
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
              barTintColor:'rgb(42,52,63)',
              titleTextColor:'#4F8EF7',
              component: Location,
              translucent:true,
              rightButtonIcon: require('image!icon_tabbar_onsite_selected'),
            }}
          />
        </TabBarIOS.Item>

        <TabBarIOS.Item
          title = "签到记录"
          icon = {require('image!icon_tabbar_misc')}
          onPress = {()=> this.changeTab('more')}
          selected = { this.state.selectedTab === 'more'}>
          <NavigatorIOS

            style={styles.container}
            initialRoute={{
              title: '签到记录',
              barTintColor:'rgb(42,52,63)',
              titleTextColor:'#4F8EF7',
              translucent:true,
              component: Recent,
            }}
          />
        </TabBarIOS.Item>

        <TabBarIOS.Item
          title = "进度"
          icon = {require('image!icon_tabbar_onsite')}
          onPress = {()=> this.changeTab('home')}
          selected = { this.state.selectedTab === 'home'}>
          <NavigatorIOS
            style={styles.container}
            initialRoute={{
              title: '进度',
              barTintColor:'rgb(42,52,63)',
              titleTextColor:'#4F8EF7',
              translucent:true,
              component: Sign,
            }}
          />
        </TabBarIOS.Item>

        <TabBarIOS.Item
          title = "我"
          icon = {require('image!icon_tabbar_mine')}
          onPress = {()=> this.changeTab('usercenter')}
          selected = { this.state.selectedTab === 'usercenter'}>
          <NavigatorIOS
            style={styles.container}
            initialRoute={{
              title: '我',
              component: My,
              barTintColor:'rgb(42,52,63)',
              titleTextColor:'#4F8EF7',
              translucent:true,
              passProps: {logout: this.props.logout},
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
