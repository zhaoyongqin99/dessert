import React, { Component } from 'react'
import { aboutCarousel } from '../../services/about/carousel';
// import AboutSelect from './select'
import { Carousel, WingBlank } from 'antd-mobile';
import { Toast } from 'antd-mobile'
import '../../css/about/carouse.scss'
import '../../css/about/select.scss'
import { element, elementType } from 'prop-types';
function showToast(msg) {
    Toast.info(msg, 1);

}
export default class carousel extends Component {
    constructor(props) {
        super(props)
        this.state = {
            list: [],
            isLoaded: false,
            data: [],
            imgHeight: 176,
            className: "hide",
            showImageNum: 0,
            id1: "",
            id2: "",
            id3: ""
        }
        this.changeImage.bind(this);
    }
    componentDidMount() { //生命周期获取列表数据
        var subid = this.props.subid;
        var refid = this.props.refid
        // console.log("subid是" + subid + "refid是" + refid)
        var that = this;
        aboutCarousel(subid, refid).then((result) => {
            that.setState({
                list: result.data.item,
                isLoaded: true,
            })
            // console.log(this.state.list)
            this.state.id1 = this.state.list.skus[0].options.slice(7, 12);
            this.state.id2 = this.state.list.skus[0].options.length > 13 ? this.state.id2 = this.state.list.skus[0].options.slice(19, 24) : "";
            var newData = [];
            this.state.list.skuImages.map(item => {
                var src = item.md5;
                newData.push(src)

            })
            if (newData.length >= 18) {
                newData = newData.slice(0, 18)
            }
            this.setState({
                data: newData
            })
        })

    }
    addCar() { //控制选项卡的显隐 (显示)
        // console.log("加入")
        this.setState({
            className: "select"
        })
    }
    goaddCar() {
        showToast("请先加入购物车")
    }
    cancel() { //控制选项卡的显隐 (隐藏)
        /*一开始想到使用flag去控制样式 但是在这里修改了flag的状态 下面render的时候还是会渲染成显示的样子 
        所以想到用原生查找到最外层的父元素 直接去修改父元素样式 这样不会受到render影响
        console.log(e.target.parentNode.parentNode.parentNode)
        e.target.parentNode.parentNode.parentNode.setAttribute("class","hide") */
        /*但是这样有一个影响 这种改变样式时直接改变的 会影响第二次再点击的加入购物车的效果
        会导致第二次点击加入购物车无效 查看布局发现 无论怎样点 页面布局上的class都是hide 但是在render已经改成了select 而且props中的数据只能用不能改*/
        /**以上是我分离了select组件  由于没办法解决 我只能采用不分离的写法*/
        this.setState({
            className: "hide"
        })
    }
    addOK(e) { //加入购物车事件
        if (!window.localStorage.getItem("DESSERTUSERTEL")) {
            showToast("请先登录")
            this.props.props.history.push("/login")
        } else {
            this.setState({  //加入后选项卡要关闭
                className: "hide"
            })
            // alert("加入成功")
            showToast("加入成功")
            // console.log(e.target.previousElementSibling)
            // document.getElementsByClassName
            //console.log(e.target.previousElementSibling.firstChild.getElementsByTagName("img")[0])
            //想法就是不放入数据库 直接本地存储 存id就行 或者商品的详细信息
            //var imgSrc = e.target.previousElementSibling.firstChild.getElementsByTagName("img")[0].currentSrc;
            //var goodsPrice = e.target.previousElementSibling.firstChild.getElementsByClassName("price")[0].lastChild;
            // 知道请求改产品的id和
            // var subid = this.props.subid;
            // var refid = this.props.refid;
            var num = e.target.previousElementSibling.lastChild.getElementsByClassName("typenum")[0].getElementsByTagName("span")[0].innerHTML;
            // console.log(num);
            var typeid1 = e.target.previousElementSibling.lastChild.getElementsByClassName("typecolor")[0].getElementsByTagName("h5")[0].getAttribute("typeid");
            // console.log(typeid1)
            var colorList = e.target.previousElementSibling.lastChild.getElementsByClassName("typecolor")[0].getElementsByTagName("div");
            var colorid = "";
            // console.log(colorList);
            for (var i = 0; i < colorList.length; i++) {
                if (colorList[i].getAttribute("class").indexOf("checked") != -1) {
                    colorid = colorList[i].getAttribute("dataid")
                }
            }
            var typeid2 = e.target.previousElementSibling.lastChild.getElementsByClassName("type")[0].getElementsByTagName("h5")[0].getAttribute("typeid")
            if (typeid2 != "") {
                var typeList = e.target.previousElementSibling.lastChild.getElementsByClassName("type")[0].getElementsByTagName("li");
                var typeid = "";
                // console.log(typeList);
                for (var i = 0; i < typeList.length; i++) {
                    if (typeList[i].getAttribute("class").indexOf("checked") != -1) {
                        typeid = typeList[i].getAttribute("dataid")
                    }
                }
            }

            //如果有第三种类型
            var typeid3 = e.target.previousElementSibling.lastChild.getElementsByClassName("type")[1].getElementsByTagName("h5")[0].getAttribute("typeid")
            // console.log(typeid3);
            if (typeid3 != "") {
                var threeList = e.target.previousElementSibling.lastChild.getElementsByClassName("type")[1].getElementsByTagName("li");
                // console.log(threeList)
                var threeid = "";
                // console.log(threeList);
                for (var i = 0; i < threeList.length; i++) {
                    if (threeList[i].getAttribute("class").indexOf("checked") != -1) {
                        threeid = threeList[i].getAttribute("dataid")
                    }
                }
            }



            var goodsinfo = {
                subid: this.props.subid,
                refid: this.props.refid,
                num: num * 1,
                typeid1: typeid1 * 1,
                colorid: colorid * 1,
                typeid2: typeid2 * 1,
                typeid: typeid * 1,
                typeid3: typeid3 * 1,
                threeid: threeid * 1

            }
            // console.log(goodsinfo);
            //根据用户来存储数据 //先取出用户的电话号码 或者id  //存数组进去
            //存进去之前 要判断类型和颜色是不是一样的 
            //如果没有类型或者颜色只有一种 就是typeid=0的情况
            // if (goodsinfo.typeid2 == 0) { //没有类型或者颜色

            // }
            var userTel = window.localStorage.getItem("DESSERTUSERTEL");
            var newList = [goodsinfo];
            var goodsflag = false;
            if (JSON.parse(window.localStorage.getItem("dessertSCar_" + userTel)).length>0) {
                //如果有了数据 那么取出来 做拼接 
                var item = JSON.parse(window.localStorage.getItem("dessertSCar_" + userTel));//[{..}]
                //做拼接之前 先要判断这个产品的类型和颜色是否有一样的 如果两者都一样的 做数量增加 有一个不同 就新增商品
                // console.log(item);
                for (var i = 0; i < item.length; i++) {
                    if (goodsinfo.typeid3 != 0) { //没有类型或者颜色
                        if (goodsinfo.threeid == item[i].threeid && goodsinfo.typeid == item[i].typeid && goodsinfo.colorid == item[i].colorid) {
                            // console.log(item[i]);
                            goodsflag = true;
                            item[i].num += goodsinfo.num;
                            return window.localStorage.setItem("dessertSCar_" + userTel, JSON.stringify(item))
                        }
                    } else if (goodsinfo.typeid2 != 0) {
                        if (goodsinfo.typeid == item[i].typeid && goodsinfo.colorid == item[i].colorid) {
                            // console.log(item[i]);
                            goodsflag = true;
                            item[i].num += goodsinfo.num;
                            return window.localStorage.setItem("dessertSCar_" + userTel, JSON.stringify(item))
                        }
                    } else {
                        if (goodsinfo.colorid == item[i].colorid) {
                            // console.log(item[i]);
                            goodsflag = true;
                            item[i].num += goodsinfo.num;
                            return window.localStorage.setItem("dessertSCar_" + userTel, JSON.stringify(item))
                        }
                    }

                }
                if(!goodsflag){
                    item.push(goodsinfo);
                    window.localStorage.setItem("dessertSCar_" + userTel, JSON.stringify(item))
                }
                   
                
                

                // console.log(item)
                // window.localStorage.setItem("dessertSCar_" + userTel, JSON.stringify(item))
            } else {
                //如果一开始并没有数据 那么久直接增加
                window.localStorage.setItem("dessertSCar_" + userTel, JSON.stringify(newList));
            }
        }
    }
    reduceNum(e) { //减少数量
        var num = e.target.nextElementSibling.innerHTML * 1;
        if (num > 1) {
            e.target.nextElementSibling.innerHTML = num - 1;
        }
    }
    addNum(e) { //增加数量
        var num = e.target.previousElementSibling.innerHTML * 1;
        e.target.previousElementSibling.innerHTML = num + 1;
    }
    selectColor(id, e) { //获取到选择的颜色并添加其选中特效
        //除了知道这个的颜色的id外还要知道类型的id 有的产品没有类型 或者说只有一种 那么我们就需要
        // console.log("颜色的id是" + id)
        // e.stopPropagation();
        this.setState({
            id1: id
        })
        var str = e.target;
        if (str.localName != "img" && str.children.length == 0) { //表示没有img 是直接的div放了文本
            let contentarr = e.target.parentNode.children
            for (var i = 1; i < contentarr.length; i++) {
                contentarr[i].setAttribute("class", "contentdiv")
            }
            e.target.setAttribute("class", "contentdiv checked")
        } else if (str.localName == "img") {
            // console.log(e.target.parentNode.parentNode.children)
            let imgarr = e.target.parentNode.parentNode.children;
            for (var i = 1; i < imgarr.length; i++) {
                imgarr[i].setAttribute("class", "colordiv")
            }
            e.target.parentNode.setAttribute("class", "colordiv checked")
        } else if (str.localName != "img" && str.children.length > 0) { //这里点的是div 但是div里面有img的情况
            let contentarr1 = e.target.parentNode.children
            for (var i = 1; i < contentarr1.length; i++) {
                contentarr1[i].setAttribute("class", "colordiv")
            }
            e.target.setAttribute("class", "colordiv checked")
        }
        this.changeImage(id, this.state.id2, this.state.id3)

    }
    selectType(id, e) {  //获取到选择的类型并添加其选中特效
        // console.log("类型的id是" + id)
        this.setState({
            id2: id
        })
        // console.log(e.target.parentNode.children)
        let liarr = e.target.parentNode.children;
        for (let i = 0; i < liarr.length; i++) {
            // console.log(liarr[i].className)
            liarr[i].setAttribute("class", " ")
        }
        e.target.setAttribute("class", "checked")
        this.changeImage(this.state.id1, id, this.state.id3)
    }

