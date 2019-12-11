import React, { Component } from 'react'
import '../../css/about/select.scss'
export default class select extends Component {
    constructor(props) {
        super(props)
        this.state = {
            className: "hide"

        }
    }
    cancel(e){
        //一开始想到使用flag去控制样式 但是在这里修改了flag的状态 下面render的时候还是会渲染成显示的样子 
        //所以想到用原生查找到最外层的父元素 直接去修改父元素样式 这样不会受到render影响
        console.log(e.target.parentNode.parentNode.parentNode)
        e.target.parentNode.parentNode.parentNode.setAttribute("class","hide")
        //但是这样有一个影响 这种改变样式时直接改变的 会影响第二次再点击的加入购物车的效果
        //会导致第二次点击加入购物车无效 
        //查看布局发现 无论怎样点 页面布局上的class都是hide 但是在render已经改成了select
       //而且props中的数据只能用不能改
    }
    
    render() {
        console.log(this.props.list)
        console.log(this.props.flag)
        if (this.props.flag) {
            this.state.className = "select";
            console.log(this.state.className)
        } else {
            this.state.className = "hide";
        }
        return (
            <div>
                
                <div className={this.state.className} >
                    <div className="select-all">
                        <div className="select-show">
                            <div className="showimg">
                                <img src="//img.zaozuo.com/afff79e456f92737705f8843f4739e8c" alt="图片" />
                            </div>

                            <div className="showprice">
                                <p className="price">¥3499</p>
                                <p>103*86*75</p>
                            </div>
                            <i className='iconfont icon-del' onClick={this.cancel.bind(this)}></i>
                        </div>
                        <div className="select-type">
                            <div className="typenum">
                                <button>-</button>
                                <span>1</span>
                                <button>+</button>
                            </div>
                            <div className="typecolor">
                                <h5>颜色</h5>
                                <div className="colordiv"><img src="//img.zaozuo.com/465c99b103a23bb6c4956f89a8070d53" alt="蓝色" /></div>
                                <div className="colordiv"><img src="//img.zaozuo.com/b11391b01b5112c673eae96a78e22899" alt="红色" /></div>
                                <div className="colordiv"><img src="//img.zaozuo.com/ba3b9386fc54c13b29f4982d4f71c55a" alt="灰色" /></div>
                            </div>
                            <div className="type">
                                <h5>款型</h5>
                                <ul>
                                    <li>单人座</li>
                                    <li>无扶手单人座</li>
                                    <li>双人座</li>
                                    <li>三人座</li>
                                    <li>胶墩</li>
                                </ul>
                            </div>

                        </div>

                    </div>
                    <div className="select-bottom" >
                        确认加入
                        </div>
                </div>
            
            </div>
        )


    }
}
