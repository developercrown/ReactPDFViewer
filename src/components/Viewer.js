import React from 'react';
import { Page } from './Page';

const Viewer = ({ pdf, ...props }) => {
  console.log("pdf", pdf);

  const numPages = pdf ? pdf.numPages : 0;

  if (pdf) {
    return (
      <div className="pdf-viewer">
        {Array.apply(null, { length: numPages }).map(
          (v, i) => (
            <Page
              pdf={pdf}
              index={i + 1}
              key={`document-page-${i}`}
              {...props}
            />
          )
        )}
      </div>
    );
  }

  return <h1>Cargando</h1>;
};

export { Viewer };
