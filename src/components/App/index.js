import React, { Component } from "react";
import PDFViewer from './PDFViewer';
import demo from "./demo.json";
export default class App extends Component {
  componentDidMount(){
    const s = this;
    console.log('====================================');
    console.log('Inicializando');
    console.log('====================================');
    setTimeout(() => {
      s.viewer.setDocument(demo.data1);
      setTimeout(() => {
        s.viewer.setDocument(demo.data2);
        setTimeout(() => {
          s.viewer.setDocument(demo.data1);
          setTimeout(() => {
            s.viewer.setDocument(null);
          }, 3000);
        }, 3000);
      }, 3000);
    }, 1000);
  }

  render() {
    return <PDFViewer ref={(viewer) => this.viewer = viewer} />;
  }
}
