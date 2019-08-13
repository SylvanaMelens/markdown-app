import React, { Component } from 'react';
import './App.css';
import marked from 'marked';
import { sampleText } from './sampleText';

class App extends Component {
  state = {
    text: sampleText
  }

  componentDidMount() {
    const text = localStorage.getItem('text')
    //s'il y a du texte on réactualise et le texte s'enregistre, sinon on remet le sampleText
    text ? this.setState({ text }) : this.setState({ text: sampleText})
  }

  componentDidUpdate() {
    const { text } = this.state
    // premier argument nom qu'on va lui donner pour le récupérer dans le get (string)
    // 2e argument sa valeur (this.state.text)
    localStorage.setItem('text', text)
  }

  handleChange = e => {
    const text = e.target.value
    this.setState({ text })
  }

  renderText = text => {
    const __html = marked(text, {sanitize : true})
    return { __html }
  }

  render() {
    return (
      <div className="App">
        <div className="container">
          <div className="row">
            <div className="col-sm-6">
              <textarea className='form-control' onChange={this.handleChange} value={this.state.text} rows="35">

              </textarea>
            </div>
            <div className="col-sm-6">
              <div dangerouslySetInnerHTML={this.renderText(this.state.text)} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
