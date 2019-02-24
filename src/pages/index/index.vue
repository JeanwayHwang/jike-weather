<template>
    <div class="jike-index">
        <!--当前天气板块-->
        <div class="current-cond-wrap">
            <img src="../../../static/images/totem/sunny.jpg" alt="气象图腾" class="cond-totem">
            <div class="cond-wrap">
                <div class="cond-block now-cond-wrap">
                    <h2>当前.{{nowTime}}</h2>
                    <h3>{{currentCond.tmp}}°C</h3>
                </div>
                <div class="cond-block today-cond-wrap">
                    <h2>今日.{{weekDate}}</h2>
                    <h3>{{todayMinTmp}}~{{todayMaxTmp}}°C</h3>
                </div>
            </div>
            <h2 class="cond-text">{{currentCond.cond_txt}}</h2>
            <h2 class="cond-quality"><span class="qa-great">{{airQuality.score}} 空气质量{{airQuality.grade}}</span></h2>
        </div>
        <!--逐时预报板块-->
        <!--多日预报板块-->
        <!--生活指数板块-->
        <div class="lifestyle-wrap">
            <ul>
                <li v-for="item in lifeStyle" :key="item">
                    <h1 class="iconfont lifestyle-icon" :class="item.iconClass"></h1>
                    <h2>{{item.type}}</h2>
                    <h3>{{item.brf}}</h3>
                </li>
            </ul>
        </div>
        <!--贴底导航-->
        <div class="footer-tab">
            <ul class="footer-tab-list">
                <li @click="switchTab('collection')"><span class="iconfont icon-book-open-outline"></span></li>
                <li @click="switchTab('search')"><span class="iconfont icon-search-outline"></span></li>
                <li>
                    <span class="iconfont icon-external-link-outlin"></span>
                    <button class="btnShare" open-type="share"></button>
                </li>
                <li @click="switchTab('poster')"><span class="iconfont icon-image-outline"></span></li>
                <li @click="switchTab('setting')"><span class="iconfont icon-settings-outline"></span></li>
            </ul>
        </div>
    </div>
</template>

<script>
import {getWeather, getNowAir} from '@/utils/api';
import {goToPage, getConditionIcon, getLifestyleName, getLifestyleIcon, getWeekDate, getFormatTime} from '@/utils/common';

export default {
    data() {
        return {
            nowTime: '00:00',
            weekDate: '',
            condTotem: 'sunny', // 气象图腾
            currentCond: {
                'tmp': null,
                'cond_code': null,
                'cond_txt': '未知'
            },
            hourlyForcast: [], // 逐3小时预报
            dailyForecast: [], // 7天预报
            lifestyle: [], // 生活指数
            airQuality: {} // 空气质量
        };
    },
    components: {},
    watch: {},
    computed: {
        condIcon() {
            return getConditionIcon(this.currentCond['cond_code']);
        },
        todayMinTmp() {
            return this.dailyForecast[0] && this.dailyForecast[0].tmp_min;
        },
        todayMaxTmp() {
            return this.dailyForecast[0] && this.dailyForecast[0].tmp_max;
        },
        lifeStyle() {
            let newLifestyle = [];
            for (var i = 0; i < this.lifestyle.length; i++) {
                let item = this.lifestyle[i];
                const originType = item.type || '';
                item.type = getLifestyleName(originType);
                item.iconClass = getLifestyleIcon(originType);
                newLifestyle.push(item);
            }
            return newLifestyle;
        }
    },
    methods: {
        /**
         * 分享小程序给微信好友/群
         */
        switchTab(targetPage) {
            goToPage(targetPage);
        }
    },

    mounted() {
        this.nowTime = getFormatTime();
        this.weekDate = getWeekDate();
        // 获取天气状况合集
        getWeather('上海').then(res => {
            const data = res && res.HeWeather6 && res.HeWeather6[0] || {};
            this.currentCond = data.now;
            this.hourlyForcast = data.hourly;
            this.dailyForecast = data.daily_forecast;
            this.lifestyle = data.lifestyle;
        }).catch(err => {
            console.log(err);
        });
        // 获取当前空气质量数据
        getNowAir('上海').then(res => {
            const data = res && res.HeWeather6 && res.HeWeather6[0] || {};
            this.airQuality = {
                score: data.air_now_city && data.air_now_city.aqi || 0,
                grade: data.air_now_city && data.air_now_city.qlty || '不明'
            };
        }).catch(err => {
            console.log(err);
        });
    }
};
</script>

