import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
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

class OutputArea extends React.Component {
  render() {
    return (
      <div id="output" class="output"></div>
    );
  }
}

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.sendRequest = this.sendRequest.bind(this);
    this.resetInput = this.resetInput.bind(this);
  }

  sendRequest() {
    let data = {};
    data.client_id = '1234567890';
    data.data = document.getElementById('ta_lyrics').value;

    fetch('http://localhost:5000/api/v1/genre', {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(res => {
        switch (res.code) {
          case 0:
            document.getElementById('output').innerHTML = res.result.toUpperCase();
            break;

          case 1:
            alert('Accepted languages for lyrics: ' + res.result.toUpperCase());
            break;
        }
      })
      .catch(error => console.error(error));
  }

  resetInput() {
    document.getElementById('ta_lyrics').value = "";
    document.getElementById('output').innerHTML = "";
  }

  render() {
    return (
      <div class="main">
        <Form>
          <Form.Group>
            <Form.Control id="ta_lyrics" as="textarea" rows="14" />
          </Form.Group>
          <Button size="lg" variant="primary" onClick={this.sendRequest}>Send</Button> <Button size="lg" variant="secondary" onClick={this.resetInput}>Reset</Button>
        </Form>
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
