import React, {Component} from 'react';
import * as PdfJs from "pdfjs-dist";

import { Loading } from "./Components/Loading";
import { Controls } from "./Components/Controls";
import { Page } from "./Components/Page";

import "./style.css";

export default class PDFViewer extends Component {

  state = {
    document: null,
    pdf: null,
    scale: 1,
    currentPageIndex: 1,
    maxIndexPage: 0,
    statusAction: false,
    viewerMessage: "Bienvenido"
  }

  // LifeCyrcle

  // Start -- Configuration Functions

  setDocument = (document) => {
    if (document) {
      this.setState({ document });
      this.loadDocument(document);
    }else{
      this.setState({
        viewerMessage: "No hay Archivo",
        pdf: null,
        document: null
      });
    }
  }

  loadDocument = (doc) => {
    const s = this;
    const loadingTask = PdfJs.getDocument(doc);
    loadingTask.onProgress = ({loaded, total}) =>{
      const progress = (loaded * 100) / total;
      if(progress === 100){
        document.title = "DevCrown App";
      }else{
        document.title = "Cargando " + progress + " %";
      }
    };
    loadingTask.promise.then(pdf => {
      s.setState({
        pdf,
        currentPageIndex: 1,
        maxIndexPage: pdf.numPages,
        statusAction: false
      });
    }).catch(()=>{
      s.setState({
        pdf: null,
        document: null,
        viewerMessage: "Ocurrio un error al procesar el archivo"
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
    const newScale = this.state.scale + 0.1;
    if (newScale < 3.1) {
      this.setState({scale: newScale});
    }
  };

  reducir = () => {
    const newScale = this.state.scale - 0.1;
    if (newScale >= 0.59) {
      this.setState({ scale: newScale });
    }
  };

  expandir = () => {
    this.setState({ scale: 1 });
  };

  // end -- Funciones de control de zoom -- ***************

  findAction = () => {
    const s = this;
    if(this.props.findAction){
      s.setState({
          statusAction: true
        });
        setTimeout(() => {
          s.setState({
            statusAction: false
          });
        }, 250);
      this.props.findAction();
    }
  }
  sincronizeAction = () => {
    const s = this;
    if(this.props.sincronizeAction){
      s.setState({
          statusAction: true
        });
        setTimeout(() => {
          s.setState({
            statusAction: false
          });
        }, 250);
      this.props.sincronizeAction();
    }
  }
  emitAction = () => {
    const s = this;
    if(this.props.emitAction){
      s.setState({
          statusAction: true
        });
        setTimeout(() => {
          s.setState({
            statusAction: false
          });
        }, 250);
      this.props.emitAction();
    }
  }

  // Main Render Section

  render(){
    const s = this;
    let {
      document,
      pdf,
      currentPageIndex,
      statusAction,
      scale,
      viewerMessage
    } = s.state;

    if (pdf) {
      return (
        <div className="DevCrownViewer">
          <Controls
            findAction={this.findAction}
            sincronizeAction={this.sincronizeAction}
            emitAction={this.emitAction}
            ampliar={s.ampliar}
            reducir={s.reducir}
            expandir={s.expandir}
            nextPage={s.nextPage}
            previousPage={s.previousPage}
            index={currentPageIndex}
            pages={pdf.numPages}
            scale={Math.round(scale * 100)}
            statusAction={statusAction}
          />

          <div className="pdf-viewer">
            <Page
              pdf={pdf}
              scale={scale}
              index={currentPageIndex ? currentPageIndex : 1}
              key={`document-page-${currentPageIndex}`}
            />
          </div>
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
            <Controls
              findAction={this.findAction}
              sincronizeAction={this.sincronizeAction}
              emitAction={this.emitAction}
              ampliar={null}
              reducir={null}
              expandir={null}
              nextPage={null}
              previousPage={null}
              index={0}
              pages={0}
              scale={Math.round(scale * 100)}
              statusAction={false}
            />
            <section className="Document404">
              <h1>DevCrown Lyrics Viewer</h1>
              <h2>{viewerMessage}</h2>
            </section>
          </div>
        );
      }
    }
  };
}