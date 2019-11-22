import React from 'react';
import './style.css';

import { TopNavigator } from './TopNavigator'
import { BottomNavigator } from './BottomNavigator'

export const Controls = ({ ampliar, reducir, expandir, pages, scale, nextPage, previousPage, index }) => {
    return (
        <div className="DevCrownViewer-controls">
            <TopNavigator />
            <BottomNavigator ampliar={ampliar} reducir={reducir} expandir={expandir} pages={pages} scale={scale} nextPage={nextPage} previousPage={previousPage} index={index}/>
        </div>
    )
}