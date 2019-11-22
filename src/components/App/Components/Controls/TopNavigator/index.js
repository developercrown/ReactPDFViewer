import React from 'react';
import './style.css';

import find from '.././../../../../assets/icons/find.svg';
import refresh from '.././../../../../assets/icons/refresh.svg';
import minimize from '.././../../../../assets/icons/minimize.svg';

export const TopNavigator = () => {
    return (
        <div className="DevCrownViewer-controls-top">
            <section className="left">
                <button className="viewer-button" title="Buscar">
                    <img src={find} alt="buscar" />
                </button>
                <button className="viewer-button" title="Sincronizar documento">
                    <img src={refresh} alt="sincronize" />
                </button>
            </section>
            <section className="right">
                <button className="viewer-button" title="Difundir/Emitir en dispositivos">
                    <img src={minimize} alt="replicar" />
                </button>
            </section>

        </div>
    )
}