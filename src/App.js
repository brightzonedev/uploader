import React, { Component } from 'react';

import './App.css';
import { steps } from './common/steps';
import Step from './components/step/Step';

class App extends Component {
  
  handleUpload = (event) => {
      let files = event.target.files;
      console.log('File is => ', files[0]);
      let formData = new FormData();
      formData.append("file", files[0]);
      console.log('FORM: ', formData.keys());
 
      /*const headers = new Headers({
          "Content-Type": "multipart/form-data; charset=utf-8;",
          "Cache-Control": "no-cache"
      });*/
    
      let request = new Request('http://localhost:8080/verify', {
          method: 'POST',
          mode: 'cors',
          body: formData
      });
    
      fetch(request)
          .then(function(res) {
              console.log('response: ', res);
          }).catch(function(err) {
          console.log('err: ', err);
      });
  }
  

  render() {
      const appSteps = steps.map((obj, i) => (
          <div key={i}>
              <Step title={obj.title} step={obj.step}
                    handleUpload={this.handleUpload}
                    handleVerify={this.handleVerify} />
          </div>
      ));
    return (
      <div className="App">
        <header className="App-header">
          <p className="App-title">Reads file from the source, validates with Node and can be uploaded to Google Drive.</p>
        </header>
        <div className='app-body'>
            { appSteps }
        </div>
      </div>
    );
  }
}

export default App;
