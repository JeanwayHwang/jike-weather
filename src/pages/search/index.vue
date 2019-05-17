<template>
    <div class="jike-search">
        <div class="search-wrap">
            <div class="search-box">
                <h2 class="search-box-icon iconfont icon-book-open-outline"></h2>
                <input placeholder="请输入地区名称" v-model="searchWord"/>
                <h2 class="search-box-close iconfont icon-close-outline" @click="clearInput"></h2>
            </div>
            <button class="search-icon iconfont icon-search-outline" @click="search"></button>
        </div>
        <ul class="search-result">
            <li v-for="item in searchList" :key="item.location" @click="selectLocation(item)">
                <h2>{{item.location}}</h2>
                <h3>{{item.admin_area}}.{{item.parent_city}}{{item.parent_city !== item.location ? '.' + item.location : ''}}</h3>
            </li>
        </ul>
        <div class="select-wrap">
            <h1 class="sealect-title">历史记录</h1>
            <div class="select-list">
                <button @click="followLocation('')">当前位置</button>
                <button v-for="item in searchHistoryList" :key="item" @click="followLocation(item)">{{item}}</button>
                <button @click="clearHistory">清空历史记录</button>
            </div>
        </div>
        <div class="select-wrap">
            <h1 class="sealect-title">热门城市</h1>
            <div class="select-list">
                <button @click="followLocation('北京')">北京市</button>
                <button @click="followLocation('上海')">上海市</button>
                <button @click="followLocation('广州')">广州市</button>
                <button @click="followLocation('深圳')">深圳市</button>
                <button @click="followLocation('重庆')">重庆市</button>
                <button @click="followLocation('西安')">西安市</button>
                <button @click="followLocation('南京')">南京市</button>
                <button @click="followLocation('杭州')">杭州市</button>
                <button @click="followLocation('武汉')">武汉市</button>
                <button @click="followLocation('成都')">成都市</button>
                <button @click="followLocation('沈阳')">沈阳市</button>
                <button @click="followLocation('天津')">天津市</button>
            </div>
        </div>
    </div>
</template>

<script>
import {searchLocation} from '@/utils/api';
import {goBackPage, setCity} from '@/utils/common';
export default {
    data() {
        return {
            searchWord: '',
            searchHistoryList: [],
            searchList: []
        };
    },
    watch: {
        historyList() {
            wx.setStorageSync('searchHistoryList', this.searchHistoryList);
        }
    },
    methods: {
        clearInput() {
            this.searchWord = '';
            this.searchList = [];
        },
        clearHistory() {
            this.searchHistoryList = [];
        },
        search() {
            searchLocation(this.searchWord).then(res => {
                const searchList = res && res.HeWeather6 && res.HeWeather6[0] && res.HeWeather6[0].basic || [];
                searchList.forEach(item => {
                    let province = item.admin_area ? item.admin_area + '省' : '';
                    let city = item.parent_city ? item.parent_city + '市' : '';
                    let area = item.location ? item.location + '区' : '';
                    item.detail = province + city + area;
                });
                this.searchList = searchList;
            }).catch(err => {
                console.log(err);
            });
        },
        selectLocation(locationInfo) {
            // 点击选择过的搜索结果会记录至历史记录
            let location = locationInfo.location;
            let city = locationInfo.parent_city;
            setCity(location, city);
            this.searchHistoryList.unshift(location);
            this.followLocation(location);
        },
        followLocation(location) {
            location = location || wx.getStorageSync('nowLocation');
            if (location && this.$root.$mp.query.followFlag) {
                let followList = wx.getStorageSync('followList') || [];
                const alreadyExist = followList.some((item) => {
                    return item === location;
                });
                if (!alreadyExist) {
                    // 关注列表中未存在，则添加
                    followList.push(location);
                    wx.setStorageSync('followList', followList);
                    goBackPage();
                } else {
                    wx.showToast({
                        title: location + '已经在您的关注列表了',
                        icon: 'none'
                    });
                }
            } else {
                wx.setStorageSync('nowLocation', location);
                goBackPage();
            }
        }
    },
    mounted() {
    }
};
</script>

<style lang="scss" scoped>
    .search-wrap {
        background-color: #fff;
        padding: 15px;
        position: relative;
        .search-box {
            width: 100%;
            height: 30px;
            padding-right: 40px;
            box-sizing: border-box;
            position: relative;
            .search-box-icon {
                position: absolute;
                left: 0;
                top: 0;
                width: 30px;
                height: 30px;
                background-color: #f0f0f0;
                color: $textBrown;
                text-align: center;
                line-height: 30px;
                border-top-left-radius: 5px;
                border-bottom-left-radius: 5px;
            }
            .search-box-close {
                position: absolute;
                right: 50px;
                top: 3px;
                color: $textGrey;
            }
            input {
                width: 100%;
                font-size: 12px;
                height: 30px;
                border-radius: 5px;
                padding-left: 40px;
                padding-right: 40px;
                box-sizing: border-box;
                background-color: #f5f5f5;
                color: $textBrown;
            }
        }
        .search-icon {
            position: absolute;
            right: 15px;
            top: 15px;
            width: 30px;
            height: 30px;
            background-color: $iconBrown;
            color: #fff;
            width: 30px;
            font-size: 16px;
            line-height: 30px;
            text-align: center;
            margin: 0;
            padding: 0;
            border-radius: 5px;
        }
    }
    .search-result {
        padding: 5px 15px 10px;
        li {
            margin-top: 10px;
            h2 {
                color: $textBrown;
                font-size: 14px;
                line-height: 20px;
                position: relative;
                padding-left: 14px;
                &::before {
                    content: '';
                    display: block;
                    position: absolute;
                    left: 2px;
                    top: 7px;
                    width: 6px;
                    height: 6px;
                    border-radius: 50%;
                    background-color: $iconBrown;
                }
            }
            h3 {
                color: $textGrey;
                font-size: 12px;
                line-height: 20px;
            }
        }
    }
    .select-wrap {
        padding: 15px;
        .sealect-title {
            font-size: 18px;
            line-height: 40px;
            color: $textBrown;
        }
        .select-list {
            width: 100%;
            margin-left: -6px;
            display: flex;
            flex-wrap: wrap;
            button {
                flex: none;
                margin: 8px 6px;
                padding: 0 18px;
                border-radius: 5px;
                border: solid 1px $iconBrown;
                height: 30px;
                font-size: 12px;
                line-height: 30px;
                color: $textBrown;
                
            }
        }
    }
</style>
