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
  NetInfo,
  AlertIOS,
  PixelRatio,
  Animated,
  Easing
} = React;

import {API} from './config';

var Icon = require('react-native-vector-icons/FontAwesome');
import TimerMixin from 'react-timer-mixin';

var Modify = React.createClass({
  getInitialState(){
    return {
      pass:'',
      new:''
    }
  },
  getValue(text){
    this.setState({
      pass:text
    })
  },
  getPass(text){
    this.setState({
      new:text
    });
  },
  modify(){
    var user = this.props.user;
    var newpass = this.state.new;
    var fetch_url = API.LOGIN_API+'?user='+user+'&pass='+this.state.pass;

    fetch(fetch_url)
      .then(function(response){
        return response.json();
      })
      .then(function(json){
        console.log(JSON.stringify(json));

        if(json.user_name){
          //登录成功 更新密码
          fetch(API.MODIFY_API+`?user=${user}&new=${newpass}`).then(function(response){
            return response.json();
          }).then(function(data){
            if(data.status=='ok'){
              AlertIOS.alert('修改成功');
              this.props.logout();
            }else{
              AlertIOS.alert('修改失败');
            }
          }.bind(this))
        }else{
          AlertIOS.alert('密码错误');
        }
        //将用户元数据保存在 asyncStroge中
      }.bind(this));
  },
  componentDidMount(){
    // 拿到用户 id
  },
  render: function(){
    return(
      <View style={styles.container2}>
        <Icon style={{left:150,paddingBottom:60,paddingTop:20}} name="tripadvisor" size={80} color="rgb(192,194,198)" />
        <View style={styles.pass}>
            <Text style={[styles.subTitle]}>
              <Icon name="history" size={20} color="rgb(192,194,198)" /> 原密码
            </Text>
            <View style={[styles.maxSpaceLeft]} value={this.state.username}>
                <TextInput
                  autoCapitalize = 'none'
                  style={styles.input}
                  placeholder = '请输入原始密码'
                  password={true}
                  //autoFocus={true}
                  value={this.state.pass}
                  onChangeText={this.getValue}
                  />
            </View>
        </View>
        <View style={styles.pass}>
            <Text style={[styles.subTitle]}>
              <Icon name="smile-o" size={20} color="rgb(192,194,198)" /> 新密码
            </Text>
            <View style={[styles.maxSpaceLeft]}>
                <TextInput
                  autoCapitalize = 'none'
                  password={true}
                  placeholder = '请输入新密码'
                  style={styles.input}
                  value={this.state.new}
                  onChangeText={this.getPass}
                  />
            </View>
        </View>
        <View style={{flex:5,width:300,alignItems:'flex-end'}}>
          <TouchableHighlight onPress={this.modify}>
              <Text style={styles.login}>
                确认修改
              </Text>
          </TouchableHighlight>

        </View>

      </View>
    )
  },
});


