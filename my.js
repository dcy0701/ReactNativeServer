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
  TouchableOpacity,
  AsyncStorage,
  TextInput,
  TouchableHighlight,
  Switch,
  NetInfo
} = React;

var My = React.createClass({
  getInitialState(){
    return {
      user:'',
      area:'',
      power:'',
      netInfo:'',
    }
  },
  componentDidMount(){
    console.log(this.props.logout);
    this.props.logout();
    NetInfo.fetch().done(function(reach){
      this.setState({netInfo:reach});
    }.bind(this));
    AsyncStorage.getItem('user_meta',function(error,result){
      result = JSON.parse(result);
      // console.log(result);
      let {user,type,area} = result;//解构赋值
      //this.setState({user:user,power:type,area:area});
    }.bind(this));
  },
  logout(){
    this.props.logout();
  },
  render(){
    return(
        <View style={styles.container}>

        </View>
    )
  },
});
var styles = StyleSheet.create({
  container:{
    flex:1,
    height:100,
  },
  text:{
    fontSize:12,
  }
});

module.exports=My;
