import React, { Component } from 'react';
import './Myfav.css';
import { shopArray } from '../../data/NEW/ShopArray';

class Myfav extends Component {
	constructor(props) {
		super(props);
		this.state = {
			shopData: shopArray,
			createLike: this.createLike()
		}
	}

	getTime = () => {
		const date = new Date()
		this.state.shopArray.map((i) => {

			// console.log(this.state.shopData[i].officeday.forEach(work => work.weekday === date.getDay()));
		})
	}

	createLike = () => {
		let temp = []
		for (let i = 0; i < shopArray.length; i++) {
			temp.push(shopArray[i].like)
		}

		return temp;
	}

	likeClick = (i) => {
		const ar = this.state.createLike;
		ar[i] = !ar[i]
		this.setState({
			createLike: ar
		})
	}

	render() {
		return (
			<div className="myfav-main-container" >
				<div className="myfav-container" >
					<h5 style={{ marginBottom: "10px" }}> My favourite </h5> {
						Object.keys(this.state.shopData).map((i) => {
							console.log(this.state.shopData[i].picture_main)
							return (
								<div >

									<div className="left-container" >
										<img className="imgShop"
											src={this.state.shopData[i].picture_main}
											alt={this.state.shopData[i].shop_name}
											align="left" />
									</div>

									<div className="right-container" >
										<div style={{ display: "block", width: "315px", float: "left", fontSize: "18px", marginTop: "10px" }}>
											{this.state.shopData[i].shop_name}
										</div>

										<div style={{ height: "50px" }}>
											<img src={this.state.createLike[i] ? require("../../asset/icon/heart2.png") : require("../../asset/icon/heart.png")}
												onClick={() => this.likeClick(i)}
												alt="heart"
												style={{ width: "35px", height: "35px", float: "left", marginTop: "5px", cursor: "pointer" }} />
										</div >

										<div style={{ display: "block", width: "340px", wordWrap: "break-word", height: "90px", paddingTop: "10px", fontSize: "12px" }}>
											{this.state.shopData[i].detail}
										</div>
										<div className="detailShop"
											style={{ paddingTop: "5px" }}>
											open - close: { /*{this.state.shopData[i].open_close}*/}
										</div>
										<div className="detailShop" > location: {this.state.shopData[i].address} </div>
										
										<div className="detailShop" > contact: {this.state.shopData[i].phone_number.replace('+66', 0)} </div>
										<div className="learnBox" > LEARN MORE </div>

									</div>
									<hr className="hrcss"
										style={{ height: "280px" }}
									/>
								</div >
							)
						})
					} <hr className="hrcss" />
                    <br />
				<div className="three-button" > Save My Favourite </div>
                </div>
                
			</div >
		);
	}
}
export default Myfav;