<template>
    <div class="follow-wrap">
        <div class="follow-list" v-if="followCondList.length > 0">
            <div class="location-box" v-for="(item, index) in followCondList" :key="index" @click="selectLocation(item.location)">
                <div class="box-left">
                    <h1 class="location-name">{{item.location}}</h1>
                    <h2 class="air-quality"><span class="qa-great">{{item.airScore}} 空气{{item.airGrade}}</span></h2>
                    <h3 class="tmp-range">{{item.windDir}}{{item.windGrade}}级 · {{item.condText}}</h3>
                </div>
                <div class="box-right">
                    <h1>
                        <span>{{item.tmp}}°C</span>
                        <img src="../../../static/images/cond/rainy1.png" alt="天气图标"/>
                    </h1>
                </div>
            </div>
            <button class="btn-control" @click="editFollowList">编辑地点</button>
            <button class="btn-control" @click="addLocation">添加地点</button>
        </div>
        <div class="empty-wrap" v-else>
            <h1 class="iconfont icon-book-open-outline"></h1>
            <h2>没有添加任何地点</h2>
            <button class="btn-control" @click="addLocation">添加地点</button>
        </div>
    </div>
</template>

<script>
import {getNowWeather, getNowAir} from '@/utils/api';
import {goToPage, compareWithMoment, goBackPage, getCity} from '@/utils/common';
const FOLLOW_LIMIT = 10;
export default {
    data() {
        return {
            followList: wx.getStorageSync('followList') || [],
            condList: wx.getStorageSync('condList') || {},
            followCondList: []
        };
    },
    watch: {
        followList() {
            this.handleFollowCondList();
        },
        condList() {
            this.sortFollowCondList();
        }
    },
    methods: {
        addLocation() {
            if (this.followList.length >= FOLLOW_LIMIT) {
                wx.showToast({
                    title: '关注列表超过上限啦',
                    icon: 'none'
                });
                return;
            }
            goToPage('search', {
                followFlag: true
            });
        },
        editFollowList() {
            goToPage('editFollowList');
        },
        getWeatherPromise(locationName) {
            return new Promise((resolve, reject) => {
                getNowWeather(locationName).then(res => {
                    const data = res && res.HeWeather6 && res.HeWeather6[0] && res.HeWeather6[0].now || {};
                    resolve(data);
                }).catch(err => {
                    reject(err);
                });
            });
        },
        getAirPromise(location) {
            return new Promise((resolve, reject) => {
                let city = getCity(location);
                getNowAir(location).then(res => {
                    const data = res && res.HeWeather6 && res.HeWeather6[0] && res.HeWeather6[0].air_now_city;
                    if (!data && location !== city) {
                        // 当前县区（district）若获取不到空气质量，则再次请求接口时传参使用location=city
                        getNowAir(city).then(res => {
                            const data = res && res.HeWeather6 && res.HeWeather6[0] && res.HeWeather6[0].air_now_city;
                            resolve(data);
                        });
                    } else {
                        resolve(data);
                    }
                }).catch(err => {
                    reject(err);
                });
            });
        },
        handleFollowCondList() {
            let condList = wx.getStorageSync('condList') || {};
            let fetchLocationList = [];
            let fetchPromiseList = [];
            // 关注列表的增减，意味着followCondList也需要同步增减
            for (let location in condList) {
                let alreadyExist = this.followList.some((item) => {
                    return item === location;
                });
                if (!alreadyExist) {
                    // condList存在当前关注列表之外的城市，则移除掉
                    delete condList[location];
                }
            }
            // 对于未缓存或已过期的城市，重新获取天气信息
            this.followList.forEach(location => {
                let locationCond = condList[location];
                if (!locationCond || compareWithMoment(locationCond.updateTime) > 60 * 60 * 1000) {
                    // 当前城市本地未缓存天气数据 或 缓存天气数据已过期（1小时）
                    fetchLocationList.push(location);
                    fetchPromiseList.push(this.getWeatherPromise(location), this.getAirPromise(location));
                }
            });
            // 获取信息
            if (fetchPromiseList.length > 0) {
                return Promise.all(fetchPromiseList).then(dataArr => {
                    fetchLocationList.forEach((locationName, index) => {
                        let nowCond = {location: locationName};
                        let weather = dataArr[2 * index];
                        let air = dataArr[2 * index + 1];
                        nowCond.tmp = weather.tmp;
                        nowCond.condText = weather.cond_txt;
                        nowCond.condCode = weather.cond_code;
                        nowCond.windDir = weather.wind_dir;
                        nowCond.windGrade = weather.wind_sc;
                        nowCond.airScore = air.aqi || 0;
                        nowCond.airGrade = air.qlty || '不明';
                        nowCond.updateTime = new Date().getTime();
                        condList[locationName] = nowCond;
                    });
                    // 存储最新的condList
                    wx.setStorageSync('condList', condList);
                    this.condList = condList;
                }).catch(err => {
                    console.log(err);
                });
            }
            // 存储最新的condList
            wx.setStorageSync('condList', condList);
            this.condList = condList;
        },
        sortFollowCondList() {
            // 根据followList顺序映射出带天气信息的followCondList
            let followCondList = [];
            this.followList.forEach(location => {
                let locationCond = this.condList[location];
                if (locationCond) {
                    followCondList.push(locationCond);
                }
            });
            this.followCondList = followCondList;
        },
        selectLocation(location) {
            wx.setStorageSync('nowLocation', location);
            goBackPage();
        }
    },
    onShow() {
        this.followList = wx.getStorageSync('followList') || [];
    }
};
</script>

<style lang="scss" scoped>
    .empty-wrap {
        margin-top: 45%;
        text-align: center;
        h1 {
            font-size: 50px;
            color: $textBrown;
        }
        h2 {
            margin-top: 10px;
            font-size: 12px;
            line-height: 30px;
            color: $iconGrey;
        }
    }
    .location-box {
        margin: 15px;
        padding: 10px 15px;
        border-radius: 5px;
        background-color: #fff;
        box-sizing: border-box;
        overflow: hidden;
        .box-left {
            width: 60%;
            float: left;
            h1 {
                font-weight: 500;
                font-size: 16px;
                line-height: 20px;
                color: $iconBrown;
            }
            h2 {
                margin-top: 8px;
                text-align: left;
            }
            h3 {
                margin-top: 4px;
                font-weight: 500;
                font-size: 12px;
                line-height: 20px;
                color: $iconGrey;
                padding-left: 2px;
            }
        }
        .box-right {
            width: 40%;
            float: right;
            h1 {
                margin-top: 17px;
                text-align: right;
                span {
                    font-size: 24px;
                    line-height: 30px;
                    height: 30px;
                    color: $iconBrown;
                }
                img {
                    width: 32px;
                    height: 30px;
                    display: inline-block;
                    vertical-align: middle;
                    margin-left: 6px;
                }
            }
        }
    }
    .btn-control {
        text-align: center;
        width: 200px;
        height: 40px;
        margin-top: 10px;
        background-color: #fff;
        border-radius: 20px;
        font-size: 14px;
        line-height: 40px;
        color: $iconGrey;
        &:after {
            border: none;
        }
    }
</style>
