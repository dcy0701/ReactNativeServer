'use strict'
/*
*
*  created by dcy on 2016/4/17
*  base on react-native
*/

import React,{
    StyleSheet,
    Text,
    View,
    TabBarIOS,
    NavigatorIOS,
    ScrollView,
    Picker,
    PickerIOS,
    TouchableOpacity,
    AlertIOS,
    Dimensions,
    MapView
} from 'react-native';

var PickerItemIOS = PickerIOS.Item;
//定位测试
import {API,MAP_API} from './config';
import Sign from './camera';

var Icon = require('react-native-vector-icons/FontAwesome');
var UPDATE_API = API.UPDATE_API;
var LOCATION_API = API.LOCATION_API;
var UPDATECHAGEMENT_API = API.UPDATECHAGEMENT_API;

var GEOCODER_API = MAP_API.GEOCODER_API;

// 在加载的时候 的操作
var Geolocation = require('Geolocation');

Geolocation.getCurrentPosition(function(data){
  console.log(data);
},function(){
  console.log('location error');
});

console.log('加载了定位模块');

var Location = React.createClass({
  getInitialState(){
    return {
      longitude:'0',
      latitude:'0',
      selectedProject:0,
      detailPositon:'loading...',
      sonProjectIndex:0,
      resultProject:{},
      language:'java'
    };
  },
  componentDidMount(){
    //1.向后台 拿工程列表
    var fetch_project = new Promise(function(resolve,reject){
      fetch(UPDATE_API).then(function(res){
        return res.json();
      }).then(function(json){
        resolve(json);
      }).catch(function(err){
        reject('project error');
      })
    });
    //2.定位信息
    var fetch_location = new Promise(function(resolve,reject){
      Geolocation.getCurrentPosition(function(data){
        resolve(data);
      },function(){
        reject('location error');
      });
    });

    fetch_project.then(function(res){
      console.log(res);
      this.setState({
        resultProject:res
      });
      var temp = Object.keys(res);
      this.setState({
        selectedProject:temp[0]
      });
      //更新 工程名字
    }.bind(this));
    var location_infomation;
    fetch_location.then(function(res){
      console.log(res);
      this.setState({
        longitude: res.coords.longitude,
        latitude: res.coords.latitude
      });

      return res;
    }.bind(this)).then(function(ress){

        var url = GEOCODER_API+ress.coords.latitude+','+ress.coords.longitude;
        console.log(url);
        return fetch(url).then(function(data){
          return data.json();
        }).then(function(result){
            if(result.message=="query ok"){
              console.log(result.result.address);
              this.setState({detailPositon:result.result.address});
            }else{
              this.setState({detailPositon:'额，转换出错啦...'})
            }
        }.bind(this));
    }.bind(this));
  },
  sign:function(){
    //进行签到逻辑  TODO
    console.log('开始签到流程');
    var passMes = {
        latitude:this.state.latitude,
        longitude:this.state.longitude,
        selectedProject:this.state.selectedProject,
        sonProjectIndex:this.state.sonProjectIndex
    }
    //此处进行路由跳转
    this.props.navigator.push({
        component:Sign,
        title:'拍照',
        rightButtonTitle:'放弃拍照',
        translucent:'true',
        navigationBarHidden:true,
        OnRightButtonPress:function(){
            // 此处放弃拍照 直接签到
            console.log('此功能暂未开发');
        },
        passProps:{
            passMes:passMes
        }
    });

    // console.log(this.props.navigator);
  },
  render:function(){
    var select_son_arr = this.state.resultProject[this.state.selectedProject];
    //前两次加载的时候 先render  防止没有数据造成 值是undefined FIXME
    if(select_son_arr===undefined){
      select_son_arr = [];
    }
    var project_id_arr = Object.keys(this.state.resultProject);
    console.log(this.state);
    //此时两个数组的值 是稳定的
    //二级联动  默认都是0 0
    //数组
    return(
        <ScrollView  style={{flex:1,backgroundColor:'rgb(42,52,63)'}}>
          <View style={styles.picker_contain}>
            <View style={styles.picker1}>
              <Text style={{fontSize:22,color:'rgb(39,217,179)',textAlign:'center',padding:0}}>
                父工程号
              </Text>
              <PickerIOS
                selectedValue={this.state.selectedProject}
                itemStyle={{fontSize: 16,color:'rgb(39,217,179)', textAlign: 'center', fontWeight: 'bold'}}
                onValueChange={(Project_id) => {
                    this.setState({ selectedProject: Project_id});
                    //XXX  FIXME  TODO 这句话很重要
                    this.setState({ sonProjectIndex: this.state.resultProject[this.state.selectedProject][0]});
                  }
                }>
                {project_id_arr.map((Project_id) => (
                  <PickerItemIOS
                    key={Project_id}
                    value={Project_id}
                    label={Project_id}
                  />
                ))}
              </PickerIOS>
            </View>
            <View style={styles.picker2}>
              <Text style={{fontSize:22,color:'rgb(39,217,179)',textAlign:'center',padding:0}}>
                子工程号
              </Text>
              <PickerIOS
                  selectedValue={this.state.sonProjectIndex}
                  itemStyle={{fontSize: 16, color:'rgb(39,217,179)', textAlign: 'center', fontWeight: 'bold'}}
                  // key={this.state.carMake}
                  onValueChange={(value) => this.setState({sonProjectIndex:value})}>
                  {select_son_arr.map((value) => (
                    <PickerItemIOS
                      key={String(value)}
                      value={String(value)}
                      label={String(value)}
                    />
              ))}
            </PickerIOS>
            </View>
          </View>
          <MapView
            showsUserLocation={true}
            region={{latitude: parseFloat(this.state.latitude),
                    longitude: parseFloat(this.state.longitude),
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01}}
            style={styles.map}
          />
        <View style={styles.text}>
          <Text style={styles.textview}><Icon name="location-arrow" size={20} color="rgb(39,217,179)" /> 经度: {this.state.longitude}</Text>
          <Text style={styles.textview}><Icon name="history" size={20} color="rgb(39,217,179)" /> 纬度: {this.state.latitude}</Text>
          <Text style={styles.textview}><Icon name="info-circle" size={20} color="rgb(39,217,179)" /> 详细位置是: {this.state.detailPositon}</Text>
        </View>
        <View style={{flex:1,justifyContent:'center',width:200,marginLeft:100}}>
          <TouchableOpacity onPress={this.sign}>
            <Text style={{top:-200,color:'white',backgroundColor:'rgb(39,217,179)',fontSize:24,textAlign:'center',borderRadius:15,padding:10}}>立即签到</Text>
          </TouchableOpacity>
        </View>
        </ScrollView>
    )
  }
});

