import React, { useRef, useEffect } from 'react';

export const Page = ({ scale, pdf, index }) => {

  let canvas = useRef(null);

  const _update = () => {
    if (pdf) {
      _loadPage(pdf);
    }
  };

  const _loadPage = (pdf) => {
    pdf.getPage(index).then((page) => {
      _renderPage(page);
    });
  }

  const _renderPage = (renderedPage) => {
    let viewport = renderedPage.getViewport({ scale });
    let { width, height } = viewport;
    let lienzo = canvas.current;

    let context = lienzo.getContext('2d');
    lienzo.width = width;
    lienzo.height = height;

    renderedPage.render({
      canvasContext: context,
      viewport
    });
  }

  useEffect(
    () => {
      _update();
      return () => {
      }
    }, [pdf, scale, index]
  );

  return <canvas ref={canvas} />;
};