import React from 'react';
import './style.css';

import expand from './../../../Assets/icons/zoom-in.svg';
import reduce from './../../../Assets/icons/zoom-out.svg';
import full from './../../../Assets/icons/full-screen.svg';
import next from './../../../Assets/icons/next.svg';
import previous from './../../../Assets/icons/previous.svg';

export const BottomNavigator = ({ ampliar, expandir, reducir, pages, scale, nextPage, previousPage, index }) => {
    return (
        <div className="DevCrownViewer-controls-bottom">
            <section className="left">
                <div className="menu-top">
                    <button className="viewer-button small" onClick={previousPage} title="Página Siguiente">
                        <img src={previous} alt="previousPage" />
                    </button>
                    <button className="viewer-button small" onClick={nextPage} title="Página Anterior">
                        <img src={next} alt="nextPage" />
                    </button>
                </div>
                <div className="menu-bottom">
                    <button className="viewer-label">
                        <h1>{index} / {pages} - Vista: {scale} %</h1>
                    </button>
                </div>
            </section>
            <section className="right">
                <button className="viewer-button" onClick={ampliar} title="Ampliar Vista">
                    <img src={expand} alt="expand" />
                </button>
                <button className="viewer-button" onClick={expandir} title="Vista Completa">
                    <img src={full} alt="fullscreen" />
                </button>
                <button className="viewer-button" onClick={reducir} title="Reducir Vista">
                    <img src={reduce} alt="reduce" />
                </button>
            </section>

        </div>
    )
}