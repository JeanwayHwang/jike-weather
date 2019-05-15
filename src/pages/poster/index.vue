<template>
    <div class="jike-poster">
        <painter :customStyle="customStyle" :imgOK="onImgOk" :palette="template" :dirty="true"/>
        <div class="btn-wrap">
            <button class='save-btn' @click="saveImage">保存到相册</button>
        </div>
    </div>
</template>

<script>
import {getConditionTotem} from '@/utils/common';
import Card from '../../palette/card';
export default {
    data() {
        return {
            customStyle: 'border: solid 1rpx #ccc;border-radius: 20rpx; margin-top: 60rpx; margin-left: 48rpx',
            nickName: '',
            avatarUrl: '',
            template: {}
        };
    },
    methods: {
        getUserInfo() {
            wx.getUserInfo({
                success(res) {
                    const userInfo = res.userInfo;
                    this.nickName = userInfo.nickName;
                    this.avatarUrl = userInfo.avatarUrl;
                }
            });
        },
        onImgOK(e) {
            // https://www.jianshu.com/p/516b66dca84c
            // https://www.jianshu.com/p/2a140f7e7e73
            console.log('222222', e.target.path);
            console.log(e.mp.detail.path);
            console.log(e.target.path);
        },
        saveImage() {
        }
    },
    onLoad() {
        let currentCond = wx.getStorageSync('currentCond') || {};
        let totemName = getConditionTotem(currentCond['cond_code']);
        let cardInfo = {
            totemImgUrl: `/static/images/totem/${totemName}.jpg`,
            qrcodeImgUrl: '/static/images/qrcode.png',
            location: currentCond.location || '上海市',
            todayMinTmp: '10',
            todayMaxTmp: '20'
        };
        console.log('1', currentCond, cardInfo);
        this.template = new Card().do(cardInfo);
    }
};
</script>

<style lang="scss" scoped>
    .btn-wrap {
        width: 80%;
        height: auto;
        position: fixed;
        bottom: 40px;
        left: 10%;
        display: flex;
        justify-content: space-between;
        button {
            padding: 8px 24px;
            border-radius: 30px;
            background-color: $iconBrown;
            color: #fff;
            font-size: 14px;
            line-height: 20px;
        }
    }
</style>
