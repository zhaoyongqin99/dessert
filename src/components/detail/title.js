import React, { Component } from 'react'
import { goodsListTitle } from '../../services/goods/golist'
import '../../css/goodslist/detailtitle.scss'
export default class title extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: [],
            isLoaded: false
        }
    }
    componentDidMount() {
        var id = this.props.id;
        // console.log("componentDidMount的id是" + id)
        var that = this;
        goodsListTitle(id).then((result) => {
            that.setState({
                title: result.data.data,
                isLoaded: true
            })
            // that.state.title = result.data.data
            // console.log(that.state.title.headCoverImgLong.md5)
        })
        // console.log( goodsListTitle(id))
    }
    goBack(){
        console.log(this.props.props.history)
        this.props.props.history.push("/goodslist");
    }
    render() {
        // console.log(this.state.title)
        if (!this.state.isLoaded) {
            return <h1></h1>
        } else {
            return (
                <div>
                    <div className="detail-title">
                        <i className="iconfont icon-fanhui" onClick={this.goBack.bind(this)}></i>
                        <img src={"https://img.zaozuo.com/" + this.state.title.headCoverImgLong.md5} alt={this.state.title.title} />
                        <h1>{this.state.title.title}</h1>
                    </div>
                    {/* id是{this.props.id} */}
                </div>
            )
        }

    }
}
