import React, { Component } from 'react'
import axios from 'axios'

class Query extends Component {
	constructor(props) {
		super(props)
    this.state = { input: [] }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
	}

  handleChange(e) {
    this.setState({ input: e.target.value })
  }

  handleSubmit(event) {
    event.preventDefault();
  }

  render() {
    return (
      <div className="query-style">
        <h3>Add a coin to the list</h3>
        <form onSubmit={this.handleSubmit}>
          <label>
            Coin Symbol:
            <input type="text" value={this.state.input} onChange={this.handleChange} />
          </label>
          <input type="submit" value="Submit" />
        </form>
      </div>
    )
  }


}

export default Query
