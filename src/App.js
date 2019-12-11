import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Route, Link, Switch, Redirect } from "react-router-dom"
import { Detail, Goodslist, About, Mine, NotFound, Shoppingcar, Home ,Login ,Search} from "./views"
// import  from "../views/Login"
import './css/app/app.scss'
import './css/icon/icon.css'
export default class App extends Component {
    static propTypes = {
        id: PropTypes.number
    }
    constructor(props) {
        super(props)
        this.state = {
            className: "app-footer"
        }
    }
    // gotoMine = () => {
    //     // console.log(this.props);
    //     //window.location.href="/mine"
    //     this.props.history.push("/mine")
    // }
    render() {
        // console.log(window.location.hash)
        var link = window.location.hash;
        var that = this;
        switch (link) {
            case "#/home":
            case "#/goodslist":
            case "#/shoppingcar":
            case "#/mine":
                this.state.className = "app-footer"
                break;
            default:
                this.state.className = "hide"
                break;
        }
        return (
            <div>
                <ul className={this.state.className}>
                    <li><Link to="/home"><i className='icon-shouye2 iconfont' style={{ color: link == "#/home" ? "#111" : "#666" }}></i> <p>首页</p> </Link></li>
                    <li><Link to="/goodslist" ><i className="icon-leimupinleifenleileibie2 iconfont" style={{ color: link == "#/goodslist" ? "#111" : "#666" }}></i> <p>分类</p></Link></li>
                    <li><Link to="/shoppingcar"><i className="iconfont icon-gwc" style={{ color: link == "#/shoppingcar" ? "#111" : "#666" }}></i> <p>购物车</p></Link></li>
                    <li><Link to="/mine" ><i className="icon-wodedangxuan iconfont " style={{ color: link == "#/mine" ? "#111" : "#666" }}></i> <p>我的</p></Link></li>
                </ul>

                {/* <button onClick={() => {
                    this.gotoMine()
                }}>点击跳转到我的</button> */}
                <Switch>
                    <Route path="/home" component={Home}></Route>
                    <Route path="/mine" component={Mine} ></Route>
                    <Route path="/goodslist" component={Goodslist} exact></Route>
                    <Route path="/shoppingcar" component={Shoppingcar} exact></Route>
                    <Route path="/about" component={About} exact></Route>
                    <Route path="/detail" component={Detail} exact></Route>
                    <Route path="/login" component={Login} exact ></Route>
                    <Route path="/404" component={NotFound} exact></Route>
                    <Route path="/search" component={Search} exact ></Route>

                    <Redirect to="/home"></Redirect>
                </Switch>
            </div>
        )


    }
}

