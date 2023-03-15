import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from 'components/App';

import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// ReactDOM.createRoot(document.getElementById('container')).render(
//   <React.StrictMode>
//     <PaginatedItems itemsPerPage={10} />
//   </React.StrictMode>
// );
