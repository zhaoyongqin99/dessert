import React, { Component } from 'react'
// import { Route, Link, Switch } from "react-router-dom"
// import { Models } from 'rmc-calendar/lib/date/DataTypes';
import {Toast} from 'antd-mobile';
import '../css/mine.scss'
function showToast(msg) {
    Toast.info(msg, 1);

}


export default class Mine extends Component {
    constructor(props) {
        super(props)
    }

    goOut = () => {
        // console.log("退出")
        showToast("退出成功")
        window.localStorage.removeItem("DESSERTUSERTEL");
        // window.location.href = "/home"
        this.props.history.push("/home")
    }
    render() {
        var LoginTel = window.localStorage.getItem("DESSERTUSERTEL");
        if (LoginTel) {
            let oldtel = LoginTel.slice(3, 7);
            LoginTel = LoginTel.replace(oldtel, "****");
            return (
                <div>
                    <div className="mine-title">
                        <div className="minetitimg">
                            <img src="https://img.zaozuo.com/4ed4f1a084647f44adb031a1b53a168b@!small" alt="icon" />
                        </div>
                        <div className="mine-tittel">
                            <h1>{LoginTel}</h1>
                            <p>新晋mydesign生活家</p>
                        </div>
                    </div>
                    <ul className="mine-nav">
                        <li onClick={()=>{
                            showToast("未开发,敬请期待")
                        }}><i className="iconfont icon-qianbaoqiandaiyue"></i><p>未付款</p></li>
                        <li onClick={()=>{
                            showToast("未开发,敬请期待")
                        }}><i className="iconfont icon-yifukuan"></i><p>已付款</p></li>
                        <li onClick={()=>{
                            showToast("未开发,敬请期待")
                        }}><i className="iconfont icon-lihe"></i><p>已完成</p></li>
                        <li onClick={()=>{
                            showToast("未开发,敬请期待")
                        }}><i className="iconfont icon-8"></i><p>其他渠道</p></li>
                        <li onClick={()=>{
                            showToast("未开发,敬请期待")
                        }}><i className="iconfont icon-xiangji"></i><p>晒单中心</p></li>
                    </ul>
                    <div className="mine-bread">
                        <img src="https://img02.zaozuo.com/2cc11f54fdbd6bb0f3a366dab5faf679?x-oss-process=image/format,jpg/interlace,1,image/resize,w_1080,limit_0" alt="" />
                    </div>
                    <div className="mine-banner">
                        <div className="mine-ban"  onClick={()=>{
                            showToast("未开发,敬请期待")
                        }}>
                            <p>会员中心</p>
                            <i className="iconfont icon-fanhui_you"></i>
                        </div>
                        <div className="mine-ban" onClick={()=>{
                            showToast("未开发,敬请期待")
                        }}>
                            <p>我的优惠券</p>
                            <i className="iconfont icon-fanhui_you"></i>
                        </div>
                        <div className="mine-ban" onClick={()=>{
                            showToast("未开发,敬请期待")
                        }}>
                            <p>我的礼品卡</p>
                            <i className="iconfont icon-fanhui_you"></i>
                        </div>
                        <div className="mine-ban" onClick={()=>{
                            showToast("未开发,敬请期待")
                        }}>
                            <p>我的收藏</p>
                            <i className="iconfont icon-fanhui_you"></i>
                        </div>
                        <div className="mine-ban" onClick={()=>{
                            showToast("未开发,敬请期待")
                        }}>
                            <p>在线客服</p>
                            <i className="iconfont icon-fanhui_you"></i>
                        </div>
                        <div className="mine-ban" onClick={()=>{
                            showToast("未开发,敬请期待")
                        }}>
                            <p>收货地址</p>
                            <i className="iconfont icon-fanhui_you"></i>
                        </div>

                    </div>
                    <div className="mine-out">
                        <button onClick={() => {
                            this.goOut()
                        }
                        }>退出</button>
                    </div>
                </div>
            )
        } else {
            // console.log("没有登录呀")
            // window.location.href = "/login"
            this.props.history.push("/login");
            return false
            
        }
    }
}
