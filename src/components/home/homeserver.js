import React, { Component } from 'react'
import '../../css/home/homeserver.scss'
export default class homeserver extends Component {
    render() {
        return (
            <div>
                <div className="homeserver">
                    <img src="//img02.zaozuo.com/34eacee52e4221f3a005b2ff69bd7c86?x-oss-process=image/format,jpg/interlace,1,image/resize,w_600,limit_0" alt="img" />
                    <div className="homeserver-content">
                        <h2>服务承诺</h2>
                        <div className="homeserver-con2">
                            <a >
                                <i className="iconfont icon-huoche"></i>
                                <p>
                                    <i>满199</i>
                                    <br />
                                    <span>
                                        <b>免费送装</b>
                                    </span>
                                </p>
                            </a>
                            <a >
                                <i className="iconfont icon-jiaofuriqi"></i>
                                <p>
                                    <i>延期高利补偿/确保</i>
                                    <br />
                                    <span>
                                        <b>准时交付</b>
                                    </span>
                                </p>
                            </a>
                            <a >
                                <i className="iconfont icon-jiagebaozhangfuxing"></i>
                                <p>
                                    <i>价格保障/变动返差价</i>
                                    <br />
                                    <span>
                                        <b>7日保价</b>
                                    </span>
                                </p>
                            </a>
                            <a >
                                <i className="iconfont icon-7tiantuihuan"></i>
                                <p>
                                    <i>三年质保</i>
                                    <br />
                                    <span>
                                        <b>7日退换</b>
                                    </span>
                                </p>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