<style lang="scss" scoped>
    .current-cond-wrap {
        .cond-totem {
            display: block;
            width: 300px;
            height: 210px;
            margin: -10px auto 0;
        }
        .cond-wrap{
            width: 100%;
            height: 56px;
            position: relative;
            margin: -20px auto 0;
            .cond-block {
                width: 100%;
                height: 56px;
                position: absolute;
                left: 0;
                top: 0;
                h2 {
                    text-align: center;
                    font-family: 'Microsoft Yahei';
                    font-weight: 400;
                    font-size: 12px;
                    line-height: 20px;
                    height: 20px;
                    color: $textGrey;
                }
                h3 {
                    text-align: center;
                    font-family: 'Microsoft Yahei';
                    font-weight: 300;
                    font-size: 30px;
                    line-height: 36px;
                    height: 36px;
                    color: $textBrown;
                }
            }
        }
        .now-cond-wrap {
            opacity: 1;
            animation: showHideLoop 5s linear infinite alternate;
        }
        .today-cond-wrap {
            opacity: 0;
            animation: hideShowLoop 5s linear infinite alternate;
        }
        .cond-text {
            text-align: center;
            margin-left: 5px;
            font-family: 'xiaoli';
            font-size: 48px;
            height: 50px; 
            color: $textBrown;
        }
        .cond-quality {
            margin-top: 5px;
            width: 100%;
            text-align: center;
            width: auto;
            font-size: 10px;
            line-height: 14px;
            color: #fff;
            span {
                padding: 2px 6px;
                display: inline-block;
                border-radius: 5px;
            }
            .qa-great {
                background-color: $green;
            }
            .qa-good {
                background-color: $yellow;
            }
            .qa-bad {
                background-color: $orange;
            }
        }
        
    }
    .lifestyle-wrap {
        margin-top: 30px;
        ul {
            width: 100%;
            overflow: hidden;
            box-shadow: 2px 2px 3px #ccc;
            li {
                width: 24.5%;
                float: left;
                margin-bottom: 15px;
                position: relative;
                &::after {
                    position: absolute;
                    right: -1px;
                    top: 0;
                    height: 100%;
                    content: '';
                    display: block;
                    border-right: solid 1px #eee;
                }
                .lifestyle-icon {
                    text-align: center;
                    color: #666;
                    font-size: 14px;
                    line-height: 18px;
                }
                h2 {
                    text-align: center;
                    font-family: 'Microsoft Yahei';
                    font-weight: 400;
                    font-size: 12px;
                    line-height: 18px;
                    color: $textGrey;
                }
                h3 {
                    text-align: center;
                    font-family: 'Microsoft Yahei';
                    font-weight: 400;
                    font-size: 14px;
                    line-height: 20px;
                    color: $textGrey;
                }
            }
            li:nth-of-type(4n) {
                &::after {
                    display: none;
                }
            }
        }
    }
    .footer-tab {
        width: 100%;
        height: 50px;
        background-color: #fff;
        position: fixed;
        left: 0;
        bottom: 0;
        .footer-tab-list {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: space-around;
            li {
                flex: 1;
                display: block;
                text-align: center;
                position: relative;
                span {
                    display: inline-block;
                    font-size: 24px;
                    line-height: 50px;
                    color: $iconGrey;
                }
                .btnShare {
                    width: 30px;
                    height: 24px;
                    display: inline-block;
                    background-color: transparent;
                    position: absolute;
                    left: 50%;
                    top: 50%;
                    transform: translate3d(-50%, -50%, 0);
                    &::after{
                        border: none; 
                    }
                }
            }
        }
    }

    @keyframes hideShowLoop {
        0% {
            opacity: 0;
        }
        45% {
            opacity: 0;
        }
        55% {
            opacity: 1;
        }
        100% {
            opacity: 1;
        }
    }
    @keyframes showHideLoop {
        0% {
            opacity: 1;
        }
        45% {
            opacity: 1;
        }
        55% {
            opacity: 0;
        }
        100% {
            opacity: 0;
        }
    }
</style>
