import React from 'react'

class CoinInfo extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <li className="coin-item">
        <h1>{this.props.name}</h1>
        <p>{this.props.price}</p>
      </li>
    )
  }
}

export default CoinInfo
