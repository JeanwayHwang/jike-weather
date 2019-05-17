<template>
    <div class="jike-poster">
        <painter :customStyle="customStyle" @imgOK="onImgOk" :palette="template" :dirty="true"/>
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
            shareImgUrl: '',
            customStyle: 'border: solid 1rpx #eee; margin-top: 60rpx; margin-left: 48rpx',
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
        onImgOk(e) {
            this.shareImgUrl = e.target.path;
        },
        saveImage() {
            if (!this.shareImgUrl) {
                wx.showToast({
                    title: '图片生成中，请稍后再尝试吧',
                    icon: 'none'
                });
                return;
            }
            wx.saveImageToPhotosAlbum({
                filePath: this.shareImgUrl,
                success(res) {
                    wx.hideLoading();
                    wx.showModal({
                        title: '提示',
                        showCancel: false,
                        confirmText: '知道了',
                        confirmColor: '#0facf3',
                        content: '图片已保存到手机相册，去分享吧',
                        success: (res) => {
                            if (res.confirm) {
                                console.log('保存成功');
                            }
                        }
                    });
                },
                fail(res) {
                    wx.hideLoading();
                    wx.showModal({
                        title: '保存失败',
                        showCancel: false,
                        confirmText: '知道了',
                        confirmColor: '#0facf3',
                        content: '您拒绝了授权，若要保存图片，请删除小程序，再重新打开',
                        success: (res) => {
                            console.log(res);
                        }
                    });
                }
            });
        }
    },
    onLoad() {
        let currentCond = wx.getStorageSync('currentCond') || {};
        let totemName = getConditionTotem(currentCond['cond_code']);
        let cardInfo = {
            totemImgUrl: `/static/images/totem/${totemName}.jpg`,
            qrcodeImgUrl: '/static/images/qrcode.png',
            location: currentCond.location,
            tmp: currentCond.tmp + '°',
            condTxt: currentCond.cond_txt || '?',
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
