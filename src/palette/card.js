// 分享图绘制的配置文件
export default class LastMayday {
    do(cardInfo) {
        this.cardInfo = JSON.parse(JSON.stringify(cardInfo));
        return this.template();
    }
    template() {
        return ({
            background: '#fff',
            width: '670rpx',
            height: '800rpx',
            borderRadius: '20rpx',
            views: [{
                type: 'rect',
                css: {
                    top: '20rpx',
                    left: '20rpx',
                    width: '630rpx',
                    height: '860rpx',
                    color: '#fff'
                }
            },
            {
                type: 'image',
                url: this.cardInfo.shareBg,
                css: {
                    top: '20rpx',
                    left: '20rpx',
                    width: '630rpx',
                    height: '394rpx'
                }
            },
            {
                type: 'text',
                text: this.cardInfo.tmp,
                css: {
                    left: '100rpx',
                    top: '40rpx',
                    fontSize: '70rpx',
                    color: '#fff',
                    align: 'center'
                }
            },
            {
                type: 'image',
                url: this.cardInfo.condIcon,
                css: {
                    left: '150rpx',
                    top: '80rpx',
                    width: '35rpx',
                    height: '30rpx'
                }
            },
            {
                type: 'text',
                text: this.cardInfo.condTxt,
                css: {
                    left: '200rpx',
                    top: '82rpx',
                    fontSize: '22rpx',
                    color: '#fff'
                }
            },
            {
                type: 'text',
                text: '即刻天气',
                css: {
                    right: '40rpx',
                    top: '380rpx',
                    fontSize: '14rpx',
                    color: '#fff'
                }
            },
            {
                type: 'rect',
                css: {
                    left: '46rpx',
                    top: '124rpx',
                    width: '100rpx',
                    height: '25rpx',
                    background: '#000',
                    borderRadius: '5rpx',
                    borderColor: '#fff',
                    color: '#64aa74'
                }
            },
            {
                type: 'text',
                text: '空气质量：' + this.cardInfo.grade,
                css: {
                    left: '96rpx',
                    top: '128rpx',
                    fontSize: '14rpx',
                    lineHeight: '25rpx',
                    color: '#fff',
                    align: 'center'
                }
            },
            {
                type: 'text',
                text: this.cardInfo.poem,
                css: {
                    left: '24rpx',
                    top: '460rpx',
                    fontSize: '20rpx',
                    color: '#222',
                    align: 'left'
                }
            },
            {
                type: 'text',
                text: this.cardInfo.location,
                css: {
                    right: '40rpx',
                    top: '460rpx',
                    fontSize: '20rpx',
                    color: '#ccc',
                    align: 'right'
                }
            },
            {
                type: 'text',
                text: this.cardInfo.nowDate,
                css: {
                    right: '40rpx',
                    top: '490rpx',
                    fontSize: '20rpx',
                    color: '#ccc',
                    align: 'right'
                }
            },
            {
                type: 'rect',
                css: {
                    left: '40rpx',
                    top: '550rpx',
                    width: '600rpx',
                    height: '1rpx',
                    color: '#eee'
                }
            },
            {
                type: 'image',
                url: this.cardInfo.qrcodeImgUrl,
                css: {
                    left: '140rpx',
                    top: '580rpx',
                    width: '400rpx',
                    height: '193rpx'
                }
            }
            ]
        });
    }
}
