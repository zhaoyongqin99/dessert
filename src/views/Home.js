import React, { Component } from 'react'
import Carouse from '../components/home/carouse'
import Homelist from '../components/home/homelist'
import Homeserver from '../components/home/homeserver'
import '../css/home/home.scss'


export default class Home extends Component {
    constructor(props){
        super(props)
    }
    gotoSearch = () => {
        // console.log(this.props);
        // window.location.href="/search"
        this.props.history.push("/search")
        // alert("去搜索页面")
    }
    render() {
        return (
            <div>
                <div className="home-top">
                    <h1>MyDesign 我家</h1>
                    <i className="iconfont icon-sousuo" onClick={()=>{
                        this.gotoSearch()
                    }}></i>
                </div>
                <Carouse> </Carouse>
                <div className="home-nav">
                    <ul><li><i className="iconfont icon-designer"></i><p>世界设计</p></li>
                        <li><i className="iconfont icon-36"></i><p>欧标制造</p></li>
                        <li><i className="iconfont icon-navicon-chps"></i><p>免费送装</p></li>
                        <li><i className="iconfont icon-7tiantuihuan"></i><p>7日退换</p></li>
                    </ul>
                </div>
                <div className="home-wapper">
                    <a href="#/goodslist">
                        <img src="https://img.zaozuo.com/7733cc50555599527b22e44dbb37f115" alt="img"/>
                    </a>
                </div>
                <Homelist></Homelist>
                <Homeserver></Homeserver>
            </div>
        )
    }
}
