import React, { Component } from 'react'
import { Carousel, WingBlank } from 'antd-mobile';
import '../../css/home/homelist.scss'
export default class homelist extends Component {
    state = {
        data: {
            data1:['1', '2', '3', '4', '5', '6', '7', '8'],
            data2:['1', '2', '3', '4', '5', '6', '7', '8']
        },
        imgHeight: 176,
    }
    componentDidMount() {
        // simulate img loading
        setTimeout(() => {
            this.setState({
                data:{
                    data1:['a823804df6260073f666876f2cfa722e', 'edaf68441bb8966f338543b1e538c20c', '81b5e4a9501f4a14115075a623cc27ae', '3f6536798f80332365b805d7b6d7884d', '6f69f980dfafe46be82ab46f6422518a',
                    '9831c5cf47fbd4948be54cd7b3eff0b3', '58d79d8061611b0692bd044362fedc88', '4bc7a246a9c888528e64ce06469429c0'],
                    data2:['bd64fd320047c94672ac0fd7402c25eb','779f8a00868f5a5f0c9932a3072bfbd3','96f47d4c63a7f77e24b4b4ba67ff7db4','90ae576f25670cff57371850ad00b4f7',
                    '8ba917476a92d44527256e4b8a106c46','c2ecb5c5fb46c39fcf301d8c6750ccc1','b20cda4fb0c514d84bd6cd5d6668afd1']
                } 
               
            
                });
        }, 100);
    }
    render() {
        // console.log(this.state.data)
        return (
            <div>
                <div className="homelist1">
                    <div className="homelist1-top">
                        <h2>D Room 我家双11最值组合</h2>
                        <p>买三件点亮全家，8组客厅/卧室/餐厅最美搭配方案</p>
                    </div>
                    <div className="homelist1-carousel">
                        <WingBlank>
                            <Carousel className="space-carousel"
                                frameOverflow="visible"
                                cellSpacing={10}
                                slideWidth={0.8}
                                autoplay={true}
                                infinite
                                // beforeChange={(from, to) => console.log(`slide from ${from} to ${to}`)}
                                afterChange={index => this.setState({ slideIndex: index })}
                            >
                                {this.state.data.data1.map((val, index) => (
                                    <a
                                        key={val}
                                        href="#/goodslist"
                                        style={{
                                            display: 'block',
                                            position: 'relative',
                                            top: this.state.slideIndex === index ? -10 : 0,
                                            height: this.state.imgHeight,
                                            boxShadow: '2px 1px 1px rgba(0, 0, 0, 0.2)',
                                        }}
                                    >
                                        <img
                                            src={`https://img02.zaozuo.com/${val}?x-oss-process=image/format,jpg/interlace,1,image/resize,w_600,limit_0`}
                                            alt=""
                                            style={{ width: '100%', verticalAlign: 'top' }}
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
                    </div>
                </div>
                <div className="homelist2">
                    <div className="homelist1-top">
                        <h2>D Iconic 我家双11最值单品</h2>
                        <p>买一件入手骄傲,5年造作百年用户挚爱作品</p>
                    </div>
                    <div className="homelist1-carousel">
                        <WingBlank>
                            <Carousel className="space-carousel"
                                frameOverflow="visible"
                                cellSpacing={10}
                                slideWidth={0.8}
                                autoplay={true}
                                infinite
                                // beforeChange={(from, to) => console.log(`slide from ${from} to ${to}`)}
                                afterChange={index => this.setState({ slideIndex: index })}
                            >
                                {this.state.data.data2.map((val, index) => (
                                    <a
                                        key={val}
                                        href="#/goodslist"
                                        style={{
                                            display: 'block',
                                            position: 'relative',
                                            top: this.state.slideIndex === index ? -10 : 0,
                                            height: this.state.imgHeight,
                                            boxShadow: '2px 1px 1px rgba(0, 0, 0, 0.2)',
                                        }}
                                    >
                                        <img
                                            src={`https://img02.zaozuo.com/${val}?x-oss-process=image/format,jpg/interlace,1,image/resize,w_600,limit_0`}
                                            alt=""
                                            style={{ width: '100%', verticalAlign: 'top' }}
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
                    </div>
                </div>
            </div>
        )
    }
}
