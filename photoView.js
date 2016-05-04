'use strict'

import React,{
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

import {API} from './config';

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
        formData.append('photo',{uri:this.props.imageUrl,type:'image/jpg',name:'image.jpg'});
        formData.append('location',this.props.passMes.latitude+'$'+this.props.passMes.longitude);
        formData.append('project_id',project_id);

        AsyncStorage.getItem('loginStatus',function(error,result){
            //mock data   ***************************************************
            error = 1;
            result = 'dcy$dcy0701'
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
                      json.text,
                      '是否确认申请为负责人？',
                      [
                        {text: '确定', onPress: () => {
                            console.log(API.UPDATECHAGEMENT_API+'?user='+username+'&project_id='+project_id);
                            fetch(API.UPDATECHAGEMENT_API+'?user='+username+'&project_id='+project_id)
                            .then(function(res){
                                console.log(res);
                                if(res=='apply error'){
                                    alert('工程不存在');
                                }
                                this.props.navigator.popToTop();
                            }.bind(this))
                        }},
                        {text: '取消', onPress: () => {
                            // do nothing
                            this.props.navigator.popToTop();
                        }},
                      ]
                    )
                    AlertIOS(json.text);
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
                        source={{uri:imgurl}}
                        resizeMode='contain'
                />
                <TouchableOpacity style={styles.sign} onPress={this.sign}>
                    <Text style={styles.text} onPress={this.sign}>
                        确认签到
                    </Text>
                </TouchableOpacity>

            </View>
        )
    }
});

var styles = StyleSheet.create({
    image:{
        flex:1,
        height: Dimensions.get('window').height-50,
        width: Dimensions.get('window').width,
        marginRight:10,
        marginTop:20,
        justifyContent:'center',
        alignItems:'center'
    },
    container:{
        flex:1,
        backgroundColor:'white',
    },
    sign:{
        flex: 0,
        backgroundColor: '#fff',
        borderRadius: 15,
        marginLeft:70,
        marginRight:70,
        //color: 'pink',
        padding: 10,
        marginTop:4,
        marginBottom:50,
        backgroundColor:'#d6e9c6',
        justifyContent:'center',
    },
    text:{
        textAlign:'center',
        fontSize:24,
        color:'black'
    }
});
module.exports=PhotoView;
