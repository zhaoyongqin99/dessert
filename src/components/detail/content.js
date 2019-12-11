import React, { Component } from 'react'
// import { ListView } from 'antd-mobile';
import { message} from 'antd';
// import InfiniteScroll from 'react-infinite-scroller';
import { goodsList } from '../../services/goods/golist'

import '../../css/goodslist/detailcontent.scss'


export default class content extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [], //用来放获取到的数据
            isLoaded: false, //控制是否有数据的
            loading: false,
            hasMore: true, //是否加载
            shownum: 1
        };
        this.handleScroll = this.handleScroll.bind(this);
    }
    componentDidMount() { //请求第一页
        window.addEventListener('scroll', this.handleScroll);
 
        var id = this.props.id;
        // console.log("componentDidMount的id是" + id)
        var that = this;

        goodsList(id, 1).then((result) => {
            // console.log(result.data)
            that.setState({
                list: result.data.data,
                isLoaded: true
            })
            // console.log(this.state.list)
        })

    }
 
    handleScroll() {
        //content文本距离顶部有一个margin-top:150px; //这个150是固定的
        //可视高度就是页面加载时元素渲染的高度 
        //滚动距离+页面可视高度- 150 = 页面滚动高度
        // var height = document.getElementsByClassName('.detail-content')
        // console.log("页面滚动高度"+document.body.scrollHeight)
        // console.log("页面可视高度"+window.screen.availHeight)
        // console.log("页面被滚动的高"+document.body.scrollTop)
        var shownum = this.state.shownum;
        var id = this.props.id;
        var height = (document.body.scrollHeight *1) + (150 *1) -(window.scrollY*1)
        // console.log("滚动距离是" + window.scrollY)
        //window.scrollY == 564 || window.scrollY == 1565
        if (height == window.screen.availHeight) {
            // message.warning('请求');
            this.setState({
                shownum: shownum +1
            })
            var that = this;
            // console.log("到底了")
            // console.log(this.state.shownum)
            goodsList(id, this.state.shownum).then(function (result) {
                that.setState({
                    list: that.state.list.concat(result.data.data)
                })
                // console.log(result.data.data);
                // console.log(that.state.list)
                // if(result.data.data.length<8){
                //      message.warning('请求完成');
                // }

            })
        }
    }



    getAbout = (subid, refid) => {
        // alert("查看refid为" + refid);
        // console.log(this.props.props.history.push)
        this.props.props.history.push({
            pathname: "/about",
            state: {
                subid: subid,
                refid: refid
            }
        })
    }

    render() {
        if (!this.state.isLoaded) {
            return <div></div>
        } else {
            // console.log(this.state.list)
            var trlist = this.state.list.map((item) => {
                if (item.colors.length > 0) {
                    var colors = item.colors;
                    var imglist = colors.map((i, index) => {
                        return <img src={"//img.zaozuo.com/" + colors[index]} alt="色块" key={index} />
                    })
                }
                return (
                    <div className="item-container" key={item.id} onClick={() => {
                        this.getAbout(item.goTo.subrefId, item.goTo.refId)
                    }}>
                        <a><img src={"//img.zaozuo.com/" + item.image.md5} alt={item.title} /></a>
                        <div className="desc">
                            <h4 className="ellipsis">{item.title}</h4>
                            <p className="price-container">
                                {/* <span className="now red">
                                    <span>¥{item.price}</span>
                                    <span className="qi">起 </span>
                                </span> */}
                                <span className="line-through origin">
                                    <span>¥{item.originalPrice}</span>
                                    <span className="qi">起</span>
                                </span>
                            </p>
                            <div className="colors-container" style={{ display: item.colors.length > 0 ? 'block' : 'none' }}>
                                {imglist}
                            </div>
                        </div>
                        <div className="tags">
                            <div className="single promotion">
                                {item.tags.length > 0 ? item.tags[0].name : ""}
                            </div>
                        </div>
                    </div >
                )
            })
            return (
                <div>
                    <div className="detail-content">
                        {trlist}
                    </div>
                    {/* <div className="detail-end">
                        数据记载完咯
                    </div> */}
                </div>
            )
        }

    }
}
