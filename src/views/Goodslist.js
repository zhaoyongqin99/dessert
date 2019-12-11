import React, { Component } from 'react'
import '../css/goodslist/goodslist.scss'
export default class Goodslist extends Component {
    constructor(props) {
        super(props)
        this.state = {
            typedata: { 'all': true, 'sofa': false, 'cabinet': false, 'bed': false, 'table': false, 'Lamp': false, 'tableware': false, 'decoration': false, 'textile': false },
            data: {
                all: {}
            }
        }
    }
    componentDidMount(){
        window.scrollTo(0,0)
    }
    gotoDetail(id) {
        //去详情页面
        // alert(id);
        //this.props.history.push(`/detail/${id}`)//显示的
        // console.log(this.props)
        // this.props.fn(false)
        window.localStorage.setItem("DETAILID",id);
        this.props.history.push({
            pathname: "/detail",
            state: {
                id: id
            }
        })


    }
    goSort(e) {
        //二级菜单效果的实现
        // console.log(e.target.getAttribute("type"))
        var type = e.target.getAttribute("type");//获取到了当前的元素的产品类型
        // console.log(this.state.typedata);
        var obj = this.state.typedata;
        for (var item in obj) {
            if (item == type) {
                obj[item] = true
                // console.log(item +"的值为"+ obj[item]);
            } else {
                obj[item] = false
            }
        }
        this.forceUpdate();
        var list = e.target.parentNode.childNodes;
        for (var i = 0; i < list.length; i++) {
            list[i].setAttribute('class', "shelf-left-group")
        }
        e.target.setAttribute('class', "shelf-left-group selected")
        // console.log(e.target.getAttribute("class"))

    }
    gotoSearch = () => {
        // console.log(this.props);
        // window.location.href="/search"
        this.props.history.push("/search")
        // alert("去搜索页面")
    }
    render() {
        // console.log(this.state)
        return (
            <div>
                <div className="goodlist-search" onClick={this.gotoSearch.bind(this)}>
                    <input type="text" placeholder="新家心愿" className="goodlist-searchs" />
                    <i className="iconfont icon-sousuo"></i>
                </div>
                <section className="goodlist-shelf">
                    <section className="shelf-left">
                        <div className="shelf-left-group selected" type="all" onClick={this.goSort.bind(this)}>全屋系列</div>
                        <div className="shelf-left-group " type="sofa" onClick={this.goSort.bind(this)}>沙发-椅凳</div>
                        <div className="shelf-left-group" type="cabinet" onClick={this.goSort.bind(this)}>柜架</div>
                        <div className="shelf-left-group " type="bed" onClick={this.goSort.bind(this)}>床-床具</div>
                        <div className="shelf-left-group" type="table" onClick={this.goSort.bind(this)}>桌几</div>
                        <div className="shelf-left-group" type="Lamp" onClick={this.goSort.bind(this)}>灯具</div>
                        <div className="shelf-left-group" type="tableware" onClick={this.goSort.bind(this)}>餐具-水具</div>
                        <div className="shelf-left-group" type="decoration" onClick={this.goSort.bind(this)}>装饰-收纳</div>
                        <div className="shelf-left-group" type="textile" onClick={this.goSort.bind(this)}>家纺-床品</div>
                    </section>
                    <section className="shelf-right">
                        <div className="shelf-right-all" style={{ display: this.state.typedata.all ? "block" : "none" }}>
                            <a onClick={this.gotoDetail.bind(this, 73)} className="big"><img src="//img.zaozuo.com/b529791563a6ea68ee94f3a734ed4346" alt="美术馆系列" /></a>
                            <a onClick={this.gotoDetail.bind(this, 74)} className="big"><img src="//img.zaozuo.com/8eba9c9465ecdf8fd617a5d201adbad9" alt="青山系列" /></a>
                            <a onClick={this.gotoDetail.bind(this, 75)} className="big"><img src="//img.zaozuo.com/56884a0f4023dbf3595f7178595813db" alt="画板系列" /></a>
                            <a onClick={this.gotoDetail.bind(this, 76)} className="big"><img src="//img.zaozuo.com/4590727cf602e12e169a5d600e3ae49b" alt="山雪系列" /></a>
                            <a onClick={this.gotoDetail.bind(this, 77)} className="big"><img src="//img.zaozuo.com/91ca9d99c4ae0e2639726dfa49c399fb" alt="cosmo系列" /></a>
                            <a onClick={this.gotoDetail.bind(this, 79)} className="big"><img src="//img.zaozuo.com/91c4b899b7542386a09190482107b47a" alt="朱雀系列" /></a>
                            <a onClick={this.gotoDetail.bind(this, 78)} className="big"><img src="//img.zaozuo.com/9a4a3bf5c7e11e55e02ac0bcfece5ce5" alt="贡多拉系列" /></a>
                        </div>
                        <div className="shelf-right-sofa" style={{ display: this.state.typedata.sofa ? "block" : "none" }}>
                            <a onClick={this.gotoDetail.bind(this, 18)}><img src="//img.zaozuo.com/8df98f8a0ecacaea2954de9c39906b61" alt="沙发" /></a>
                            <a onClick={this.gotoDetail.bind(this, 23)}><img src="//img.zaozuo.com/57032ed17ea23e7762ad923b600bf9ca" alt="休闲椅" /></a>
                            <a onClick={this.gotoDetail.bind(this, 24)}><img src="//img.zaozuo.com/d07efb243f250f40df475353ccf4efa2" alt="椅凳" /></a>
                            <a onClick={this.gotoDetail.bind(this, 25)}><img src="//img.zaozuo.com/e449b9d895791778cb088129abaf3e05" alt="坐墩" /></a>
                        </div>
                        <div className="shelf-right-cabinet" style={{ display: this.state.typedata.cabinet ? "block" : "none" }}>
                            <a onClick={this.gotoDetail.bind(this, 2)}><img src="//img.zaozuo.com/16f4ee386ae1c8ce0d6f87748ca60c56" alt="电视柜" /></a>
                            <a onClick={this.gotoDetail.bind(this, 39)}><img src="//img.zaozuo.com/e0369659d87247406b4fcb9f9c1a308b" alt="书柜·书架" /></a>
                            <a onClick={this.gotoDetail.bind(this, 26)}><img src="//img.zaozuo.com/ea61bc8416b1da52c97248bf10011c8c" alt="衣柜" /></a>
                            <a onClick={this.gotoDetail.bind(this, 1)}><img src="//img.zaozuo.com/3bf377eacd881a91853057e889e34180" alt="餐边柜" /></a>
                            <a onClick={this.gotoDetail.bind(this, 40)}><img src="//img.zaozuo.com/47e02542e7cc599c1fd8901871ae5c9f" alt="斗柜" /></a>
                            <a onClick={this.gotoDetail.bind(this, 38)}><img src="//img.zaozuo.com/4c0cad1f92f5faa100096a59a0e4ff2d" alt="鞋柜" /></a>
                            <a onClick={this.gotoDetail.bind(this, 41)}><img src="//img.zaozuo.com/f2712cee516ee30eff7b839e8c75f667" alt="玄关柜" /></a>
                            <a onClick={this.gotoDetail.bind(this, 20)}><img src="//img.zaozuo.com/7defa1b35465da8df16d25132fdaae97" alt="床头柜" /></a><a href="/detail/44" ><img src="//img.zaozuo.com/cdd28e59a89d791066673676ab91aaaf" alt="推车" /></a><a href="/detail/43" ><img src="//img.zaozuo.com/0e354d180533f7ef2f1641e23e156c28" alt="置物架·储物格" /></a>
                            <a onClick={this.gotoDetail.bind(this, 42)}><img src="//img.zaozuo.com/3aa94c5c7dab05b3325eeb5d0fc4ee55" alt="衣帽架" /></a>
                        </div>
                        <div className="shelf-right-bed" style={{ display: this.state.typedata.bed ? "block" : "none" }}>
                            <a onClick={this.gotoDetail.bind(this, 17)}><img src="//img.zaozuo.com/7478a81b18ac680e8f59e3954bc3a66f" alt="床" /></a>
                            <a onClick={this.gotoDetail.bind(this, 19)}><img src="//img.zaozuo.com/f1f16565a1a535a73c38f9ac8fdb3329" alt="床垫" /></a>
                            <a onClick={this.gotoDetail.bind(this, 21)}><img src="//img.zaozuo.com/7defa1b35465da8df16d25132fdaae97" alt="床头柜" /></a>
                            <a onClick={this.gotoDetail.bind(this, 22)}><img src="//img.zaozuo.com/17cea02d3ae27bb0af5029cbc52a8274" alt="床尾凳" /></a>
                            <a onClick={this.gotoDetail.bind(this, 62)}><img src="//img.zaozuo.com/28cd2c0d12741698a10c6c75a8baa32d" alt="床品4件套" /></a>
                            <a onClick={this.gotoDetail.bind(this, 61)}><img src="//img.zaozuo.com/589ae221b5854b1f9537e2fec0daea55" alt="被褥" /></a>
                            <a onClick={this.gotoDetail.bind(this, 63)}><img src="//img.zaozuo.com/54be49386e53c5deee56537344072b30" alt="枕芯" /></a>
                        </div>
                        <div className="shelf-right-table" style={{ display: this.state.typedata.table ? "block" : "none" }}>
                            <a onClick={this.gotoDetail.bind(this, 28)}><img src="//img.zaozuo.com/44f9407dce6532aa1fb6caea946da584" alt="茶几" /></a>
                            <a onClick={this.gotoDetail.bind(this, 29)}><img src="//img.zaozuo.com/fd1d58e0ceb649ba515edd5f73ccf20f" alt="边桌" /></a>
                            <a onClick={this.gotoDetail.bind(this, 30)}><img src="//img.zaozuo.com/94583e99081013df6cd28db51237989e" alt="餐桌·书桌" /></a>
                            <a onClick={this.gotoDetail.bind(this, 32)}><img src="//img.zaozuo.com/dce866c40434931617f74f8397e341a7" alt="梳妆台" /></a>
                        </div>
                        <div className="shelf-right-Lamp" style={{ display: this.state.typedata.Lamp ? "block" : "none" }}>
                            <a onClick={this.gotoDetail.bind(this, 33)}><img src="//img.zaozuo.com/6ff17d343e2e178c86c9474d483e2eac" alt="地灯" /></a>
                            <a onClick={this.gotoDetail.bind(this, 34)}><img src="//img.zaozuo.com/7fc447ddaa800019816c4f3f533cf2a8" alt="吊灯" /></a>
                            <a onClick={this.gotoDetail.bind(this, 35)}><img src="//img.zaozuo.com/4f78e21861845e26aed70dc6845caab8" alt="台灯" /></a>
                            <a onClick={this.gotoDetail.bind(this, 36)}><img src="//img.zaozuo.com/ac79d7a3d51f0613770fd9860cf81763" alt="吸顶灯" /></a>
                        </div>
                        <div className="shelf-right-tableware" style={{ display: this.state.typedata.tableware ? "block" : "none" }}>
                            <a onClick={this.gotoDetail.bind(this, 53)}><img src="//img.zaozuo.com/ee2e7cd499419897960ee269f7bae695" alt="餐具" /></a>
                            <a onClick={this.gotoDetail.bind(this, 54)}><img src="//img.zaozuo.com/94dff812318b74b4f3c3c9b67b6cf241" alt="杯子" /></a>
                            <a onClick={this.gotoDetail.bind(this, 55)}><img src="//img.zaozuo.com/44228736822faf880683b5ee7dfd7fb0" alt="托盘·果盘" /></a>
                            <a onClick={this.gotoDetail.bind(this, 56)}><img src="//img.zaozuo.com/8af927b5f4431892c3a63187a7a5ddea" alt="食品储物" /></a>
                        </div>
                        <div className="shelf-right-decoration" style={{ display: this.state.typedata.decoration ? "block" : "none" }}>
                            <a onClick={this.gotoDetail.bind(this, 57)}><img src="//img.zaozuo.com/c9e47c26e3dcf80facfcd88353a310f4" alt="花瓶" /></a>
                            <a onClick={this.gotoDetail.bind(this, 58)}><img src="//img.zaozuo.com/40aab0cdeccbba8e9ddfc45e5bf4cc71" alt="装饰画" /></a>
                            <a onClick={this.gotoDetail.bind(this, 59)}><img src="//img.zaozuo.com/edf02b087a38a04a8c9fad441142f9dc" alt="摆件" /></a>
                            <a onClick={this.gotoDetail.bind(this, 60)}><img src="//img.zaozuo.com/d9c0ad1d758c09396a7b350c1ea07913" alt="收纳" /></a>
                            <a onClick={this.gotoDetail.bind(this, 64)}><img src="//img.zaozuo.com/87ced5a17f7d4bc24fce100e9d7ce65f" alt="墙镜" /></a>
                        </div>
                        <div className="shelf-right-textile" style={{ display: this.state.typedata.textile ? "block" : "none" }}>
                            <a onClick={this.gotoDetail.bind(this, 46)}><img src="//img.zaozuo.com/28cd2c0d12741698a10c6c75a8baa32d" alt="床品4件套" /></a>
                            <a onClick={this.gotoDetail.bind(this, 47)}><img src="//img.zaozuo.com/589ae221b5854b1f9537e2fec0daea55" alt="被褥" /></a>
                            <a onClick={this.gotoDetail.bind(this, 48)}><img src="//img.zaozuo.com/54be49386e53c5deee56537344072b30" alt="枕芯" /></a>
                            <a onClick={this.gotoDetail.bind(this, 49)}><img src="//img.zaozuo.com/bc90093ddbef6874f2b27f45a7724b03" alt="毛巾·浴巾" /></a>
                            <a onClick={this.gotoDetail.bind(this, 50)}><img src="//img.zaozuo.com/9f489017763e382fc773d82d75e2f5f7" alt="盖毯" /></a>
                            <a onClick={this.gotoDetail.bind(this, 51)}><img src="//img.zaozuo.com/6e8ece398b55ff2714361c5b621416f7" alt="地毯·地垫" /></a>
                            <a onClick={this.gotoDetail.bind(this, 52)}><img src="//img.zaozuo.com/6439a538445c0bfaee022ec04a57a1f4" alt="抱枕·颈枕" /></a>
                            <a onClick={this.gotoDetail.bind(this, 65)}><img src="//img.zaozuo.com/261aa5de54478a2fc7aaaff91903a0e6" alt="围巾" /></a>
                        </div>
                    </section>
                </section>
            </div>
        )
    }
}
