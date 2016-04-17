'use strict';

var React = require('react-native');
var {
  StyleSheet,
  Text,
  View,
  TabBarIOS,
  NavigatorIOS,
  ScrollView
} = React;
console.log('Home加载进来啦！！！！！');

// console.log(require('image!icon_tabbar_homepage_selected'));

var Sign = React.createClass({
  getInitialState(){
    return {
      test:'test'
    }
  },
  render: function(){
    return(
      <ScrollView>
        <Text>
          测试
        </Text>
      </ScrollView>
    )
  }
});
import Location from './Location';

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
          onPress = {()=> this.changeTab('shangjia')}
          selected = { this.state.selectedTab === 'shangjia'}>
          <NavigatorIOS
            style={styles.container}
            initialRoute={{
              title: '商家',
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
              component: Sign,
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
  container:{
    flex:1,
    backgroundColor:'white',
  },
});

module.exports=Home;
