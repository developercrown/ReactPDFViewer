import React, { useEffect } from 'react';
import { Page } from '../Page';

import './style.css';
const Viewer = ({ pdf, scale, index, ...props }) => {
  useEffect(() => {
    return () => {
    };
  }, [pdf, scale, index]);

  if (pdf) {
    return (
      <div className="pdf-viewer">
        <Page
          pdf={pdf}
          scale={scale}
          index={index ? index : 1}
          key={`document-page-${index}`}
          {...props}
        />
      </div>
    );
  }

  return <h1>Cargando</h1>;
};

export { Viewer };
