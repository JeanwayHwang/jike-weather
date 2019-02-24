<template>
    <div class="jike-index">
        <div class="current-cond">
            <img src="../../../static/images/totem/sunny.jpg" alt="气象图腾" class="cond-totem">
            <h2 class="cond-tmp">{{currentCond.tmp}}°</h2>
            <h2 class="cond-text-wrap"><span class="cond-text">{{currentCond.cond_txt}}</span></h2>
            <h2>气象图标：{{condIcon}}</h2>
        </div>
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
import {getCurrentWeather} from '@/utils/api';
import {goToPage, getConditionIcon} from '@/utils/common';

export default {
    data() {
        return {
            condTotem: 'sunny',
            currentCond: {
                'tmp': null,
                'cond_code': null,
                'cond_txt': '未知'
            }
        };
    },
    components: {},
    watch: {},
    computed: {
        condIcon() {
            return getConditionIcon(this.currentCond['cond_code']);
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
        // mpvue.switchTab({url: '../logs/main'});
        getCurrentWeather().then(data => {
            console.log('data', data);
            this.currentCond = data.HeWeather6 && data.HeWeather6[0] && data.HeWeather6[0].now || {};
        }).catch(err => {
            console.log(err);
        });
    }
};
</script>

<style lang="scss" scoped>
    .current-cond {
        .cond-totem {
            display: block;
            width: 300px;
            height: 210px;
            margin: -10px auto 0;
        }
        .cond-tmp {
            font-family: 'Microsoft Yahei';
            font-weight: 300;
            font-size: 44px;
            text-align: center;
        }
        .cond-text-wrap {
            text-align: center;
            .cond-text {
                font-family: 'xiaoli';
                font-size: 36px;
                
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
</style>
