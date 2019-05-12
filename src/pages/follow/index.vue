<template>
    <div class="follow-wrap">
        <div class="follow-list" v-if="followList.length > 0">
            <div class="location-box" v-for="(item, index) in followCondList" :key="index">
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
import {getCurrentWeather, getNowAir} from '@/utils/api';
import {goToPage, compareWithMoment} from '@/utils/common';
const FOLLOW_LIMIT = 10;
export default {
    data() {
        return {
            followList: wx.getStorageSync('followList') || [],
            followCondList: wx.getStorageSync('followCondList') || {}
        };
    },
    watch: {
        followList() {
            this.handleFollowCondList();
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
            goToPage('search');
        },
        editFollowList() {
            goToPage('editFollowList');
        },
        getWeatherPromise(locationName) {
            return new Promise((resolve, reject) => {
                getCurrentWeather(locationName).then(res => {
                    const data = res && res.HeWeather6 && res.HeWeather6[0] && res.HeWeather6[0].now || {};
                    resolve(data);
                }).catch(err => {
                    reject(err);
                });
            });
        },
        getAirPromise(locationName) {
            return new Promise((resolve, reject) => {
                getNowAir(locationName).then(res => {
                    const data = res && res.HeWeather6 && res.HeWeather6[0] && res.HeWeather6[0].air_now_city || {};
                    resolve(data);
                }).catch(err => {
                    reject(err);
                });
            });
        },
        handleFollowCondList() {
            let followCondListCache = wx.getStorageSync('followCondList') || {};
            // 多城市请求集合
            let fetchLocationList = [];
            let fetchPromiseList = [];
            this.followList.forEach(itemLocation => {
                let locationCond = followCondListCache[itemLocation];
                if (!locationCond || compareWithMoment(locationCond.updateTime) > 60 * 60 * 1000) {
                    // 当前城市本地未缓存天气数据 或 缓存天气数据已过期（1小时）
                    fetchLocationList.push(itemLocation);
                    fetchPromiseList.push(this.getWeatherPromise(itemLocation), this.getAirPromise(itemLocation));
                }
            });
            Promise.all(fetchPromiseList).then(dataArr => {
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
                    followCondListCache[locationName] = nowCond;
                    this.followCondList = followCondListCache;
                    wx.setStorageSync('followCondList', followCondListCache);
                });
            }).catch(err => {
                console.log(err);
            });
        }
    },
    mounted() {
        this.handleFollowCondList();
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
