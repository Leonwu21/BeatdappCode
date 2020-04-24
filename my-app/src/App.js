import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  state = {
    response: '',
    post: '',
    responseToPost: '',
  };

  componentDidMount() {
    this.callApi()
      .then(res => this.setState({ response: res.express }))
      .catch(err => console.log(err));
  }

  callApi = async () => {
    const response = await fetch('/get');
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);

    return body;
  };

  handleSubmit = async e => {
    e.preventDefault();
    const response = await fetch('/post', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ post: this.state.post }),
    });
    const body = await response.text();

    this.setState({ responseToPost: body });
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>
        <h1>Hello Arpan from Beatdapp!</h1>
        <h3>This is my first time using React and MongoDB</h3>
        <h3>It's ugly, but functional! I had a blast learning this.</h3>
        <h2>Thank you for this opportunity!</h2>
        <p>{this.state.response}</p>
        {/* <form onSubmit={this.handleSubmit}> */}
        <form method="POST" action="/post">
          <p>
            <strong>Post to Server:</strong>
          </p>
          <input
            type="text"
            value={this.state.post}
            onChange={e => this.setState({ post: e.target.value })}
            id="expenseInput" placeholder="Expense" required="required"
          />
          <input type="submit" value="Submit" />
          {/* <button type="submit">Submit</button> */}
        </form>
        <a href="/get">View data</a>
        <p>{this.state.responseToPost}</p>
      </div>
    );
  }
}

export default App;
