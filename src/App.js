import React, { Component } from 'react';

import './App.css';
import { steps } from './common/steps';
import Step from './components/step/Step';

class App extends Component {
   state = {
      files: [],
      fileName:'',
      url: null,
   };
    
    shouldComponentUpdate(nextProps, nextState) {
        let shouldUpdate = (this.state.url !== nextState.url);
        return shouldUpdate;
    }
  
    handleUpload = (event) => {
          let files = event.target.files;
          this.setState({
              files,
              fileName: files[0].name,
          });
          let formData = new FormData();
          formData.append("file", files[0]);
     
          /*const headers = new Headers({
              "Content-Type": "multipart/form-data; charset=utf-8;",
              "Cache-Control": "no-cache"
          });*/
        
          const request = new Request('https://filereadwrite.herokuapp.com/verify', {
              method: 'POST',
              mode: 'cors',
              body: formData
          });
        
          fetch(request)
              .then(res => {
                  if (res.status === 200) {
                      fetch(`https://filereadwrite.herokuapp.com/file/${files[0].name}`)
                        .then(res => {
                            let url = res.url;
                            this.setState({
                                url,
                            });
                      }).catch(err => {
                          console.log('Fetch error: ', err);
                      });
                  }
              }).catch(err => {
              console.log('err: ', err);
          });
    }
    
    handleSaveToDropbox = () => {
        const headers = new Headers({
            "Content-Type": "text/plain",
            "Content-Length": 13
        });
        const request = new Request('https://www.googleapis.com/upload/drive/v3?uploadType=media', {
            method: 'POST',
            mode: 'cors',
            headers: headers,
            body: this.state.files[0]
        });
        
        fetch(request)
            .then(res => {
                console.log('drive response: ', res);
            });
    }
  

    render() {
          const appSteps = steps.map((obj, i) => (
              <div key={i}>
                  <Step title={obj.title} step={obj.step}
                        url={this.state.url}
                        fileName={this.state.fileName}
                        handleUpload={this.handleUpload}
                        handleSaveToDropbox={this.handleSaveToDropbox} />
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
