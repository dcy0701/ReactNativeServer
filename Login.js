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
  PixelRatio
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
              let expires = new Date().getTime();
              let val = this.state.username+'$'+this.state.pass+'$'+expires;
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
  logout(){
    AsyncStorage.removeItem('loginStatus',function(err){
      console.log(err);
    }).then(function(){
      console.log('！！！！调用了退出，传递给了index');
      this.setState({status:0});
    }.bind(this));
  },
  render: function(){
      if(this.state.status==2||this.state.status==0){
        return (
          <View style={styles.container}>
            <View style={styles.tips}>
              {this.state.status===2? <Text style={styles.tiptext}>密码错误请重新登录</Text>:<Text style={styles.tiptext}>开始登录</Text>}
            </View>
            <View style={styles.pass}>
                <Text style={[styles.subTitle]}>
                  用户名
                </Text>
                <View style={[styles.maxSpaceLeft]} value={this.state.username}>
                    <TextInput
                      autoCapitalize = 'none'
                      style={styles.input}
                      placeholder = '请输入用户名'
                      //autoFocus={true}
                      value={this.state.username}
                      onChangeText={this.getValue}
                      />
                </View>
            </View>
            <View style={styles.pass}>
                <Text style={[styles.subTitle]}>
                  密码
                </Text>
                <View style={[styles.maxSpaceLeft]}>
                    <TextInput
                      autoCapitalize = 'none'
                      password={true}
                      placeholder = '请输入密码'
                      style={styles.input}
                      value={this.state.pass}
                      onChangeText={this.getPass}
                      />
                </View>
            </View>

            <View style={{flex:5,width:300,alignItems:'flex-end'}}>
              <View style={styles.memo}>
                  <Switch value={this.state.memorize}
                          onValueChange={(value) => this.setState({memorize: value})}
                        />
                  <Text>记住密码</Text>
              </View>
              <TouchableHighlight onPress={this.login}>
                  <Text style={styles.login}>
                    登录
                  </Text>
              </TouchableHighlight>

            </View>

          </View>
        )
      }else if(this.state.status==3){
        // 这里是导航页面  TODO
        return(
          <Home logout={this.logout} />
        )
      }
    },
});
var styles = StyleSheet.create({
    login:{
      left:-200,
      position:'absolute',
      fontSize:18,
      bottom:140,
      flex:5,
      height:40,
      width:200,
      color:'white',
      borderRadius:20,
      fontWeight:'bold',
      backgroundColor:'#4cc0e1',
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
      width:80
    },
    user:{
      flex:1,
      flexDirection:'row',
      justifyContent:'center',
      alignItems:'center'
    },
    pass:{
      flex:1,
      justifyContent:'center',
      flexDirection:'row',
      alignItems:'center'
    },
    container:{
        flex:1,
        padding:20
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

module.exports=Login;
