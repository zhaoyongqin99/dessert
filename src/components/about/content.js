import React, { Component } from 'react'
import { aboutMsg } from '../../services/about/carousel'
import Item from 'antd-mobile/lib/popover/Item'
import '../../css/about/content.scss'
export default class content extends Component {
    constructor(props) {
        super(props)
        this.state = {
            list: [],
            isLoaded: false
        }

    }
    componentDidMount() {
        var refid = this.props.refid
        // console.log("refid是" + refid)
        var that = this;
        aboutMsg(refid).then((result) => {
            that.setState({
                list: result.data.feeds,
                isLoaded: true
            })
            // console.log(this.state.list) //已经获取到数据了

        })

    }
    render() {
        if (this.state.isLoaded) {
            var trdiv = this.state.list.map(item => {
                if (item.title.indexOf("<br/>")) {
                    var newtitle = item.title.replace("<br/>", ",")
                    item.title = newtitle
                }
                return (
                    <div className="aboutcon-msg-list" key={item.id}>
                        <h4>{item.title}</h4>
                        <p>{item.description}</p>
                        <img src={"//img.zaozuo.com/" + item.image.md5} alt="" />
                    </div>
                )
            })
        }
        return (
            <div>
                {/* 一些详情{this.props.refid} */}
                <div className="about-design">
                    <img className="design-img" src="//img.zaozuo.com/51c7f80e35c759b6f9016b1225e52e5f" alt="w-Inhouse" />
                    <div className="design-msg">
                        <div className="desgn-title">
                            <img src="//img.zaozuo.com/a0a5d7b1ead64a6a3eb74871d411c374" alt="" />
                            <h5>D-Inhouse</h5>
                            <span>中国 | 北京</span>
                            <p>由平均行业经验超过10年的工程师及大部分海外教育背景的设计师共同组成的造作内部设计团队，代号D。</p>
                        </div>
                    </div>
                </div>
                <div className="aboutcon-msg">
                    {trdiv}
                </div>
                
            </div>
        )
    }
}
