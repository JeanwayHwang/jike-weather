<template>
    <div class="jike-poster">
        <image :src='shareImgUrl' mode='widthFix' style="display: none;"></image>
        <canvas id="my" style="width:545px;height:771px"></canvas>
        <button class='create-btn' @click="getImage">生成分享图</button>
        <button class='save-btn' @click="saveImage">保存到相册</button>
    </div>
</template>

<script>
import {getConditionTotem} from '@/utils/common';

export default {
    data() {
        return {
            shareImgUrl: '',
            currentCond: {}
        };
    },
    methods: {
        drawImage() {
            let fetchImg1 = new Promise((resolve, reject) => {
                wx.getImageInfo({
                    src: '/static/images/qrcode.jpg',
                    success(res) {
                        resolve(res);
                    }
                });
            });
            let fetchImg2 = new Promise((resolve, reject) => {
                let totemName = getConditionTotem(this.currentCond['cond_code']);
                wx.getImageInfo({
                    src: `/static/images/totem/${totemName}.jpg`,
                    success(res) {
                        resolve(res);
                    }
                });
            });
            Promise.all([fetchImg1, fetchImg2]).then(res => {
                const ctx = wx.createCanvasContext('canvas');
                console.log('ctx', ctx);
                // 主要就是计算好各个图文的位置
                ctx.drawImage('../../../' + res[0].path, 158, 190, 210, 210);
                ctx.drawImage('../../../' + res[1].path, 0, 0, 545, 771);
                ctx.setTextAlign('center');
                ctx.setFillStyle('#ffffff');
                ctx.setFontSize(22);
                ctx.fillText('分享文字描述1', 545 / 2, 130);
                ctx.fillText('分享文字描述2', 545 / 2, 160);
                ctx.stroke();
                ctx.draw();
            });
        },
        getImage() {
            let that = this;
            wx.showLoading({
                title: '努力生成中...'
            });
            wx.canvasToTempFilePath({
                x: 0,
                y: 0,
                width: 545,
                height: 771,
                destWidth: 545,
                destHeight: 771,
                canvasId: 'canvas',
                success(res) {
                    console.log(res.tempFilePath);
                    that.shareImgUrl = res.tempFilePath;
                    wx.hideLoading();
                },
                fail(res) {
                    console.log(res);
                }
            }, that);
        },
        saveImage() {

        }
    },
    onLoad() {
        this.currentCond = wx.getStorageSync('currentCond') || {};
        console.log('this.currentCond', this.currentCond);
        this.drawImage();
    }
};
</script>

<style lang="scss" scoped>
    canvas{
        position: fixed;
        top: 0;
        left: 0;
    }
    .create-btn {
        display: inline-block;
        padding: 8px 20px;
        border-radius: 30px;
        background-color: $iconBrown;
        color: #fff;
        font-size: 14px;
        line-height: 20px;
        position: fixed;
        left: 50%;
        transform: translateX(-50%);
        bottom: 80px;
    }
    .save-btn {
        display: inline-block;
        padding: 8px 20px;
        border-radius: 30px;
        background-color: $iconBrown;
        color: #fff;
        font-size: 14px;
        line-height: 20px;
        position: fixed;
        left: 50%;
        transform: translateX(-50%);
        bottom: 30px;
    }
    .share-image {
        width: 600rpx;
        height: 888rpx;
        margin: 0 75rpx;
        border: 1px solid black;
    }
</style>