    selectThree(id, e) { //有第三种类型的话 就要获取第三种类型 然后去
        this.setState({
            id3: id
        })
        // console.log(e.target.parentNode.children)
        let liarr = e.target.parentNode.children;
        for (let i = 0; i < liarr.length; i++) {
            // console.log(liarr[i].className)
            liarr[i].setAttribute("class", " ")
        }
        e.target.setAttribute("class", "checked")
        this.changeImage(this.state.id1, this.state.id2, id)
    }
    changeImage(imgId, typeId, threeId) { //根据颜色和类型id 来实现选项卡效果
        // console.log(imgId,typeId)
        //选择颜色 点击颜色未点击类型 那么款型就是初始化的那一款 要考虑没有款型只有颜色的产品
        var skus = this.state.list.skus; //这是所有的可能的组合
        //取出options里面的id 然后与传进来的id进行判断哈哈哈
        // console.log('接收到的'+typeId)
        //我遍历所有的可能的组合 如果对应上了 就获取图片 然后修改图片的src
        for (var i = 0; i < skus.length; i++) {
            var tempid1 = skus[i].options.slice(7, 12);
            var tempid2 = "";
            if (skus[i].options.length > 13) {
                tempid2 = skus[i].options.slice(19, 24);
            }
            var tempid3 = "";
            if (skus[i].options.length > 26) {
                tempid3 = skus[i].options.slice(31, 36);
            }
            //判断
            if (imgId == tempid1 && typeId == tempid2 && threeId == tempid3) {
                // console.log(skus[i])
                this.setState({
                    showImageNum: i
                })
            }
        }
    }
    render() {
        // console.log(this.state.flag)
        if (!this.state.isLoaded) {
            return <div></div>
        } else {
            //知道默认图片的颜色和类型的id 去让对应属性的id的盒子边框有不同的样式 
            var colorid = this.state.list.skus[0].options //;10821:12755; 前面是每一个产品的类型或者颜色的id 后面是不同颜色和类型对应的id
            var coloridnum = colorid.indexOf(":") + 1;//返回:第一次出现的下标
            colorid = colorid.slice(coloridnum, coloridnum + 5) //12755
            // console.log("colorid是:"+colorid)
            var typeid = this.state.list.skus[0].options
            if (typeid.length > 13) { //大于13表示有类型 没有的话 就没必要取了
                typeid = typeid.slice(coloridnum + 12, coloridnum + 17)
                // console.log(typenum)
            }

            var threeid = this.state.list.skus[0].options
            if (threeid.length > 26) { //大于表示有第三种类型 没有的话 就没必要取了
                threeid = threeid.slice(coloridnum + 24, coloridnum + 29)
                // console.log(typenum)
            }

            //图片和类型的加载
            var trdivimmg = "";
            let colorFlag = false;
            if (this.state.list.skuOptions[0].values[0].image != "") {
                //拿出来特殊处理一下 
                trdivimmg = this.state.list.skuOptions[0].values.map(item => {
                    //默认样式的增加
                    // console.log(item.id + "先的和" + colorFlag)
                    if (item.id == colorid) {
                        //当默认样式的颜色等于选中的样式 盒子就变色
                        colorFlag = true;  //使用三目运算符可以简洁代码
                        // console.log(item.id+"判断后的和"+colorFlag)
                    } else {
                        colorFlag = false
                    }
                    return <div className={colorFlag ? "colordiv checked " : "colordiv"} key={item.id} onClick={this.selectColor.bind(this, item.id)} dataid={item.id}> <img src={"//img.zaozuo.com/" + item.image} alt="" /> </div>

                })
            } else {
                //如果没有对应的图片 就是文字
                trdivimmg = this.state.list.skuOptions[0].values.map(item => {

                    if (item.id == colorid) {
                        //当默认样式的颜色等于选中的样式 盒子就变色
                        colorFlag = true;  //使用三目运算符可以简洁代码
                    } else {
                        colorFlag = false
                    }
                    return <div className={colorFlag ? "contentdiv checked " : "contentdiv"} key={item.id} onClick={this.selectColor.bind(this, item.id)} dataid={item.id}>{item.name}</div>

                })

            }


            //产品类型的加载 有的产品只有颜色 没有型号大小的选择 所以要先做判断
            var trli = "";
            if (this.state.list.skuOptions[1]) {
                trli = this.state.list.skuOptions[1].values.map(item => {
                    let nameFlag = false;
                    if (item.id == typeid) {
                        nameFlag = true
                    } else {
                        nameFlag = false
                    }
                    return <li key={item.id} className={nameFlag ? "checked" : ""} onClick={this.selectType.bind(this, item.id)} dataid={item.id}>{item.name}</li>
                })
            }

            var threeli = ""; //如果选择的菜单有三种
            if (this.state.list.skuOptions[2]) {
                threeli = this.state.list.skuOptions[2].values.map(item => {
                    let nameFlag = false;
                    if (item.id == threeid) {
                        nameFlag = true
                    } else {
                        nameFlag = false
                    }
                    return <li key={item.id} className={nameFlag ? "checked" : ""} onClick={this.selectThree.bind(this, item.id)} dataid={item.id}>{item.name}</li>
                })
            }

            //var imgid = ";" + this.state.list.skuOptions[0].id + ":" + this.state.list.skuOptions[0].values[0].id + ";" + this.state.list.skuOptions[1].id + ":" + this.state.list.skuOptions[1].values[0].id + ";"
            // console.log("我的imgid:" + imgid)
            // console.log("默认的options:"this.state.list.skus[0].options)
            return (
                <div>
                    {/* 产品轮播图 */}
                    <WingBlank className="aboutcarousel">
                        <Carousel
                            autoplay={true}
                            infinite
                        // beforeChange={(from, to) => console.log(`slide from ${from} to ${to}`)}
                        // afterChange={index => console.log('slide to', index)}
                        >
                            {this.state.data.map(val => (
                                <a
                                    key={val}
                                    href="/goodslist"
                                    style={{ display: 'inline-block', width: '100%', height: this.state.imgHeight }}
                                >
                                    <img
                                        src={`http://img.zaozuo.com/${val}`}
                                        alt=""
                                        style={{ width: '100%', verticalAlign: 'top', height: '300px' }}
                                        onLoad={() => {
                                            // fire window resize event to change height
                                            window.dispatchEvent(new Event('resize'));
                                            this.setState({ imgHeight: 'auto' });
                                        }}
                                    />
                                </a>

                            ))}
                        </Carousel>
                    </WingBlank>
                    {/* 产品的价格和类型 */}
                    <div className="about-some">
                        <h1>{this.state.list.title}</h1>
                        <p>{this.state.list.description}</p>
                        <p className="price">
                            <span className="nowprice">¥{this.state.list.originalPrice}起</span>
                        </p>
                    </div>
                    {/* 产品保修等固定内容 */}
                    <div className="aboutitemdiv">
                        <ul className="aboutitem">
                            <li><i className="iconfont icon-duigou"></i>世界设计</li>
                            <li><i className="iconfont icon-duigou"></i>欧标制造</li>
                            <li><i className="iconfont icon-duigou"></i>免费送装</li>
                            <li><i className="iconfont icon-duigou"></i>7日退换</li>
                        </ul>
                    </div>
                    {/* 一开始的默认产品规格 */}
                    <div className="aboutinfo">
                        <span>已选</span>
                        <span className="infotype">{this.state.list.skuOptions[0].values[0].name}{this.state.list.skuOptions[1] ? this.state.list.skuOptions[1].values[0].name : ""}{this.state.list.skuOptions[2] ? this.state.list.skuOptions[2].values[0].name : ""}</span>
                        <i className="iconfont icon-icon_more_open"></i>
                    </div>
                    {/* 底部购买加入购物车等事件按钮 */}
                    <div className="about-bottom">
                        <a href="#/shoppingcar"> <i className="iconfont icon-gwc"></i></a>
                        <div className="botton-car" onClick={this.addCar.bind(this)}>加入购物车</div>
                        <div className="bottom-buy" onClick={this.goaddCar.bind(this)}>立即购买</div>
                    </div>


                    {/* <AboutSelect list={this.state.list.skuOptions} flag={this.state.flag}></AboutSelect> */}

                    {/* 加入购物车的选择项 */}
                    <div className={this.state.className} >
                        <div className="select-all">
                            <div className="select-show">
                                <div className="showimg">
                                    <img src={"//img.zaozuo.com/" + this.state.list.skus[this.state.showImageNum].image.md5} alt="图片" />
                                </div>

                                <div className="showprice">
                                    <p className="price">¥{this.state.list.skus[this.state.showImageNum].currentPrice}</p>
                                    <p>{this.state.list.skus[this.state.showImageNum].size}</p>
                                </div>
                                <i className='iconfont icon-del' onClick={this.cancel.bind(this)}></i>
                            </div>
                            <div className="select-type">
                                <div className="typenum">
                                    <button onClick={this.reduceNum.bind(this)}>-</button>
                                    <span>1</span>
                                    <button onClick={this.addNum.bind(this)}>+</button>
                                </div>
                                {/* <div>{trdivimmg}</div> */}
                                <div className="typecolor">
                                    <h5 typeid={this.state.list.skuOptions[0].id}>{this.state.list.skuOptions[0].name}</h5>
                                    {trdivimmg}
                                </div>
                                <div className="type">
                                    <h5 typeid={this.state.list.skuOptions[1] ? this.state.list.skuOptions[1].id : ""}>{this.state.list.skuOptions[1] ? this.state.list.skuOptions[1].name : ""}</h5>
                                    <ul>
                                        {trli}
                                    </ul>
                                </div>
                                <div className="type">
                                    <h5 typeid={this.state.list.skuOptions[2] ? this.state.list.skuOptions[2].id : ""}>{this.state.list.skuOptions[2] ? this.state.list.skuOptions[2].name : ""}</h5>
                                    <ul>
                                        {threeli}
                                    </ul>
                                </div>

                            </div>

                        </div>
                        <div className="select-bottom" onClick={this.addOK.bind(this)}>
                            确认加入
                        </div>
                    </div>

                </div>
            )
        }


    }
}
