/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  View,
  AsyncStorage
} from 'react-native';

import Home from './Home';
import TimerMixin from 'react-timer-mixin';

import config from './config';

import Location from './Location';

console.log('config');

var log = console.log;

import SplashScreen from './Splash.js';

console.log(config);

//XXX  第一点 加上http:
//XXX  第二点 加上console.log

// console.log(log);
// log('qq');//tell me why????
//console.log(fetch('http://baidu.com'))


// 测试某个接口！！login
// fetch('http://127.0.0.1:3000/s/login?user=dcy&pass=dcy0701').then(function(res){
//   return res.json()
// }).then(function(json){
//   console.log(json)
// });
var ReactNativeServer = React.createClass({
  mixins: [TimerMixin],
  getInitialState:function(){
    return{
      splashed :true,//这个是载入页面动画
      login: 1// 1初始 0没有登录信息 2 登录失败 3 登录成功
    }
  },
  componentDidMount:function(){
    console.log('主页加载完了！！！');
    var that = this;
    this.setTimeout(//清理计时器 需要加入mixin TODO
      ()=> {
        this.setState({splashed:false});
        //console.log(this.state);
      },2000
    );
    //异步任务去AsyncStroge中拿取 登录状态
    // 对于登录状态，暂时保存7天  如果不记住密码 保存30天 是有一个范围 TODO
    // async 约定保存格式 是 user$id:pass XXX
    // 正确格式是  loginStatus:user#password
    //  用来测试格式。。

    //only for test
    AsyncStorage.getItem('user_meta',function(error,result){
      console.log(arguments);
    });
    //两秒后完毕

    AsyncStorage.getItem('loginStatus',function(error,result){
      //错误出口优先。 error不出错的情况下一直是null  也就是不考虑error
      // 如果错误的话，那么。。。参数形式是[null,null]
      //var that = this;
      //console.log(arguments);


      //mock data   ***************************************************
      error = 1;
      result = 'dcy$dcy0701'


      //************************************************************
      if(result===null){  //这个 result是不为null的


        //说明未登录  那么 login=false
        this.setState({login:0});
        console.log(this.state.login);
        return;
      }
      // 否则 有登录信息 帮助用户登录
      // 在登录成功后，才改成 相应的状态码
      console.log(result);
      var username = result.split('$')[0];
      var password = result.split('$')[1];

      var fetch_url = config.API.LOGIN_API+'?user='+username+'&pass='+password;

      console.log('fetch:'+fetch_url);


      fetch(fetch_url)
        .then(function(response){
          return response.json();
        })
        .then(function(json){
          console.log(JSON.stringify(json));

          if(json.user_name){
            //登录成功
            //that.setState({cover: result});
            this.setState({login: 3});
            AsyncStorage.setItem('user_meta',JSON.stringify(json),function(err){
              console.log(err);
            });
          }else{
            //登录失败 可能是密码错误等等
            this.setState({login:2});
          }
          //将用户元数据保存在 asyncStroge中
        }.bind(this));
    }.bind(this));
  },
  render: function() {
    if (this.state.splashed||this.state.login==1) {
      return (
        //这里是载入动画 done FIXME
        <SplashScreen />
      );
    }else if(this.state.login==2||this.state.login==0){
      return (
        <View style={styles.container}>
          <Text style={styles.welcome}>
            需要前往没有做出来的登录页面
          </Text>
        </View>
        //这里是 登录页面 TODO
      )
    }else if(this.state.login==3){
      // 这里是导航页面  TODO
      return(
        <Home />
      )

    }
  },


});


// <View style={styles.container}>
//   <Text style={styles.welcome}>
//     自动登录成功  进入没有做出来的主页
//   </Text>
// </View>

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('ReactNativeServer', () => ReactNativeServer);
