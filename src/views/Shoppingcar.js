import React, { Component } from 'react'
import { aboutCarousel } from '../services/about/carousel';
import { Toast } from 'antd-mobile'
import { Modal } from 'antd'
import '../css/shopcar.scss'

function showToast(msg) {
    Toast.info(msg, 1);
}
export default class Shoppingcar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            options: [],
            list: [],
            noneClass: "car-box",
            total: 0,
            allnum: 0,
            myinfo: "car-mygoods",
            myinfocheck: "checkall",
            isLoaded: false,
            visible: false

        }
        this.handleAllChange = this.handleAllChange.bind(this);
        this.handleItemChange = this.handleItemChange.bind(this);
    }

    componentDidMount() { //页面加载获取所有的数据
        if (window.localStorage.getItem("DESSERTUSERTEL")) {
            var tel = window.localStorage.getItem("DESSERTUSERTEL");
            var goodslist = JSON.parse(window.localStorage.getItem("dessertSCar_" + tel));
            // console.log(goodslist);
            if (goodslist.length==0) {
                //如果没有数据 就显示 没有数据哦
                this.setState({
                    noneClass: "car-box",
                    myinfo: "car-none",
                    myinfocheck: "car-none"
                })


            } else {
                //有数据就要显示购物车的东西
                this.setState({
                    noneClass: "car-none",
                    myinfo: "car-mygoods",
                    myinfocheck: "checkall"
                })
                //循环取出所有的subid 和 refid
                // var that = this;
                var newOption = []; //存放所有的options参数
                var goodsinfo = []; //存放我需要的所有信息
                // var tempgoodsinfo = []; //存放我获取到的网上的参数
                goodslist.map(item => {
                    // console.log(item.subid, item.refid);
                    var option = ""; //用来存一个个的options参数
                    var tempinfo = {}; //对象 用来存一组一组的数据
                    tempinfo.num = item.num;
                    tempinfo.colorid = item.colorid;
                    tempinfo.typeid = item.typeid;
                    tempinfo.threeid = item.threeid;
                    // console.log(item.typeid3)
                    if (item.typeid3 != 0 && item.typeid3) {
                        option = ";" + item.typeid1 + ":" + item.colorid + ";" + item.typeid2 + ":" + item.typeid + ";" + item.typeid3 + ":" + item.threeid + ";";
                        newOption.push(option);
                    } else if (item.typeid2 != 0) {
                        option = ";" + item.typeid1 + ":" + item.colorid + ";" + item.typeid2 + ":" + item.typeid + ";";
                        newOption.push(option);
                    } else {
                        option = ";" + item.typeid1 + ":" + item.colorid + ";"
                        newOption.push(option);
                    }

                    aboutCarousel(item.subid, item.refid).then((result) => {  //根据id请求到相关的数据
                        var tempgoodsinfo = result.data.item; //每次取出来一个就解析一个
                        // console.log(tempgoodsinfo)
                        tempinfo.title = tempgoodsinfo.title;
                        tempgoodsinfo.skus.map(ele => { //取出价格 尺寸 照片 
                            if (ele.options == option) {
                                tempinfo.price = ele.originalPrice;
                                tempinfo.type = ele.size;
                                tempinfo.img = ele.image.md5;
                                tempinfo.skuid = ele.id;


                            }
                        })
                        //根据尺寸价格匹配的id来查找颜色/类型
                        tempgoodsinfo.skuImages.map(ele => {
                            if (ele.skuId == tempinfo.skuid) {
                                tempinfo.colortype = ele.title;

                            }
                        })
                        goodsinfo.push(tempinfo);
                        // console.log(goodsinfo);
                        if (goodsinfo.length == goodslist.length) {
                            this.setState({
                                isLoaded: true,
                                list: goodsinfo
                            })
                        }

                    })

                })

            }

        }
    }

    // showModal = () => {
    //     this.setState({
    //         visible: true,
    //     });
    // };
    handleOk = e => {
        // console.log(e);
        this.setState({
            visible: false,
        });
    };

    handleCancel = e => {
        // console.log(e);
        this.setState({
            visible: false,
        });
    };

    delete(e) {  //删除事件
        //删除的时候 重现单选事件
        // console.log(e.target.getAttribute("skuid"));
        var typeid = e.target.getAttribute("typeid");
        var colorid = e.target.getAttribute("colorid");
        //根据skuid找到本地存储的信息 然后删掉他 //这里不用判断是否有产品 因为能点删除 必定就有商品
        var tel = window.localStorage.getItem("DESSERTUSERTEL");
        var Goodslist = JSON.parse(window.localStorage.getItem("dessertSCar_" + tel));
        // console.log(Goodslist)
        Goodslist.map((item, index) => {
            if (item.typeid == typeid && item.colorid == colorid) {
                // console.log(item)
                // console.log(index)
                Goodslist.splice(index, 1)
            }
        })
        window.localStorage.setItem("dessertSCar_" + tel, JSON.stringify(Goodslist));
        //取出价格 和 数量 然后将数量和总和减少
        var reduceNum = e.target.parentNode.getElementsByClassName("num")[0].lastChild.innerHTML * 1;
        var reducePrice = e.target.parentNode.getElementsByClassName("price")[0].lastChild.innerHTML * reduceNum;
        this.setState({
            allnum: this.state.allnum - reduceNum,
            total: this.state.total - reducePrice
        })
        // this.handleItemChange();
        //删除之前 要看他是不是页面上最后一个元素 如果是的话 那就删除后要隐藏全选
        if (e.target.parentNode.parentNode.parentNode.children.length == 1) {
            // console.log("最后一件商品了")
            this.setState({
                noneClass: "car-box",
                myinfo: "car-none",
                myinfocheck: "car-none"
            })
        }
        e.target.parentNode.parentNode.remove(); //先是页面上删除 然后再去删除本地文件
        //全选和单选事件要重新触发
        this.handleItemChange();
        this.handleAllChange();

    }

    handleAllChange() { //全选事件
        const checkALl = document.querySelector(".checkAll");
        const checkboxList = document.querySelectorAll(".checkone");
        const maxCount = checkboxList.length;
        if (maxCount == 0) {
            checkALl.checked = false;
        }
        //全选 之后要获取到价格呀 
        var nums = 0;
        var prices = 0;
        for (var i = 0; i < maxCount; i++) {
            checkboxList[i].checked = checkALl.checked;
            var getNum = checkboxList[i].parentNode.getElementsByClassName("num")[0].lastChild.innerHTML * 1;
            nums = nums + getNum;
            prices = prices + checkboxList[i].parentNode.getElementsByClassName("price")[0].lastChild.innerHTML * getNum;

        }
        // console.log(checkALl.checked);
        if (checkALl.checked) {
            this.setState({
                allnum: nums,
                total: prices
            })
        } else {
            this.setState({
                allnum: 0,
                total: 0
            })
        }
        this.setState({
            checkedAll: checkALl.checked,

        });

    }

    handleItemChange() { //单选事件
        // console.log("单选被调用啦")
        // console.log(e.target)
        var numCount = 0;
        var PriceTotal = 0;
        const checkboxList = document.querySelectorAll(".checkone");
        const checkALl = document.querySelector(".checkAll");
        const maxCount = checkboxList.length;
        var count = 0;

        for (var i = 0; i < maxCount; i++) {
            if (checkboxList[i].checked) {
                count++;
                // console.log(checkboxList[i])
                //获取到他的num 和价格
                var getNum = checkboxList[i].parentNode.getElementsByClassName("num")[0].lastChild.innerHTML * 1;
                numCount = numCount + getNum;
                PriceTotal = PriceTotal + checkboxList[i].parentNode.getElementsByClassName("price")[0].lastChild.innerHTML * getNum;
            }
        }
        this.setState({
            allnum: numCount,
            total: PriceTotal
        })
        if (count == maxCount) {
            checkALl.checked = true
        } else {
            checkALl.checked = false
        }

    }

    goBack() {  //返回上一个页面 
        // window.history.go(-1)
        this.props.history.push("/goodslist")
    }
    gobBuy() { //确认下单显示结算页面 做一个弹出框
        // alert("下单啦") //要判断是否选择商品
        // const alert = Modal.alert
        if (this.state.allnum == 0 || this.state.total == 0) {
            showToast("您还未选择商品")
        } else {
            console.log("ok")
            this.setState({
                visible: true,
            });
            // showToast("结算页面正在全力开发中,请等待")
        }

    }


    render() {
        if (!this.state.isLoaded) {
            return (<div className="car">
                <div className="car-title">
                    <i className="iconfont icon-fanhui" onClick={this.goBack.bind(this)}></i>
                    <h3>购物车</h3>
                </div>
                <div className={this.state.noneClass} >
                    <img src="https://img.zaozuo.com/3149649fce56a6a88d44cf4010460ea5" alt="" />
                </div>
            </div>)
        } else {
            // console.log(this.state.list)
            return (
                <div>
                    <div className="car">
                        <div className="car-title">
                            <i className="iconfont icon-fanhui" onClick={this.goBack.bind(this)}></i>
                            <h3>购物车</h3>
                        </div>
                        <div className={this.state.noneClass} >
                            <img src="https://img.zaozuo.com/3149649fce56a6a88d44cf4010460ea5" alt="" />
                        </div>
                        <div className={this.state.myinfo}>
                            {this.state.list.map((item, index) => {
                                return (
                                    <div className="mygoods" key={index}>
                                        <input type="checkbox" value="" className="checkone" onChange={this.handleItemChange} />
                                        <img src={"//img.zaozuo.com/" + item.img} alt="" />
                                        <div className="mygoodsinfo">
                                            <h5>{item.title}</h5>
                                            <p>{item.colortype}</p>
                                            <p>{item.type}</p>
                                            <p className="num">数量: x<strong>{item.num}</strong></p>
                                            <span className="price">¥<strong>{item.price}</strong></span>
                                            <button onClick={this.delete.bind(this)} typeid={item.typeid} colorid={item.colorid}>删除</button>
                                        </div>
                                    </div>
                                )


                            })}

                        </div>
                        <div className={this.state.myinfocheck}>
                            <input className="checkAll" type="checkbox" name="" id="" onChange={this.handleAllChange} />
                            <span className="allcheck">全选</span>
                            <div className="gobuy" onClick={this.gobBuy.bind(this)}>下单</div>
                            <span className="allprice">¥ {this.state.total}</span>
                            <span className="allprice">共 {this.state.allnum} 件</span>
                        </div>
                        <Modal
                            title="合计"
                            visible={this.state.visible}
                            onOk={this.handleOk}
                            onCancel={this.handleCancel}
                        >
                            <p>一共 {this.state.allnum} 件</p>
                            <p>共 {this.state.total} 元</p>
                        </Modal>
                    </div>
                </div>
            )
        }

    }


}
