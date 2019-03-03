<template>
    <div class="jike-index">
        <!--当前天气板块-->
        <div class="current-cond-wrap">
            <img :src="condTotem" alt="气象图腾" class="cond-totem">
            <div class="cond-wrap">
                <div class="cond-block now-cond-wrap">
                    <h2>当前·{{nowTime}}</h2>
                    <h3>{{currentCond.tmp}}°C</h3>
                </div>
                <div class="cond-block today-cond-wrap">
                    <h2>今日.{{weekDate}}</h2>
                    <h3>{{todayMinTmp}}~{{todayMaxTmp}}°C</h3>
                </div>
            </div>
            <h2 class="cond-text">{{currentCond.cond_txt}}</h2>
            <h2 class="air-quality"><span class="qa-great">{{airQuality.score}} 空气质量{{airQuality.grade}}</span></h2>
        </div>
        <!--逐时预报板块-->
        <div class="forecast-wrap">
            <h1>逐时天气</h1>
            <ul class="forecast-list">
                <li v-for="(item, index) in hourlyForecastList" :key="index">
                    <template v-if="item.anotherDate">
                        <div class="another-date">{{item.anotherDate}}</div>
                    </template>
                    <template v-else>
                        <h2>{{item.hour}}</h2>
                        <img :src="item.icon" :alt="item.iconName"/>
                        <h2>{{item.tmp}}°</h2>
                    </template>   
                </li>
            </ul>
        </div>
        <!--多日预报板块-->
        <div class="forecast-wrap">
            <h1>多日预报</h1>
            <ul class="forecast-list">
                <li v-for="(item, index) in dailyForecastList" :key="index">
                    <h2>{{item.weekDate}}</h2>
                    <h4>{{item.date}}</h4>
                    <img :src="item.icon" :alt="item.iconName"/>
                    <h2>{{item.maxTmp}}°</h2>
                    <h3>{{item.minTmp}}°</h3>
                </li>
            </ul>
        </div>
        <!--生活指数板块-->
        <div class="lifestyle-wrap">
            <h1 class="lifestyle-title">逐时天气</h1>
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
                <li @click="switchTab('follow')"><span class="iconfont icon-book-open-outline"></span></li>
                <li @click="switchTab('search')"><span class="iconfont icon-search-outline"></span></li>
                <li>
                    <span class="iconfont icon-external-link-outlin"></span>
                    <button class="btn-share" open-type="share"></button>
                </li>
                <li @click="switchTab('poster')"><span class="iconfont icon-image-outline"></span></li>
                <li @click="switchTab('setting')"><span class="iconfont icon-settings-outline"></span></li>
            </ul>
        </div>
    </div>
</template>

<script>
import {getWeather, getNowAir} from '@/utils/api';
import {goToPage, getConditionTotem, getConditionIcon, getLifestyleName, getLifestyleIcon, getWeekDate, getFormatTime} from '@/utils/common';

export default {
    data() {
        return {
            nowTime: '00:00',
            weekDate: '',
            currentCond: {
                'tmp': null,
                'cond_code': null,
                'cond_txt': '未知'
            },
            hourlyForecast: [], // 逐3小时预报
            dailyForecast: [], // 7天预报
            lifestyle: [], // 生活指数
            airQuality: {} // 空气质量
        };
    },
    components: {},
    watch: {
    },
    computed: {
        condTotem() {
            let totemName = getConditionTotem(this.currentCond['cond_code']);
            return `http://pnqvs14u3.bkt.clouddn.com/${totemName}.jpg`;
        },
        todayMinTmp() {
            return this.dailyForecast[0] && this.dailyForecast[0].tmp_min || 0;
        },
        todayMaxTmp() {
            return this.dailyForecast[0] && this.dailyForecast[0].tmp_max || 0;
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
        },
        hourlyForecastList() {
            let dividedOrder, anotherDate;
            let newHourlyForecast = [];
            this.hourlyForecast.forEach((item, index) => {
                let iconName = getConditionIcon(item.cond_code);
                newHourlyForecast.push({
                    hour: item.time.split(' ')[1],
                    tmp: item.tmp,
                    iconName,
                    icon: require(`../../../static/images/cond/${iconName}.png`)
                });
                if (/0[0-2]:00/.test(item.time) && index !== 0) {
                    dividedOrder = index;
                    anotherDate = (/\d{2} /.exec(item.time)[0] || '') + '日';
                }
            });
            dividedOrder && newHourlyForecast.splice(dividedOrder, 0, {anotherDate});
            return newHourlyForecast;
        },
        dailyForecastList() {
            let newDailyForecast = [];
            this.dailyForecast.forEach((item, index) => {
                let iconName = getConditionIcon(item.cond_code_d);
                let dateArr = item.date.split('-');
                newDailyForecast.push({
                    weekDate: getWeekDate(item.date),
                    date: +dateArr[1] + '.' + +dateArr[2],
                    maxTmp: item.tmp_max,
                    minTmp: item.tmp_min,
                    iconName,
                    icon: require(`../../../static/images/cond/${iconName}.png`)
                });
            });
            return newDailyForecast;
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
            this.hourlyForecast = data.hourly;
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
                    font-weight: 400;
                    font-size: 14px;
                    line-height: 20px;
                    height: 20px;
                    color: $textGrey;
                }
                h3 {
                    text-align: center;
                    font-weight: 300;
                    font-size: 30px;
                    line-height: 40px;
                    height: 40px;
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
            font-size: 52px;
            line-height: 58px;
            color: $textBrown;
        }
    }
    .forecast-wrap {
        width: 100%;
        height: auto;
        overflow-x: auto;
        margin-top: 20px;
        padding: 10px 10px;
        background-color: $bgWhite;
        box-shadow: 2px 2px 3px #ccc;
        h1 {
            font-size: 16px;
            line-height: 30px;
            color: $textBrown;
            margin-left: 18px;
        }
        .forecast-list {
            overflow-x: auto;
            white-space: nowrap;
            margin-top: 5px;
            li {
                width: 70px;
                height: auto;
                box-sizing: border-box;
                display: inline-block;
                text-align: center;
                h2 {
                    font-size: 14px;
                    line-height: 30px;
                    color: $titleGrey;
                }
                img {
                    width: 20px;
                    height: 17px;
                    display: inline-block;
                }
                h3 {
                    font-size: 14px;
                    line-height: 30px;
                    color: $secondTitleGrey;
                }
                h4 {
                    font-size: 12px;
                    line-height: 30px;
                    color: $thirdTitleGrey;
                }
                .another-date {
                    width: 100%;
                    height: 30px;
                    position: relative;
                    top: -26px;
                    color: $textBrown;
                    font-size: 16px;
                    line-height: 30px;
                }
            }
        }
    }
    .lifestyle-wrap {
        margin-top: 20px;
        padding-top: 10px;
        box-sizing: border-box;
        background-color: $bgWhite;
        .lifestyle-title {
            font-size: 16px;
            line-height: 30px;
            color: $textBrown;
            margin-left: 28px;
        }
        ul {
            margin-top: 10px;
            width: 100%;
            overflow: hidden;
            box-shadow: 2px 2px 3px #ccc;
            li {
                width: 25%;
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
                    color: $thirdTitleGrey;
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
                .btn-share {
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
