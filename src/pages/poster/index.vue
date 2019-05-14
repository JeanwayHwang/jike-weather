<template>
    <div class="jike-poster">
        <canvas canvas-id='poster' style='width:100vw;height:90vh;'></canvas>
        <button class='save-btn' @click="saveImage">保存到相册</button>
    </div>
</template>

<script>

export default {
    data() {
        return {
            currentCond: {}
        };
    },
    methods: {
        drawImage() {
            var ctx = wx.createCanvasContext('poster');
            ctx.drawImage('/static/images/totem/sunny.jpg', 0, 0, 288, 200);
            ctx.setFontSize(70);
            ctx.setFillStyle('#fbba15');
            ctx.fillText('222', '333', 420);
            ctx.setFontSize(60);
            ctx.fillText('2222秒', 325, 560);
            ctx.draw(false, function () {
                wx.canvasToTempFilePath({
                    canvasId: 'canvasimg',
                    success: function (res) {
                        var tempFilePath = res.tempFilePath;
                        wx.previewImage({
                            current: tempFilePath,
                            urls: [tempFilePath]
                        });
                        wx.hideToast();
                    },
                    fail: function (res) {
                        console.log('ERROR');
                        console.log(res);
                    }
                });
            });
        },
        getTempFilePath() {
            wx.canvasToTempFilePath({
                canvasId: 'share',
                success: (res) => {
                    console.log('222', res);
                    this.shareTempFilePath = res.tempFilePath;
                }
            });
        },
        saveImage() {
            wx.saveImageToPhotosAlbum({
                filePath: this.shareTempFilePath,
                success: res => {
                    console.log(res);
                },
                fail: err => {
                    console.log(err);
                }
            });
        }
    },
    onReady() {
        this.currentCond = wx.getStorageSync('currentCond') || {};
        console.log('this.currentCond', this.currentCond);
        this.drawImage();
    }
};
</script>

<style lang="scss" scoped>
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
</style>
