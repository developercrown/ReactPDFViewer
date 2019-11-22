import React, { Component } from 'react';
import * as PdfJs from 'pdfjs-dist';

import { Loading } from './WebComponents/Loading';
import { Viewer } from './Components/Viewer';
import { Controls } from './Components/Controls';

import './style.css';

import demo from './demo.json';

class App extends Component {

  state = {
    pdf: null,
    scale: 1,
    currentPageIndex: 0,
    maxIndexPage: 0,
    statusAction: false
  };
  
  componentDidMount() {
    const s = this;
    let loadingTask = PdfJs.getDocument(demo.data);
    loadingTask.promise.then((pdf) => {
      s.setState({ pdf, currentPageIndex: 1, maxIndexPage: pdf.numPages });
    });
  }

  // Start -- Funciones de control de pagina
  
  nextPage = () => {
    const s = this
    if(!s.state.statusAction) {
      console.log("cambiando a pagina siguiente");
      const newIndex = s.state.currentPageIndex + 1;
      if (newIndex <= s.state.maxIndexPage) {
        s.setState({ currentPageIndex: newIndex, statusAction: true });
        setTimeout(()=>{
          s.setState({statusAction: false})
        }, 250);
      }
    }
  }

  previousPage = () => {
    const s = this
    if(!s.state.statusAction) {
      console.log("cambiando a pagina anterior");
      const newIndex = this.state.currentPageIndex - 1;
      if (newIndex > 0) {
        s.setState({ currentPageIndex: newIndex, statusAction: true });
        setTimeout(()=>{
          s.setState({statusAction: false})
        }, 250);
      }
    }
  }

  // End -- Funciones de control de pagina

  // Start -- Funciones de control para lupa -- *************

  ampliar = () => {
    const scale = this.state.scale + 0.1;
    if (scale < 3.1) {
      this.setState({ scale });
    }
  }

  reducir = () => {
    const scale = this.state.scale - 0.1;
    if (scale >= .59) {
      this.setState({ scale });
    }
  }

  expandir = () => {
    this.setState({ scale: 1 });
  }

  // end -- Funciones de control para lupa -- ***************

  render() {
    let { pdf, scale, currentPageIndex, statusAction } = this.state;

    if (pdf) {
      return (
        <div className="DevCrownViewer">
          <Controls
            ampliar={this.ampliar}
            reducir={this.reducir}
            expandir={this.expandir}
            pages={pdf.numPages}
            scale={Math.round(scale * 100)}
            nextPage={this.nextPage}
            previousPage={this.previousPage}
            statusAction={statusAction}
            index={currentPageIndex}
          />
          <Viewer
            pdf={pdf}
            scale={scale}
            index={currentPageIndex}
          />
        </div>
      );
    } else {
      return (
        <div className="DevCrownViewer">
          <Loading />
        </div>
      );
    }
  }
};

export default App;
