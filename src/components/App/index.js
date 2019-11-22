import React, { Component } from "react";
import PDFViewer from './PDFViewer';

export default class App extends Component {
  find = () => {
    console.log('====================================');
    console.log("Buscando");
    console.log('====================================');
  }

  sincronize = () => {
    console.log('====================================');
    console.log("Sincronizando contenido");
    console.log('====================================');
  }

  emit = () => {
    console.log('====================================');
    console.log("Emitiendo a clientes");
    console.log('====================================');
  }


  render() {
    const s = this;
    return (
      <PDFViewer
        ref={viewer => (s.viewer = viewer)}
        findAction={s.find}
        sincronizeAction={s.sincronize}
        emitAction={s.emit}
      />
    );
  }
}
