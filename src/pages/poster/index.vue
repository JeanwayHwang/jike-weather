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
            let context = wx.createCanvasContext('poster');
            context.setStrokeStyle('#00ff00');
            context.setLineWidth(5);
            context.rect(0, 0, 200, 200);
            context.stroke();
            context.draw(false, this.getTempFilePath());
        },
        getTempFilePath() {
            wx.canvasToTempFilePath({
                canvasId: 'share',
                success: (res) => {
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
</style>
