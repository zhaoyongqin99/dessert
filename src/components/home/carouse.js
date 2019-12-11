import React, { Component } from 'react'
import { Carousel, WingBlank } from 'antd-mobile';
import '../../css/home/carose.scss'
export default class carouse extends Component {
    state = {
        data: ['1', '2', '3','4'],
        imgHeight: 176,
    }
    componentDidMount() {
        // simulate img loading
        setTimeout(() => {
            this.setState({
                data: ['d0b487cb66307da58710d3303ca8f59b', '6d2bd82e7d055612cf124c510c4b397f', '3381ec1b0fe1c3c9728b0d73fd99c641','ed52ff6a0db86cb60b0022eb6ec0c6ad'],
            });
        }, 100);
    }
    render() {
        return (
            <div>
                <WingBlank>
                    <Carousel
                        autoplay={true}
                        infinite
                        // beforeChange={(from, to) => console.log(`slide from ${from} to ${to}`)}
                        // afterChange={index => console.log('slide to', index)}
                    >
                        {this.state.data.map(val => (
                            <a
                            key={val}
                            href="#/goodslist"
                            style={{ display: 'inline-block', width: '100%', height: this.state.imgHeight }}
                          >
                            <img
                                src={`https://img02.zaozuo.com/${val}?x-oss-process=image/format,jpg/interlace,1,image/resize,w_1080,limit_0`}
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
        )
    }
}
