import React, { Component } from 'react'
import CoinInfo from './CoinInfo.js'
import axios from 'axios'
import $ from 'jquery'

class CoinIndex extends Component {
	constructor(props) {
		super(props)
		this.state = { coins: [], data: [], symbol: [], input: '', current_input: '', all_inputs: [] }
		
		this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
		this.deleteSingleCoin = this.deleteSingleCoin.bind(this)
	}
	
	handleChange(e) {
    this.setState({ current_input: e.target.value })
  }

  async handleSubmit(e) {
		let temp
		if(this.state.input === '' || this.state.current_input === '') {
			temp = this.state.input + this.state.current_input
		} else {
			temp = this.state.input + ',' + this.state.current_input
		}
		this.setState({ input: temp })
		
		let new_inputs = this.state.all_inputs
		new_inputs.push(this.state.current_input)
		this.setState({ all_inputs: new_inputs })

    e.preventDefault();
		
		const fart = await axios.get('https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC&tsyms=USD')
		
		let url = 'https://min-api.cryptocompare.com/data/pricemulti?fsyms=' + this.state.input + '&tsyms=USD'
    const res = await axios.get(url)
		const result = res.data
		
		const coins = Object.keys(result).map(function(key) {
			return [String (key), result[key]]
		})
		this.setState({ coins })
		
		$('.submit-button').val('');
  }
	
	async deleteSingleCoin(symbol) {
		let new_input_string = this.state.all_inputs
		let arr = []
		let temp = ""
		console.log("new input string is:" + new_input_string)
		console.log("symbol is: " + symbol)
		for(let i = 0; i < new_input_string.length; i++) {
			console.log("current arr[i] in loop is: " + new_input_string[i])
			if(symbol === new_input_string[i] && new_input_string.length == 1) {
				temp = ''
				break
			} else if(symbol == new_input_string[i]) {
			} else {
				arr.push(new_input_string[i])
				temp = temp + new_input_string[i] + ','
			}
		}
		this.setState({all_inputs: arr})
		
		// console.log(temp)
		
		this.setState({ input: temp })
		// console.log(this.state.all_inputs)
		console.log(this.state.input)
		
		const fart = await axios.get('https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC&tsyms=USD')
		
		let url = 'https://min-api.cryptocompare.com/data/pricemulti?fsyms=' + this.state.input + '&tsyms=USD'
    const res = await axios.get(url)
		const result = res.data
		
		const coins = Object.keys(result).map(function(key) {
			return [String (key), result[key]]
		})
		this.setState({ coins })
	}


	render() {
		console.log(this.state.input)
		let deleteSingleCoin = this.deleteSingleCoin
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
							deleteSingleCoin={deleteSingleCoin.bind(this)}
						/>)}
				</ul>
			</div>
		)
	}
}
export default CoinIndex