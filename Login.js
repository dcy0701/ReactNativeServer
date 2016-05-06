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
} = React;

import Home from './Home';
import config from './config';

var Login = React.createClass({
  getInitialState(){
    return {
      test:'test',
      username:'',
      pass:'',
      memorize:false,
      status:this.props.status
    }
  },
  login(){
      //如果用户选择保存密码，那么用户将存到。。loginstatus中
      let username = this.state.username;
      let password = this.state.pass;
      let fetch_url = config.API.LOGIN_API+'?user='+username+'&pass='+password;
      console.log(fetch_url);
      fetch(fetch_url)
        .then(function(response){
          return response.json();
        })
        .then(function(json){
          console.log(JSON.stringify(json));

          if(json.user_name){
            //登录成功
            //that.setState({cover: result});
            this.setState({status: 3});
            //跳转HOME
            AsyncStorage.setItem('user_meta',JSON.stringify(json),function(err){
              console.log(err);
            });
            if(this.state.memorize==true){
              let val = this.state.username+'$'+this.state.pass;
              //TODO 考虑加上时长
              AsyncStorage.setItem('loginStatus',val,function(err){
                console.log(err);
              });
            }
          }else{
            //登录失败 可能是密码错误等等
            this.setState({status:2});
          }
          //将用户元数据保存在 asyncStroge中
        }.bind(this));
  },
  getValue(text){
    this.setState({
      username:text
    })
  },
  getPass(text){
    this.setState({
      pass:text
    });
  },
  memorize(val){
    this.setState({
      memorize:val
    });
  },
  render: function(){
      if(this.state.status==2||this.state.status==0){
        return (
          <View style={styles.container}>
            <View>
              {this.state.status===2? <Text>密码错误请重新登录</Text>:<Text>'开始登录'</Text>}
            </View>
            <View>
                <Text style={[styles.subTitle,styles.minSpaceLeft]}>
                  用户名
                </Text>
                <View style={[styles.maxSpaceLeft]} value={this.state.username}>
                    <TextInput
                      autoCapitalize = 'none'
                      style={{height: 60,width:160}}
                      placeholder = '请输入用户名'
                      //autoFocus={true}
                      value={this.state.username}
                      onChangeText={this.getValue}
                      />
                </View>
                <Text>
                  {this.state.username}
                </Text>
            </View>
            <View>
                <Text style={[styles.subTitle,styles.minSpaceLeft]}>
                  用户名
                </Text>
                <View style={[styles.maxSpaceLeft]}>
                    <TextInput
                      autoCapitalize = 'none'
                      style={{height: 60,width:160}}
                      password={true}
                      placeholder = '请输入密码'
                      value={this.state.pass}
                      onChangeText={this.getPass}
                      />
                </View>
            </View>

            <View style={{flex:1,width:300}}>
              <TouchableHighlight onPress={this.login}>
                  <Text style={{flex:0,height:40,position:'absolute',left:12,right:12,top:12,color:'white',fontWeight:'bold',backgroundColor:'#4cc0e0',textAlign:'center',paddingTop:10,borderRadius:20}}>
                    登录
                  </Text>
              </TouchableHighlight>
              <View style={styles.memo}>
                  <Switch value={this.state.memorize}
                          onValueChange={(value) => this.setState({memorize: value})}
                        />
                  <Text>记住密码</Text>
              </View>
            </View>

          </View>
        )
      }else if(this.state.status==3){
        // 这里是导航页面  TODO
        return(
          <Home />
        )
      }
    },
});
var styles = StyleSheet.create({
    container:{
        flex:1,
        padding:20
    },
    memo:{
        top:60,
    }
});

module.exports=Login;
