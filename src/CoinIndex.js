import React, { Component } from 'react'
import CoinInfo from './CoinInfo.js'
import axios from 'axios'
import Query from './Query.js'
import $ from 'jquery'

class CoinIndex extends Component {
	constructor(props) {
		super(props)
		this.state = { coins: [], data: [], symbol: [], input: '', current_input: '' }
		
		this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
	}
	
	handleChange(e) {
    this.setState({ current_input: e.target.value })
		console.log("current_input is: " + this.state.current_input)
  }

  async handleSubmit(e) {
		let temp
		if(this.state.input === '' || this.state.current_input === '') {
			temp = this.state.input + this.state.current_input
		} else {
			temp = this.state.input + ',' + this.state.current_input
		}
		console.log("onSubmit clicked, input is: " + temp)
		this.setState({ input: temp })
    e.preventDefault();
		
		const fart = await axios.get('https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC&tsyms=USD')
		console.log(fart)
		
		let url = 'https://min-api.cryptocompare.com/data/pricemulti?fsyms=' + this.state.input + '&tsyms=USD'
    const res = await axios.get(url)
		const result = res.data
		
		const coins = Object.keys(result).map(function(key) {
			return [String (key), result[key]]
		})
		this.setState({ coins })
		
		$('.submit-button').val('');
  }


	render() {
		return (
			<div>
				<div className="query-style">
					<h3>Add a coin to the list</h3>
					<form  onSubmit={this.handleSubmit}>
						<label>
							Coin Symbol:
							<input className="submit-button" type="text" value={this.state.current_input} onChange={this.handleChange} />
						</label>
						<input  type="submit" value="Submit"/>
					</form>
				</div>
				
				<ul>
					{ this.state.coins.map(coin => 
						<CoinInfo 
							key={coin[1].USD}
							name={coin[0]}
							price={coin[1].USD}
						/>)}
				</ul>
			</div>
		)
	}
}
export default CoinIndex