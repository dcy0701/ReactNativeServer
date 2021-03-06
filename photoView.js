'use strict'

import {
    StyleSheet,
    Text,
    View,
    TabBarIOS,
    NavigatorIOS,
    ScrollView,
    Dimensions,
    TouchableOpacity,
    Image,
    AsyncStorage,
    AlertIOS
} from 'react-native';

import React from 'react';

import {API} from './config';
var Icon = require('react-native-vector-icons/FontAwesome');

const PhotoView = React.createClass({
    getInitialState(){
        return{

        }
    },
    sign(){
        //此处收集所有数据 进行签到。。。。
        // 或者把数据放在这里。。签到。。
        //并且在此页面，根据不同的结果进行判断，判断是否替换。。。
        //是否申请替换 负责人
        //然后签到流程到此结束
        //oh yeah!!!!
        //TODO
        //
        let formData = new FormData();
        var project_id = this.props.passMes.sonProjectIndex;
        formData.append('photo',{uri:this.props.imageUrl.path,type:'image/jpg',name:'image.jpg'});
        formData.append('location',this.props.passMes.latitude+'$'+this.props.passMes.longitude);
        formData.append('project_id',project_id);

        AsyncStorage.getItem('loginStatus',function(error,result){
            //mock data   ***************************************************

            let username = result.split('$')[0];
            formData.append('user',username);
            let options = {headers:{}};
            options.body = formData;
            options.method = 'POST';
            console.log(options);
            fetch(API.LOCATION_API,options).then(function(res){
                return res.json();
            }).then(function(json){
                console.log(json);
                if(json.status=='s'){
                    AlertIOS.alert('签到成功');

                }else if(json.status=='-1'){
                    AlertIOS.alert(
                      '签到成功但是'+json.text,
                      '是否申请为负责人？',
                      [
                        {text: '确定', onPress: () => {
                            console.log(API.UPDATECHAGEMENT_API+'?user='+username+'&project_id='+project_id);
                            fetch(API.UPDATECHAGEMENT_API+'?user='+username+'&project_id='+project_id)
                            .then(function(res){
                                console.log(res);
                                if(res=='apply error'){
                                    AlertIOS.alert('工程不存在');
                                }else{
                                    AlertIOS.alert('申请成功请等待');
                                }
                                this.props.navigator.popToTop();
                            }.bind(this))
                        }},
                        {text: '取消', onPress: () => {
                            // do nothing
                            this.props.navigator.popToTop();
                        }},
                      ]
                  );
                }else if(json.status=='1'){
                    AlertIOS.alert(json.text)
                }else{
                    AlertIOS.alert(json.text)
                }
            }.bind(this));

        }.bind(this));
        //user

        console.log(this.props.passMes)
    },
    render:function(){
        var imgurl = this.props.imageUrl;
        console.log(imgurl);
        return (
            <View style={styles.container}>
                <Image  style={styles.image}
                        source={{uri:imgurl.path}}
                        resizeMode='contain'
                />
                <TouchableOpacity style={styles.sign} onPress={this.sign}>
                    <Text style={styles.text} onPress={this.sign}>
                        <Icon name="forumbee" size={20} color="white" /> 签到
                    </Text>
                </TouchableOpacity>

            </View>
        )
    }
});

var styles = StyleSheet.create({
    image:{
        flex:1,
        height: Dimensions.get('window').height-55,
        width: Dimensions.get('window').width,
        marginRight:10,
        marginTop:20,
        justifyContent:'center',
        alignItems:'center'
    },
    container:{
        flex:1,
        backgroundColor:'rgb(42,52,63)'
    },
    sign:{
        flex: 0,
        backgroundColor: '#fff',
        borderRadius: 15,
        marginLeft:130,
        marginRight:130,
        //color: 'pink',
        padding: 10,
        marginTop:4,
        marginBottom:55,
        backgroundColor:'rgb(39,217,179)',
        justifyContent:'center',
    },
    text:{
        textAlign:'center',
        fontSize:20,
        color:'white',
        fontWeight:'bold',
    }
});
module.exports=PhotoView;
