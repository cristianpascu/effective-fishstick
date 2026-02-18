// import styles from './app.module.css';
import { Button, useCounter } from '@r360/shared-lib';

import { Route, Routes, Link } from 'react-router-dom';

function CounterDemo() {
  const { count, increment, decrement, reset } = useCounter({
    initialValue: 0,
    min: 0,
    max: 20,
  });
  return (
    <div>
      <Button variant="secondary" size="sm" onClick={decrement}>
        −
      </Button>
      <strong>{count}</strong>
      <Button variant="primary" size="sm" onClick={increment}>
        +
      </Button>
      <Button variant="danger" size="sm" onClick={reset}>
        Reset
      </Button>
    </div>
  );
}

export function App() {
  return (
    <div>
      <h2>Counter (from shared-lib)</h2>
      <div>
        <CounterDemo />
      </div>

      {/* START: routes */}
      {/* These routes and navigation have been generated for you */}
      {/* Feel free to move and update them to fit your needs */}
      <br />
      <hr />
      <br />
      <div role="navigation">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/page-2">Page 2</Link>
          </li>
        </ul>
      </div>
      <Routes>
        <Route
          path="/"
          element={
            <div>
              This is the generated root route.{' '}
              <Link to="/page-2">Click here for page 2.</Link>
            </div>
          }
        />
        <Route
          path="/page-2"
          element={
            <div>
              <Link to="/">Click here to go back to root page.</Link>
            </div>
          }
        />
      </Routes>
      {/* END: routes */}
    </div>
  );
}

export default App;
