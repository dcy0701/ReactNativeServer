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
  ListView,
  RefreshControl,
  Image,
  PixelRatio,
  Animated,
  Easing,
} = React;
console.log('进入最近签到记录');

import {API} from './config';

var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
var Icon = require('react-native-vector-icons/FontAwesome');

// rowHasChanged是 react组件纪录 state 是否更新的一个方法，你修改 等于和不等于并不影响你第一次显示，影响的是你state变化以后的显示情况。
// 如果是等于，state变化 页面不更新 , state不变，才更新（一般不用）。不等于就是 state变化 页面立即更新。
// 至于你输出s1，是react将数据封装成了新对象，key叫s1
// 2.了解当然最好，不了解也是不影响开发的，除非你要做自定义组件
var Recent = React.createClass({
  getInitialState(){
    return {
      isRefreshing:false,
      dataSource:ds,
      loaded:false,
      url:'',
      fadeInOpacity: new Animated.Value(0),
      rotation: new Animated.Value(0),
      fontSize: new Animated.Value(0)
    }
  },
  componentDidMount(){
    var timing = Animated.timing;
    Animated.parallel(['fadeInOpacity', 'rotation', 'fontSize'].map(property => {
                return timing(this.state[property], {
                toValue: 1,
                duration: 1000,
                easing: Easing.linear
            });
        })).start();

    AsyncStorage.getItem('user_meta',function(error,result){
      result = JSON.parse(result);
      console.log(result);
      let user = result.user_name;
      let url = API.RECENT_API+`?user=${user}`;
      this.setState({url:url});
      // console.log(url);
      this.fetchData();
    }.bind(this));
  },
  fetchData(){
    fetch(this.state.url+'&'+new Date().getTime())//防止请求 304
    .then(function(res){
      return res.json();
      })
    .then(function(json){
      //json 是当前的。。data sourse
      this.setState({
        dataSource:this.state.dataSource.cloneWithRows(json),
        loaded:true,
        isRefreshing:false
      });
    }.bind(this)).done();
  },
  _onRefresh(){
    this.setState({isRefreshing: true});
    this.fetchData();
  },
  renderLoadingView(){
    return (
      <View style={styles.container}>
          <Animated.View style={[styles.demo, {
                opacity: this.state.fadeInOpacity,
                    transform: [{
                        rotateZ: this.state.rotation.interpolate({
                            inputRange: [0,1],
                            outputRange: ['0deg', '360deg']
                        })
                    }]
                }]}>
            <Animated.Text style={{
                          fontSize: this.state.fontSize.interpolate({
                              inputRange: [0,1],
                              outputRange: [12,26]
                          })
                  }}>
                <Icon name="hourglass-half" size={60} color="#4F8EF7" />
            </Animated.Text>
        </Animated.View>
      </View>
    );

    // return (
    //   <View style={styles.container}>
    //     <Text>
    //       <Icon name="hourglass-half" size={80} color="#4F8EF7" />
    //     </Text>
    //   </View>
    // );
  },
  renderRow(data){
    // console.log('./../server/'+data.photo_url);
    //此处所有逻辑  交给后台。 后台将逆坐标转换
    // console.log(data);
    let time = new Date(parseInt(data.date));
    // console.log(time);
    let str = time.getMonth()+'月'+time.getDate()+'日'+time.getHours()+'时'+time.getMinutes()+'分';
    str += `  工程号:${data.project_id}`
    return (
    <View style={data.flag===1?styles.container:styles.container1}>
      <Image
        source={{uri:API.URI+data.photo_url.slice(9)}}
        //TODO FIXME XXX 访问静态资源！！！！！！
        style={styles.thumbnail}
        />
        <View style={styles.rightContainer}>
          <Text style={styles.title}>{data.address!==undefined?data.address:'地址获取失败'}</Text>
          <Text style={styles.year}>{str}</Text>
        </View>
    </View>
  );
  },
  render(){
    if(!this.state.loaded){
      return this.renderLoadingView();
    }
    return(
      <ScrollView
        style={styles.scrollView}
        refreshControl={
          <RefreshControl
            refreshing={this.state.isRefreshing}
            onRefresh={this._onRefresh}
            tintColor="#ff0000"
            title="深色是代签哦"
            colors={['#ff0000', '#00ff00', '#0000ff']}
            progressBackgroundColor="#ffff00"
          />
        }>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderRow}
          style={styles.listView}>
        </ListView>
      </ScrollView>
    )
  },
});
var styles = StyleSheet.create({
  scrollView:{
    top:44,
    backgroundColor:'rgb(42,52,63)'
  },
  container1:{
    flex: 1,
    borderBottomWidth:1/PixelRatio.get(),
    borderColor:'#CCCCCC',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  container: {
    borderBottomWidth:1/PixelRatio.get(),
    borderColor:'black',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgb(42,52,63)',
  },
  rightContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    marginBottom: 8,
    textAlign: 'center',
    color:'rgb(39,217,179)'
  },
  year: {
    textAlign: 'center',
    color:'rgb(39,217,179)'
  },
  thumbnail: {
    bottom:0,
    width: 70,
    height: 91,
  },
  listView: {
    paddingTop: 20,
    backgroundColor: 'rgb(42,52,63)',
  },
});

module.exports=Recent;
