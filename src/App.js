import React, { Component } from 'react';

import './App.css';
import { steps } from './common/steps';
import Step from './components/step/Step';

class App extends Component {
  
  handleUpload = (event) => {
      let files = event.target.files;
      let formData = new FormData();
      formData.append("file", files[0]);
 
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
          .then(res => {
              console.log('response: ', res);
              if (res.status === 200) {
                  fetch(`http://localhost:8080/file/${files[0].name}`)
                    .then(res => {
                        console.log('Fetch res: ', res);
                  }).catch(err => {
                      console.log('Fetch error: ', err);
                  });
              }
          }).catch(err => {
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
