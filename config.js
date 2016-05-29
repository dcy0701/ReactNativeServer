var dev_host = 'http://localhost';
var host = 'http://121.42.58.11';

var HS = dev_host;

module.exports = {
  API:{
    LOGIN_API:`${HS}:3000/s/login`,
    UPDATE_API: HS+':3000/s/updateProject',
    LOCATION_API: HS+':3000/s/location',
    UPDATECHAGEMENT_API: HS+':3000/s/updateChargeman1',
    RECENT_API: HS+':3000/s/getRecent',
    URI: HS+':3000/',
    MODIFY_API: HS+':3000/s/modify',
    DISTANCE_API: HS+':3000/s/distance',
  },
  MAP_API:{
    // instance  http://apis.map.qq.com/ws/geocoder/v1/?key=WEGBZ-JPQK4-R53U5-DGPG2-UIAHF-AOBRL&location=39.984154,116.307490
    //  腾讯地图api
    GEOCODER_API:'http://apis.map.qq.com/ws/geocoder/v1/?key=WEGBZ-JPQK4-R53U5-DGPG2-UIAHF-AOBRL&coord_type=1&location='
  },
  DIFF:5000,
}
