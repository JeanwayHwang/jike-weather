<template>
    <div class="edit-follow-wrap">
        <div class="location-item" v-for="(item, index) in followList" :key="index">
            <h2 class="city-name">{{item}}</h2>
            <h3 class="btn-drag iconfont icon-move-outline" :id="'item' + index" @touchend="moveCity($event, item, index)"></h3>
            <h3 class="btn-delete iconfont icon-trash--outline" @click="deleteCity(item, index)"></h3>
        </div>
    </div>
</template>

<script>
import {goToPage} from '@/utils/common';
export default {
    data() {
        return {
            followList: wx.getStorageSync('followList') || []
        };
    },
    watch: {
        followList() {
            wx.setStorageSync('followList', this.followList);
            if (this.followList.length === 0) {
                // 收藏城市列表已清空，返回上一页（收藏页）
                goToPage('follow');
            }
        }
    },
    methods: {
        exchangeList(array, currentIndex, direction) {
            let targetIndex, item1, item2;
            if (direction === 'after') {
                if (currentIndex === array.length - 1) {
                    return;
                }
                targetIndex = currentIndex + 1;
                item1 = array[targetIndex];
                item2 = array[currentIndex];
            } else if (direction === 'before') {
                if (currentIndex === 0) {
                    return;
                }
                targetIndex = currentIndex - 1;
                item1 = array[currentIndex];
                item2 = array[targetIndex];
            }
            // 利用索引直接赋值时数组无法被watch，因此采用splice的方式进行元素交换
            array.splice(Math.min(currentIndex, targetIndex), 2, item1, item2);
            return array;
        },
        moveCity(e, item, index) {
            let that = this;
            wx.createSelectorQuery().select('#' + e.target.id).boundingClientRect().exec(function (res) {
                let pageY = e.mp.changedTouches[0].pageY;
                if (pageY - res[0].top >= 10) {
                    // 有效的向下滑动距离
                    that.followList = that.exchangeList(that.followList, index, 'after');
                    console.log('down', that.followList);
                } else if (res[0].top - pageY >= 10) {
                    // 有效的向上滑动距离
                    that.followList = that.exchangeList(that.followList, index, 'before');
                    console.log('up', that.followList);
                }
            });
        },
        deleteCity(item, index) {
            let that = this;
            wx.showModal({
                title: '温馨提示',
                content: '确定要把' + item + '从收藏夹移除吗？',
                success(res) {
                    if (res.confirm) {
                        that.followList.splice(index, 1);
                    }
                }
            });
        }
    },
    mounted() {
        console.log(this.followList);
    }
};
</script>

<style lang="scss" scoped>
    .location-item {
        margin: 15px;
        height: 40px;
        border-radius: 5px;
        background-color: #fff;
        box-sizing: border-box;
        overflow: hidden;
        position: relative;
        color: $iconGrey;
        .city-name {
            font-weight: 500;
            font-size: 12px;
            line-height: 40px;
            padding-left: 15px;
        }
        .btn-drag {
            font-size: 10px;
            position: absolute;
            right: 45px;
            top: 8px;
            font-size: 16px;
        }
        .btn-delete {
            font-size: 10px;
            position: absolute;
            right: 15px;
            top: 8px;
            font-size: 16px;
            color: $red;
        }
    }
</style>
