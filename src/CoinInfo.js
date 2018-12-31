import React from 'react'

class CoinInfo extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    let deleteSingleCoin = this.props.deleteSingleCoin
    return (
      <li className="coin-item">
        <button className="x-button" onClick={() => deleteSingleCoin(this.props.name)}>X</button>
        <h1 className="coin-name">{this.props.name}</h1>
        <p className="coin-price">{this.props.price}</p>
      </li>
    )
  }
}

export default CoinInfo
