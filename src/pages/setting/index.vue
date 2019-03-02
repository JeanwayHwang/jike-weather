<template>
    <div class="jike-setting">
        <div class="logo-wrap">
            <img src="../../../static/images/logo.png" alt="Logo">
            <h1>即刻天气Pro 1.0.0</h1>
        </div>

        <div class="setting-wrap">
            <navigator url="/pages/info/main?type=permission" class="weui-cell weui-cell_access" hover-class="weui-cell_active">
                <button class="btn-wx" open-type="openSetting"></button>
                <div class="weui-cell__hd"><span class="item-icon iconfont icon-shield-outline"></span></div>
                <div class="weui-cell__bd">授权管理</div>
                <div class="weui-cell__ft weui-cell__ft_in-access"></div>
            </navigator>
            <navigator url="/pages/info/main?type=solution" class="weui-cell weui-cell_access" hover-class="weui-cell_active">
                <div class="weui-cell__hd"><span class="item-icon iconfont icon-question-mark-circle"></span></div>
                <div class="weui-cell__bd">常见问题</div>
                <div class="weui-cell__ft weui-cell__ft_in-access"></div>
            </navigator>
            <navigator url="/pages/info/main?type=data" class="weui-cell weui-cell_access" hover-class="weui-cell_active">
                <div class="weui-cell__hd"><span class="item-icon iconfont icon-radio-outline"></span></div>
                <div class="weui-cell__bd">数据来源</div>
                <div class="weui-cell__ft weui-cell__ft_in-access"></div>
            </navigator>
            <navigator url="/pages/info/main?type=author" class="weui-cell weui-cell_access" hover-class="weui-cell_active">
                <div class="weui-cell__hd"><span class="item-icon iconfont icon-bulb-outline"></span></div>
                <div class="weui-cell__bd">关于作者</div>
                <div class="weui-cell__ft weui-cell__ft_in-access"></div>
            </navigator>
        </div>

        <div class="setting-wrap">
            <navigator class="weui-cell weui-cell_access" hover-class="weui-cell_active">
                <button class="btn-wx" open-type="feedback"></button>
                <div class="weui-cell__hd"><span class="item-icon iconfont icon-message-circle-outli"></span></div>
                <div class="weui-cell__bd">反馈</div>
                <div class="weui-cell__ft weui-cell__ft_in-access"></div>
            </navigator>
            <navigator @click="rewardAuthor" class="weui-cell weui-cell_access" hover-class="weui-cell_active">
                <div class="weui-cell__hd"><span class="item-icon iconfont icon-heart-outline"></span></div>
                <div class="weui-cell__bd">赞赏</div>
                <div class="weui-cell__ft weui-cell__ft_in-access"></div>
            </navigator>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {};
    },
    methods: {
        rewardAuthor() {
            wx.previewImage({
                urls: ['http://pnqvs14u3.bkt.clouddn.com/reward_code.jpg']
            });
        }
    },
    mounted() {
    }
};
</script>

<style lang="scss" scoped>
    .logo-wrap {
        width: 100%;
        text-align: center;
        padding: 30px 0 0;
        img {
            width: 43px;
            height: 22px;
            display: inline-block;
        }
        h1 {
            width: 100%;
            font-weight: 400;
            font-size: 12px;
            line-height: 30px;
            height: 30px;
            color: $textBrown;
        }
    }
    .setting-wrap {
        width: auto;
        margin: 20px 15px 0;
        border-radius: 10px;
        background-color: #fff;
        .item-icon {
            color: $iconGrey;
        }
        .weui-cell__bd {
            padding-left: 5px;
            color: $iconGrey;
            font-size: 14px;
        }
        .weui-cell {
            position: relative;
            .btn-wx {
                width: 100%;
                height: 40px;
                position: absolute;
                left: 0;
                top: 0;
                background-color: transparent;
                &::after{
                    border: none; 
                }
            }
        }
    }
</style>
