import React, { Component } from 'react'

export default class UserInfo extends Component {
    constructor(props){
        super(props)
        this.state={
            userinfo:{
                
            }
        }
    }
    componentDidMount(){
        //这里得到LoginId
        //调用ajax去获取数据
        this.setState({
            userinfo:{
                username:"leson",
                userage:18
            }
        })

    }

    render() {
        return (
            <div>
                <h1>{this.state.userinfo.username}</h1>
                <h1>{this.state.userinfo.userage}</h1>
            </div>
        )
    }
}
