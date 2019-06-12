import React from 'react';
import './App.css';

class Header extends React.Component {
  render() {
    return (
      <div class="header" id="header">
        <h1 class="header">Music Genre Classifier</h1>
      </div>
    )
  }
}

class Button extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.action === "send" ? "Send" : "Reset",
      action: props.action,
      class: props.action === "send" ? "buttons primary" : "buttons",
    }

    if (props.action === 'send') {
      this.state.onClick = this.sendRequest;
    } else {
      this.state.onClick = this.resetInput;
    }

    this.sendRequest = this.sendRequest.bind(this);
    this.resetInput = this.resetInput.bind(this);
  }

  sendRequest() {
    let data = {};
    data.client_id = '1234567890';
    data.data = document.getElementById('ta_lyrics').innerText;

    fetch('http://localhost:5000/api/v1/genre', {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(res => document.getElementById('output').innerHTML = res.result.toUpperCase())
      .catch(error => console.error(error));
  }

  resetInput() {
    document.getElementById('ta_lyrics').innerText = "";
    document.getElementById('output').innerHTML = "";
  }

  render() {
    return (
      <input
        type="button"
        class={this.state.class}
        value={this.state.value}
        onClick={this.state.onClick}
      />
    );
  }
}

class OutputArea extends React.Component {
  render() {
    return (
      <div id="output" class="output"></div>
    );
  }
}

class Main extends React.Component {
  render() {
    return (
      <div class="input">
        <div id="ta_lyrics" class="ta_lyrics" contentEditable="true"></div>
        <br />
        <Button action="send" /> <Button action="reset" />
        <OutputArea />
      </div>
    );
  }
}

class App extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Header />
        <Main />
      </React.Fragment>
    );
  }
}

export default App;
