import React from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import OrderTable from './OrderTable';
// import OrderData from '../../data/OrderData';
import orderData from '../../data/NEW/Order';
import './OrderGroup.css';

class Order extends React.Component {

	constructor() {
		super()
		// this.data = orderData
		this.state = {
			data: orderData,
			order: null
		}
	}

	cart_addOrder = (goods_name) => {
		if (this.state.order === null) { // Initial cart order		
			this.setState({
				order: [{
					goods_name: goods_name[0],
					amount: 1
				}]
			})
		} else {
			if (this.state.order.findIndex(i => i.goods_name === goods_name[0]) === -1) { // Check if order doesn't exist => add order to cart
				this.setState({
					order: this.state.order.concat([{ goods_name: goods_name, amount: 1 }])
				})
			}
		}
	}

	cart_deleteOrder = (name) => {
		let index = this.state.order.findIndex(i => i.name === name)
		let newOrder = [...this.state.order]
		newOrder = [...newOrder.slice(0, index), ...newOrder.slice(index + 1, newOrder.length)] // Slice order[index] out
		this.setState({
			order: newOrder
		})
	}

	increaseOrder = (name) => {
		let index = this.state.order.findIndex(i => i.name === name)
		let newOrder = [...this.state.order]
		if (newOrder[index].amount > 0) {
			newOrder[index].amount += 1
			this.setState({
				order: newOrder
			})
		}
	}

	decreaseOrder = (name) => {
		let i = this.state.order.findIndex(i => i.name === name)
		let newOrder = [...this.state.order]
		newOrder[i].amount -= 1
		if (newOrder[i].amount <= 0) {
			this.cart_deleteOrder(name)
			return;
		}
		this.setState({
			order: newOrder
		})
	}

	letsOrder() {

	}

	render() {
		return (
			<div className="order-container" >
				<div className="order-table-container" > {
					Object.keys(this.state.data).map((type) => {
						// console.log(this.state.data[type])
						return (
							<div key={type + " table"}
								className="order-table" >
								<OrderTable type={type}
									name={this.state.data[type]}
									addToCart={this.cart_addOrder.bind(this)}
									width="400" />
							</div>
						)
					})
				}

					<div className="order-table"
						style={
							{ marginRight: '0px' }} >
						<
							CartTable order={this.state.order}
							increase={this.increaseOrder.bind(this)}
							decrease={this.decreaseOrder.bind(this)}
						/>
					</div>
					<br />
					<Button style={
						{ display: 'block', float: 'right', width: "300px", fontSize: "20px" }} > Order now </Button>
				</div>
			</div>
		);
	}
}
export default Order;

class CartTable extends React.Component {
	render() {
		return (
			<Table striped bordered responsive="sm"
				variant="dark"
				style={
					{ width: 300 }}
				id="order-cart" >
				<thead >
					<tr >
						<th colSpan="4"
							style={
								{ textAlign: 'center' }} > Your Order </th>
					</tr>
				</thead>
				<tbody >
					{
						this.props.order && Object.keys(this.props.order).map((name, i) => {
							return (
								<tr key={'cart' + i} >
									<td width="60%"
										style={
											{ borderRight: '0px' }} > {this.props.order[name].name}
									</td>
									<td style={{ textAlign: "center", borderLeft: '0px', borderRight: '0px', userSelect: "none", cursor: "pointer" }}
										width="10%"
										onClick={
											() => { this.props.decrease(this.props.order[name].name) }} >
										-
						</td>
									<td style={
										{ textAlign: "center", borderLeft: '0px', borderRight: '0px', userSelect: "none" }}
										width="20%" > {this.props.order[name].amount}
									</td>
									<td style={
										{ textAlign: "center", borderLeft: '0px', userSelect: "none", cursor: "pointer" }}
										width="10%"
										onClick={
											() => { this.props.increase(this.props.order[name].name) }} >
										+
						</td>
								</tr>
							)
						})
					}
				</tbody>
			</Table>
		)
	}
}