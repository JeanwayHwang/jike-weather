// 分享图绘制的配置文件
export default class LastMayday {
    do(cardInfo) {
        this.cardInfo = JSON.parse(JSON.stringify(cardInfo));
        return this.template();
    }
    template() {
        return ({
            background: '#f5f5f5',
            width: '650rpx',
            height: '900rpx',
            borderRadius: '20rpx',
            views: [{
                type: 'rect',
                css: {
                    bottom: '0rpx',
                    left: '0rpx',
                    width: '650rpx',
                    height: '185rpx',
                    color: '#fff'
                }
            },
            {
                type: 'image',
                url: this.cardInfo.totemImgUrl,
                css: {
                    top: '30rpx',
                    left: '125rpx',
                    width: '400rpx',
                    height: '400rpx'
                }
            },
            {
                type: 'image',
                url: this.cardInfo.qrcodeImgUrl,
                css: {
                    left: '0rpx',
                    bottom: '0rpx',
                    width: '650rpx',
                    height: '185rpx',
                    mode: 'aspectFill'
                }
            },
            {
                type: 'text',
                text: this.cardInfo.location,
                css: {
                    left: '320rpx',
                    top: '450rpx',
                    fontSize: '30rpx',
                    align: 'center'
                }
            },
            {
                type: 'text',
                text: this.cardInfo.todayMinTmp + '~' + this.cardInfo.todayMaxTmp,
                css: {
                    left: '320rpx',
                    top: '480rpx',
                    fontSize: '30rpx',
                    align: 'center'
                }
            }
            ]
        });
    }
}
