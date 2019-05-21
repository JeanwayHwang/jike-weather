<template>
    <div class="jike-poster">
        <painter :customStyle="customStyle" @imgOK="onImgOk" :palette="template" :dirty="true" v-show="imgLoaded"/>
        <div class="btn-wrap">
            <button class='save-btn' @click="rePaint">重新生成</button>
            <button class='save-btn' @click="saveImage">保存相册</button>
        </div>
    </div>
</template>

<script>
import {getConditionTotem, getConditionIcon} from '@/utils/common';
import Card from '../../palette/card';
const ShareBgList = [
    'https://huangzhenwei.cn/jike/share1.jpg',
    'https://huangzhenwei.cn/jike/share2.jpg',
    'https://huangzhenwei.cn/jike/share3.jpg',
    'https://huangzhenwei.cn/jike/share4.jpg',
    'https://huangzhenwei.cn/jike/share5.jpg',
    'https://huangzhenwei.cn/jike/share6.jpg',
    'https://huangzhenwei.cn/jike/share7.jpg',
    'https://huangzhenwei.cn/jike/share8.jpg',
    'https://huangzhenwei.cn/jike/share9.jpg',
    'https://huangzhenwei.cn/jike/share10.jpg',
    'https://huangzhenwei.cn/jike/share11.jpg',
    'https://huangzhenwei.cn/jike/share12.jpg'
];
const PoemList = [
    '想念，就是穿过时间去看你',
    '天空没有翅膀的痕迹，而我已飞过',
    '离你越近的地方，路途越远',
    '你是我流浪过的一个地方',
    '感情只是陪伴我们的小灯，时明时灭',
    '早晨是一只花鹿，踩到我的额上',
    '对我笑吧，就像你我初次见面',
    '想起我吧，在你变老的那一年',
    '你是我赖以生存的空气',
    '你是我温暖的手套，冰冷的啤酒',
    '松花酿酒，春水煎茶',
    '两水夹明镜，双桥落彩虹',
    '林下漏月光，疏疏如残雪',
    '山中无甲子，寒尽不知年',
    '连雨不知春去，一晴方觉夏深',
    '我是梦中传彩笔，欲书花叶寄朝云',
    '细雨湿衣看不见，闲花落地听无声',
    '窗外月华霜重，听彻梅花弄',
    '浮云在空碧，来往议阴晴'
];

export default {
    data() {
        return {
            imgLoaded: false,
            nowDate: '',
            currentCond: {},
            shareImgUrl: '',
            customStyle: 'margin-top: 80rpx; margin-left: 40rpx',
            nickName: '',
            avatarUrl: '',
            template: {}
        };
    },
    methods: {
        onImgOk(e) {
            this.imgLoaded = true;
            wx.hideLoading();
            this.shareImgUrl = e.target.path;
        },
        rePaint() {
            wx.showLoading({title: '拼命生成中...'});
            let currentCond = this.currentCond;
            let totemName = getConditionTotem(currentCond.cond_code);
            let cardInfo = {
                nowDate: this.nowDate,
                condIcon: `/static/images/cond/${getConditionIcon(currentCond.cond_code)}.png`,
                totemImgUrl: `/static/images/totem/${totemName}.jpg`,
                qrcodeImgUrl: '/static/images/qrcode.png',
                location: currentCond.location,
                tmp: currentCond.tmp + '°',
                condTxt: currentCond.cond_txt,
                windDir: currentCond.wind_dir,
                score: currentCond.score,
                grade: currentCond.grade,
                poem: PoemList[Math.floor(Math.random() * PoemList.length)],
                shareBg: ShareBgList[Math.floor(Math.random() * ShareBgList.length)]
            };
            this.template = new Card().do(cardInfo);
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
        let month = new Date().getMonth() + 1;
        let day = new Date().getDate();
        this.nowDate = `${month}月${day}日`;
        this.currentCond = wx.getStorageSync('currentCond') || {};
        this.rePaint();
    }
};
</script>

<style lang="scss" scoped>
    .btn-wrap {
        width: 80%;
        height: auto;
        position: fixed;
        bottom: 70px;
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
