import React, {useEffect} from 'react';
import './style.css';

import find from "./../../../Assets/icons/find.svg";
import refresh from "./../../../Assets/icons/refresh.svg";
import minimize from "./../../../Assets/icons/minimize.svg";

export const TopNavigator = ({findAction, sincronizeAction, emitAction}) => {

    useEffect(()=>{
        console.log('TopControls has been loaded correctly!')
    }, [])
    
    return (
        <div className="DevCrownViewer-controls-top">
            <section className="left">
                <button className="viewer-button" title="Buscar" onClick={findAction}>
                    <img src={find} alt="buscar" />
                </button>
                <button className="viewer-button" title="Sincronizar documento" onClick={sincronizeAction}>
                    <img src={refresh} alt="sincronize" />
                </button>
            </section>
            <section className="right">
                <button className="viewer-button" title="Difundir/Emitir en dispositivos" onClick={emitAction}>
                    <img src={minimize} alt="replicar" />
                </button>
            </section>

        </div>
    )
}