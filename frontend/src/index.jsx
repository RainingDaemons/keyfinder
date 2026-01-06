/*
@Date         : 06-01-2026
@Author       : Felipe Gutiérrez Carilao
@Website      : https://www.rainingdaemons.com/
@Module       : frontend/src
@File         : index.jsx
*/

import { render } from 'solid-js/web';
import 'solid-devtools';
import "./index.css";

import App from './app/App';

const root = document.getElementById('root');

if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
  throw new Error(
    'Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got misspelled?',
  );
}

render(() => <App />, root);
