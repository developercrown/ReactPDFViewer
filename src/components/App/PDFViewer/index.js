import React, {Component} from 'react';
import * as PdfJs from "pdfjs-dist";

import { Loading } from "../PDFViewer/Components/Loading";
import { Viewer } from "../PDFViewer/Components/Viewer";
import { Controls } from "../PDFViewer/Components/Controls";

import "./style.css";

export default class PDFViewer extends Component {

  state = {
    document: null,
    pdf: null,
    scale: 1,
    currentPageIndex: 1,
    maxIndexPage: 0,
    statusAction: false
  }

  // LifeCyrcle

  // Start -- Configuration Functions

  setDocument = (document) => {
    if (document) {
      this.setState({ document });
      this.loadDocument(document);
    }
  }

  loadDocument = (doc) => {
    const s = this;
    const loadingTask = PdfJs.getDocument(doc);
    loadingTask.promise.then(pdf => {
      s.setState({
        pdf,
        scale: 1,
        currentPageIndex: 1,
        maxIndexPage: pdf.numPages,
        statusAction: false
      });
    });
  };

  // End -- Configuration Functions

  // Start -- Funciones de control de pagina

  nextPage = () => {
    let s = this;
    let { statusAction, currentPageIndex, maxIndexPage } = s.state;
    if (!statusAction) {
      const newIndex = currentPageIndex + 1;
      if (newIndex <= maxIndexPage) {
        s.setState({
          currentPageIndex: newIndex,
          statusAction: true
        });
        setTimeout(() => {
          s.setState({
            statusAction: false
          });
        }, 250);
      }
    }
  };

  previousPage = () => {
    let s = this;
    let { statusAction, currentPageIndex} = s.state;
    if (!statusAction) {
      // console.log("cambiando a pagina anterior");
      const newIndex = currentPageIndex - 1;
      if (newIndex > 0) {
        s.setState({
          currentPageIndex: newIndex,
          statusAction: true
        });
        setTimeout(() => {
          s.setState({
            statusAction: false
          });
        }, 250);
      }
    }
  };

  // End -- Funciones de control de pagina

  // Start -- Funciones de control de zoom -- *************

  ampliar = () => {
    const newScale = this.scale + 0.1;
    if (newScale < 3.1) {
      this.setState({scale: newScale});
    }
  };

  reducir = () => {
    const newScale = this.scale - 0.1;
    if (newScale >= 0.59) {
      this.setState({ scale: newScale });
    }
  };

  expandir = () => {
    this.setState({ scale: 1 });
  };

  // end -- Funciones de control de zoom -- ***************

  // Main Render Section

  render(){
    let { document, pdf, currentPageIndex, statusAction, scale } = this.state;

    if (pdf) {
      return (
        <div className="DevCrownViewer">
          <Controls
            ampliar={this.ampliar}
            reducir={this.reducir}
            expandir={this.expandir}
            nextPage={this.nextPage}
            previousPage={this.previousPage}
            index={currentPageIndex}
            pages={pdf.numPages}
            scale={Math.round(scale * 100)}
            statusAction={statusAction}
          />
          <Viewer pdf={pdf} scale={scale} index={currentPageIndex} />
        </div>
      );
    } else {
      if (document) {
        return (
          <div className="DevCrownViewer">
            <Loading />
          </div>
        );
      } else {
        return (
          <div className="DevCrownViewer">
            <section className="Document404">
              <h1>DevCrown Lyrics Viewer</h1>
              <h2>No hay Archivo</h2>
            </section>
          </div>
        );
      }
    }
  };
}