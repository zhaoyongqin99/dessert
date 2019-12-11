import React, { Component } from 'react'
import AboutCarousel from '../components/about/carousel'
import AboutContent from '../components/about/content'

import '../css/about/about.scss'
export default class About extends Component {
    constructor(props) {
        super(props)
    }
    goback() {
        // window.history.go(-1);
        var id = window.localStorage.getItem("DETAILID");
        // window.location.push("/goodslist")
        this.props.history.push({
            pathname: "/detail",
            state: {
                id: id
            }
        })
    }
    
    render() {
        return (
            <div>
                <div className="about-back">
                    <i className="iconfont icon-fanhui" onClick={this.goback.bind(this)}></i>
                </div>
                <AboutCarousel subid={this.props.location.state.subid} refid={this.props.location.state.refid} props={this.props}></AboutCarousel>
                <AboutContent refid={this.props.location.state.refid}></AboutContent>
                
            </div>
        )
    }
}
