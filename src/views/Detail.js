import React, { Component } from 'react'
import Detailtitle from '../components/detail/title'
import Detailcontent from '../components/detail/content'
// import { goodsList, goodsListTitle, goodsDetail } from '../services/goods/golist'
import '../css/goodslist/detail.scss'
export default class Detail extends Component {
    constructor(props) {
        super(props)
        // console.log(this.props);
        
    }
    componentDidMount(){
        window.scrollTo(0,0)
    }
    render() {
        console.log(this.props.location.state)
        return (
            <div>
                <Detailtitle id={this.props.location.state.id} props={this.props}></Detailtitle>
                <Detailcontent id={this.props.location.state.id}  props={this.props}></Detailcontent>
            </div>
        )


    }
}
