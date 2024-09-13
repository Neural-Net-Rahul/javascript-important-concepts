// useRef
import React , {useState, useMemo, useEffect, useRef, useCallback, memo} from 'react'

function App() {
  const [count, setCount] = useState(0);

  const handleDirectIncrement = () => {
    setCount(count + 1); // Uses direct state update
  };

  const handleFunctionalIncrement = () => {
    setCount(prevCount => prevCount + 1); // Uses functional state update
  };

  const handleMultipleUpdates = () => {
    // handleDirectIncrement();
    // handleDirectIncrement();
    // handleDirectIncrement();
    // OR
    handleFunctionalIncrement();
    handleFunctionalIncrement();
    handleFunctionalIncrement();
  };

  return (
    <>
      <div>Count: {count}</div>
      <button onClick={handleMultipleUpdates}>Increment 3 Times</button>
    </>
  );
}


export default App;
