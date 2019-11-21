import React, { Component } from 'react';
import * as PdfJs from 'pdfjs-dist';
import { Viewer } from './components/Viewer'

const PDF_URL = 'https://mozilla.github.io/pdf.js/web/compressed.tracemonkey-pldi-09.pdf';

class App extends Component {

  state = {
    pdf: null,
    scale: 1
  };

  componentDidMount() {
    PdfJs.getDocument(PDF_URL).then((pdf) => {
      // console.log(pdf);
      this.setState({ pdf });
    });
  }

  render() {

    const { pdf, scale } = this.state;

    if (pdf) {
      return (
        <div className="pdf-context">
          <Viewer
            pdf={pdf}
            scale={scale}
          />
        </div>
      );
    } else {
      return (
        <div className="pdf-context">
          Pendiente
        </div>
      );
    }
  }
};

export default App;
