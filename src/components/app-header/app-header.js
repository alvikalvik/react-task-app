import React from 'react';

import './app-header.css';

const AppHeader = ({liked, total}) => {
    return (
        <div className="app-header d-flex">
            <h1>Aleksandr Viktorov</h1>
            <h2>{total} записей, из них понравилось {liked}</h2>
        </div>
    );
};

export default AppHeader;