// <Picker
//   selectedValue={this.state.language}
//   onValueChange={(lang) => this.setState({language: lang})}>
//   <Picker.Item label="北京的工程" value="java" />
//   <Picker.Item label="北京的工程" value="java" />
//   <Picker.Item label="北京的工程" value="java" />
//   <Picker.Item label="北京的工程" value="java" />
//   <Picker.Item label="北京的工程" value="java" />
//   <Picker.Item label="JavaScript" value="js" />
// </Picker>


var styles = StyleSheet.create({
  map:{
    top:-270,
    height: 180,
    margin: 10,
    borderWidth: 1,
    borderColor: '#000000',
  },
  text:{
    top:-230,
    padding:5,
    marginTop:-20
  },
  pageView:{
    backgroundColor: '#fff',
    flex:1
  },
  picker_contain:{
    flex:1
  },
  picker1:{
    flex:1,
    width:Dimensions.get('window').width/2-20,
    left:10
  },
  picker2:{
    width:Dimensions.get('window').width/2-20,
    margin:0,
    left:Dimensions.get('window').width/2+10,
    top: -238.5
  },
  container:{
    flex:1,
    backgroundColor:'rgb(42,52,63)'
  },
  textview:{
    paddingTop:5,
    fontSize:15,
    color:'rgb(39,217,179)'
  }
});

module.exports=Location;
