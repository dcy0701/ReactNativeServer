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
    Image
} from 'react-native';

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