var My = React.createClass({
  getInitialState(){
    return {
      user:'',
      area:'',
      power:'',
      netInfo:'',
      fadeInOpacity: new Animated.Value(0)
    }
  },
  componentDidMount(){
    Animated.timing(this.state.fadeInOpacity, {
            toValue: 1, // 目标值
            duration: 8000, // 动画时间
            easing: Easing.linear // 缓动函数
        }).start();

    //console.log(this.props.logout);
    NetInfo.fetch().done(function(reach){
      this.setState({netInfo:reach});
    }.bind(this));
    AsyncStorage.getItem('user_meta',function(error,result){
      result = JSON.parse(result);
      // console.log(result);
      let {user_name,type,area} = result;//解构赋值
      console.log(result);
      this.setState({user:user_name,power:type,area:area});
    }.bind(this));
  },
  modify(){
    console.log(this.state.fadeInOpacity)
    this.props.navigator.push({
      component:Modify,
      title:'修改密码',
      barTintColor:'rgb(42,52,63)',
      titleTextColor:'#4F8EF7',
      translucent:true,
      passProps:{
        user:this.state.user,
        logout:this.props.logout
      }
    })
  },
  logout(){
    AlertIOS.alert(
            '确认退出吗',
            '',
            [
              {text: '确定', onPress: function(){this.props.logout()}.bind(this)},
              {text: '取消'},
            ]
          )
  },
  render(){
    return(
        <View style={styles.container}>
          <View style={styles.listView}>
            <View style={styles.user}>
              <Text style={{fontSize:18,color:'rgb(39,217,179)'}}>  <Icon name="user" size={20} color="#4F8EF7" />    当前用户:      {this.state.user}</Text>
              <Text style={{fontSize:18,right:0,color:'rgb(39,217,179)'}}>  <Icon name="angle-right" size={20} color="#858585" />  </Text>
            </View>
            <View style={styles.user}>
              <Text style={{fontSize:18,color:'rgb(39,217,179)'}}>  <Icon name="location-arrow" size={20} color="#4F8EF7" />    所属区域:       {this.state.area}</Text>
              <Text style={{fontSize:18,right:0,color:'rgb(39,217,179)'}}>  <Icon name="angle-right" size={20} color="#858585" />  </Text>
            </View>
            <View style={styles.user}>
              <Text style={{fontSize:18,color:'rgb(39,217,179)'}}>  <Icon name="hourglass-start" size={20} color="#4F8EF7" />    用户权限:       {this.state.power}</Text>
              <Text style={{fontSize:18,right:0,color:'rgb(39,217,179)'}}>  <Icon name="angle-right" size={20} color="#858585" />  </Text>
            </View>
            <View style={styles.user}>
              <Text style={{fontSize:18,color:'rgb(39,217,179)'}}>  <Icon name="wifi" size={20} color="#4F8EF7" />   当前网络:       {this.state.netInfo}</Text>
              <Text style={{fontSize:18,right:0,color:'rgb(39,217,179)'}}>  <Icon name="angle-right" size={20} color="#858585" />  </Text>
            </View>
            <View style={styles.user}>
              <Text style={{fontSize:18,color:'rgb(39,217,179)'}}>  <Icon name="qq" size={20} color="#4F8EF7" />   关于作者:       byr.pub</Text>
              <Text style={{fontSize:18,right:0,color:'rgb(39,217,179)'}}>  <Icon name="angle-right" size={20} color="#858585" />  </Text>
            </View>
          </View>
          <Animated.View style={{top:110,
                    opacity: this.state.fadeInOpacity
                }}>
                <Text style={styles.text}><Icon style={{top:110}} name="pagelines" size={80} color="#4F8EF7" /></Text>
          </Animated.View>
          <View style={styles.ccc}>
            <TouchableOpacity
              onPress={this.logout}>
              <Text style={styles.logout}>
                <Icon size={18} name="sign-out" color="white" /> 退出登录
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={this.modify}>
              <Text style={styles.modify}>
                <Icon size={18} name="edit" color="white" /> 修改密码
              </Text>
            </TouchableOpacity>
          </View>
        </View>
    )
  },
});
var styles = StyleSheet.create({
  userHeader:{
    flex:1,
  },
  user:{
    paddingTop:20,
    flex:1,
    flexDirection:'row',
    borderColor:'black',
    // borderBottomWidth:1/PixelRatio.get(),
    justifyContent:'space-between',
  },
  ccc:{
    flex:5,
    flexDirection:'row',
  },
  container:{
    flex:1,
    flexDirection:'column',//主轴方向
    alignItems:'center',
    backgroundColor:'rgb(42,52,63)'
  },
  text:{
    fontSize:12,
  },
  listView:{
    top:65,
    flex:4,
    // backgroundColor:'pink',
    borderColor:'#CCCCCC',
    //borderBottomWidth:1/PixelRatio.get(),
    width:Dimensions.get('window').width,
  },
  logout:{
    paddingTop:10,
    flex:1,
    left:20,
    position:'absolute',
    color:'white',
    fontWeight:'bold',
    fontSize:18,
    width:130,
    height:40,
    bottom:120,
    // marginLeft:(Dimensions.get('window').width-100)/2,
    borderRadius:20,
    backgroundColor:'#FE433C',
    textAlign:'center',
  },
  modify:{
    paddingTop:10,
    flex:1,
    left:-150,
    position:'absolute',
    color:'white',
    fontWeight:'bold',
    fontSize:18,
    width:130,
    height:40,
    bottom:120,
    // marginLeft:(Dimensions.get('window').width-100)/2,
    borderRadius:20,
    backgroundColor:'#4cc0e0',
    textAlign:'center',
  },
  login:{
    left:-200,
    position:'absolute',
    fontSize:18,
    // bottom:140,
    top:100,
    flex:5,
    height:40,
    width:200,
    color:'white',
    borderRadius:20,
    fontWeight:'bold',
    backgroundColor:'rgb(39,217,179)',
    textAlign:'center',
    paddingTop:10
  },
  input:{
    fontSize:18,
    height:40,
    borderWidth:1,
    borderColor:'#ccc',
    borderRadius:6,
    marginLeft:5,
    width:200,
    paddingLeft:15
  },
  subTitle:{
    fontSize:18,
    width:80,
    color:'rgb(39,217,179)'
  },
  pass:{
    flex:1,
    justifyContent:'center',
    flexDirection:'row',
    alignItems:'center'
  },
  container2:{
      flex:1,
      paddingTop:150,
      backgroundColor:'rgb(42,52,63)'
  },
  memo:{
      top:60,
      flex:1,
      marginRight:0
  },
  tiptext:{
    paddingTop:20,
    fontSize:20,
    color:'gray',
    textAlign:'center'
  },
  tips:{
    paddingBottom:100
  }
});

module.exports=My;
