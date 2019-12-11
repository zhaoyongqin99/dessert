import React, { Component } from 'react'
// import {userLogin} from "../services/user"
import { Toast, Result } from 'antd-mobile'
import { userLogin, userCode } from '../services/user'
import '../css/login.scss'
function showToast(msg) {
    Toast.info(msg, 1);

}
export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            class: "",
            flag: false,
            tel: ""

        }
    }

    goback() {
        // alert("返回")
        // window.location.href = "/home";
        this.props.history.push("/home")
    }
    checkTel(e) {
        //input输入框值改变就验证手机号码是否正确
        var msg = "";
        let usertel = this.refs.usertel.value;
        this.state.tel = usertel;

        if (usertel) {
            //有值才判断
            var reg = /^1[356789][0-9]{9}$/g
            if (reg.test(usertel)) {
                this.setState({
                    flag: true
                })
                e.target.nextElementSibling.nextElementSibling.setAttribute('class', 'frame-code code')
                msg = "手机号码验证合格"
                showToast(msg);
            } else {
                this.setState({
                    flag: false
                })
                e.target.nextElementSibling.nextElementSibling.setAttribute('class', 'frame-code')
                msg = "手机号格式错误"
                showToast(msg);

            }
        }
        if (e.target.value.length == 11 && e.target.nextElementSibling.value.length == 4) {
            e.target.nextElementSibling.nextElementSibling.nextElementSibling.setAttribute('class', 'login-btn loginbtn2')
        } else {
            e.target.nextElementSibling.nextElementSibling.nextElementSibling.setAttribute('class', 'login-btn')
        }

    }
    getCode(e) {
        if (this.state.flag) {
            //写发送验证码的功能
           
            if (this.state.tel) {
                // console.log(this.state.tel)
                userCode(this.state.tel).then(result => {
                    console.log(result.data)
                    showToast(result.data.message);
                    //按钮倒计时
                    var sendBtnText = document.querySelector(".frame-code");
                    // console.log(sendBtnText.innerHTML)
                    sendBtnText.style.color = "#999";
                    sendBtnText.style.backgroundColor = "#eee";
                    sendBtnText.innerHTML = "120";
                    var steTime = setInterval(function () {
                        var btnNum = sendBtnText.innerHTML * 1
                        sendBtnText.innerHTML = --btnNum;
                        sendBtnText.classList.add("disabled");
                        if (btnNum === 0) {
                            clearInterval(steTime);
                            sendBtnText.innerText = "重新获取";
                            sendBtnText.classList.remove("disabled");
                            sendBtnText.style.color = "#111";
                            sendBtnText.style.borderColor = "#111"
                        }
                    }, 1000)

                })
            } else {
                showToast("没有接收到")
            }
        } else {
            showToast("请检查您的手机号")
        }
    }
    getLogin() {
        //验证验证码是否正确
        let usercode = this.refs.usercode.value;
        let usertel = this.refs.usertel.value;
        if (usercode.length == 4 && usertel.length == 11) {
            // showToast("正在验证") 
            var item = "";
            userLogin(usertel, usercode).then(result => {
                // console.log(result)
                showToast(result.data.msg)
                console.log(result.data)
                if (result.data.code == 1) {
                    console.log(result.data.code)
                    item = "dessert_" + usertel;
                    var iteminfo = {
                        usertel: usertel,
                        userid: result.data.id
                    }
                    // console.log(iteminfo)
                    window.localStorage.setItem("DESSERTUSERTEL", usertel);
                    window.localStorage.setItem(item, JSON.stringify(iteminfo)); //存储到本地 存的时候要字符串化 
                    // console.log(JSON.parse(window.localStorage.getItem("dessert_15377186507")))
                    // window.location.href = "/mine";
                    this.props.history.push("/mine")
                    // window.history.go(-1);
                }
            })
        } else {
            return
        }
    }
    onStyle(e) {
        //聚焦样式显示
        e.target.setAttribute('class', "line")
    }
    outStyle(e) {
        //失去焦点样式消失
        //改变input输入框的样式
        if (e.target.value) {
            return
        } else {
            e.target.setAttribute('class', "")
        }
    }
    setloginStyle(e) {
        //验证码输入的数字有4个的时候 登陆按钮就可用
        if (e.target.value.length == 4 && e.target.previousElementSibling.value.length == 11) {
            e.target.nextElementSibling.nextElementSibling.setAttribute('class', 'login-btn loginbtn2')
        } else {
            e.target.nextElementSibling.nextElementSibling.setAttribute('class', 'login-btn')
        }
    }
    render() {
        return (
            <div className="login">
                <i className="iconfont icon-fanhui icon-login" onClick={this.goback.bind(this)}></i>
                <div className="login-title">
                    <h1>MYDESIGN 我家</h1>
                    <p>欢迎加入 MYDESIGN 我家</p>
                </div>
                <div className="login-frame">
                    <input type="text" placeholder="请输入手机号" ref="usertel" onFocus={this.onStyle.bind(this)} onBlur={this.outStyle.bind(this)} onChange={this.checkTel.bind(this)} />
                    <input type="text" placeholder="请输入验证码" ref="usercode" onFocus={this.onStyle.bind(this)} onBlur={this.outStyle.bind(this)} onChange={this.setloginStyle.bind(this)} />
                    <button className="frame-code" onClick={this.getCode.bind(this)}>获取验证码</button>
                    <button className="login-btn" onClick={this.getLogin.bind(this)}>登陆</button>
                </div>
            </div>
        )
    }
}
