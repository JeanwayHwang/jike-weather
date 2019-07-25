<template>
    <div class="about-author-wrap">
        <div class="text-box">
            <h1>作者</h1>
            <div class="author-info">
                <img src="../../static/images/author.jpeg" alt="作者头像"/>
                <h2>元首小黄</h2>
                <h3>民谣・皇马・程序猿・铲屎官</h3>
                <div class="control-list">
                    <button @click="followWeixin">微信</button>
                    <button @click="followWeibo">微博</button>
                    <button @click="rewardAuthor">赞赏</button>
                </div>
            </div>
        </div>
        <div class="text-box">
            <h1>寄语</h1>
            <p>白日不到处，青春恰自来。</p>   
        </div>
    </div>
</template>

<script>

export default {
    data() {
        return {
        };
    },
    methods: {
        followWeixin() {
            wx.setClipboardData({
                data: 'Ryan__37',
                success(res) {
                    wx.showToast({
                        title: '已复制微信号',
                        icon: 'none'
                    });
                }
            });
        },
        followWeibo() {
            wx.setClipboardData({
                data: '炮灰小黄',
                success(res) {
                    wx.showToast({
                        title: '已复制微博昵称',
                        icon: 'none'
                    });
                }
            });
        },
        rewardAuthor() {
            wx.previewImage({
                urls: ['https://huangzhenwei.cn/jike/reward_code.jpg']
            });
        }
    },
    mounted() {
    }
};
</script>

<style lang="scss" scoped>
    .author-info {
        width: 100%;
        margin-top: 10px;
        text-align: center;
        img {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            display: inline-block;
        }
        h2 {
            font-size: 14px;
            line-height: 30px;
            height: 30px;
            color: $titleGrey;
        }
        h3 {
            font-size: 12px;
            line-height: 28px;
            height: 28px;
            color: $titleGrey;
        }
    }
    .control-list {
        margin: 10px 0;
        width: 100%;
        display: flex;
        align-items: center;
        button {
            padding: 0 15px;
            background-color: #fff;
            border-radius: 24px;
            border: solid 1px $textBrown;
            font-size: 12px;
            line-height: 26px;
            height: 26px;
        }
    }
</style>
