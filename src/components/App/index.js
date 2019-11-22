import React, { useState, useEffect } from 'react';
import * as PdfJs from 'pdfjs-dist';

import { Loading } from './WebComponents/Loading';
import { Viewer } from './Components/Viewer';
import { Controls } from './Components/Controls';

import demo from './demo.json';

import './style.css';
const App = () => {

  let [pdf, setPdf] = useState(null);
  let [scale, setScale] = useState(1);
  let [currentPageIndex, setCurrentPageIndex] = useState(1);
  let [maxIndexPage, setMaxIndexPage] = useState(0);
  let [statusAction, setStatusAction] = useState(false);

  useEffect(() => {
    if (!pdf) {
      loadDocument();
    }
  }, [pdf]);

  const loadDocument = () => {
    const loadingTask = PdfJs.getDocument(demo.data);
    loadingTask.promise.then((pdf) => {
      setPdf(pdf);
      setScale(1);
      setMaxIndexPage(pdf.numPages);
      setCurrentPageIndex(1);
    });
  }

  // Start -- Funciones de control de pagina

  const nextPage = () => {
    if (!statusAction) {
      // console.log("cambiando a pagina siguiente");
      const newIndex = currentPageIndex + 1;
      if (newIndex <= maxIndexPage) {
        setCurrentPageIndex(newIndex);
        setStatusAction(true);
        setTimeout(() => {
          setStatusAction(false);
        }, 250);
      }
    }
  }

  const previousPage = () => {
    if (!statusAction) {
      console.log("cambiando a pagina anterior");
      const newIndex = currentPageIndex - 1;
      if (newIndex > 0) {
        setCurrentPageIndex(newIndex);
        setStatusAction(true);
        setTimeout(() => {
          setStatusAction(false);
        }, 250);
      }
    }
  }

  // End -- Funciones de control de pagina

  // Start -- Funciones de control para lupa -- *************

  const ampliar = () => {
    const newScale = scale + 0.1;
    if (newScale < 3.1) {
      setScale(newScale);
    }
  }

  const reducir = () => {
    const newScale = scale - 0.1;
    if (newScale >= .59) {
      setScale(newScale);
    }
  }

  const expandir = () => {
    setScale(1);
  }

  // end -- Funciones de control para lupa -- ***************

  // Main Render Section 

  if (pdf) {
    return (
      <div className="DevCrownViewer">
        <Controls
          ampliar={ampliar}
          reducir={reducir}
          expandir={expandir}
          pages={pdf.numPages}
          scale={Math.round(scale * 100)}
          nextPage={nextPage}
          previousPage={previousPage}
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

export default App;