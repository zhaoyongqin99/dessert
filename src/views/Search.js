import React, { Component } from 'react'
import { goodsList, goodsType } from '../services/goods/golist'
import '../css/search.scss'
export default class Search extends Component {
    constructor(props) {
        super(props)
        this.state = {
            list: [],
            typedata: [],
            searchlist: [],
            isLoaded: false
        }
        this.handleKeyUp.bind(this);
        this.searchIos.bind(this);
    }
    componentDidMount() {
        var that = this;
        var newList = [];
        goodsType().then(result => {
            result.data.frames.map(item => {
                newList.push(item.children);
            })
            that.setState({
                typedata: newList
            })
            // console.log(this.state.typedata)
        })

    }
    //按下键盘搜索事件
    handleKeyUp(val) {
        // console.log(e.target.value);
        // var val = e.target.value;
        //将val于我获取到的所有的产品的类型相比较
        var uselist = this.state.typedata.slice(0, 9);
        // console.log(uselist)
        var id = "";
        if (val != "") {
            uselist.map(array => {
                // console.log(array)
                //uselist中的每一个对象都是一个数组
                array.map(item => {
                    // console.log(item.name)
                    let name = item.name
                    if (name.indexOf(val) != -1) {
                        return id = item.detailId
                    }

                })
            })
        }


        // console.log(id)
        //id为空请求到的data.length=0
        var that = this;
        goodsList(id, 1).then((result) => {
            that.setState({
                searchlist: result.data.data,
                isLoaded: true
            })
            // console.log(this.state.searchlist) //此时已经获取到数据 进行渲染即可 这里的渲染是分页了的
        })
    }
    getSearch(e) {
        // console.log(e.keyCode)
        //android点击搜索，未能失去焦点，故失去焦点事件无法触发，单可以调用键盘事件处理
        if (e.keyCode == 13) {
            //如果按的是enter键 13是enter
            e.preventDefault(); //禁止默认事件（默认是换行）
            this.handleKeyUp(e.target.value); //传递input框的值


        }
    }
    searchIos() {
        this.handleKeyUp(); //ios兼容????
    }

    goback() {
        window.history.go(-1)
    }
    getAbout = (subid, refid) => {
        //去详情页面
        // alert("查看refid为" + refid);
        // console.log(this.props.props.history.push)
        this.props.history.push({
            pathname: "/about",
            state: {
                subid: subid,
                refid: refid
            }
        })
    }
    render() {
        var lis = "";
        if (this.state.isLoaded) {
            if (this.state.searchlist.length > 0) {
                lis = this.state.searchlist.map(item => {
                    return (<li key={item.id} onClick={this.getAbout.bind(this,
                        item.goTo.subref, item.goTo.refId)}>
                        <img src={"https://img.zaozuo.com/" + item.image.md5} alt="" />
                        <h5>{item.title}</h5>
                        <p>¥{item.originalPrice == 0 ? "" : item.originalPrice}</p>
                        <span>{item.colors.length == 0 ? 1 : item.colors.length}色可选</span>
                    </li>)
                })
            } else {
                lis = <div className="noresult">没有搜索到数据~</div>
            }
        }
        return (
            <div>
                <div className="search">
                    <i className="iconfont icon-sousuo"></i>
                    <form action="javascript:return true">
                        <input type="search" placeholder="请搜索关键字" className="searchs" onKeyUp={this.getSearch.bind(this)} />
                    </form>
                    <div onClick={this.goback.bind(this)} className="titlediv">取消</div>
                </div>
                {/* <div className="search-tip">
                    <h5>热门搜索</h5>
                    <span>餐具</span> <span>床</span> <span>沙发</span> <span>书柜</span>
                </div> */}
                <div className="search-result">
                    <ul>
                        {lis}
                    </ul>
                </div>
            </div>
        )
    }
}
