import { useEffect, useMemo, useState } from 'react';
import Plot from 'react-plotly.js';
import './App.css';
import { calculateRegressionCoefficients, calculateRegressionLine } from './utils/regression';

function App() {
  const [width, setWidth] = useState(window.innerWidth- 100);
  const [height, setHeight] = useState(window.innerHeight - 100);

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth - 100);
      setHeight(window.innerHeight - 100);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  })

  const x = useMemo(() => [1, 50, 100, 200, 300, 500, 600], []);
  const y = useMemo(()=> [20, 100, 50, 300, 500, 400, 600], [])

  const regressionCoefficients = useMemo(() => calculateRegressionCoefficients(x, y), [x, y]);
  const regressionPoints = useMemo(() => calculateRegressionLine([0, 600], regressionCoefficients), [regressionCoefficients]);

  return (
      <Plot
      data={[
        {
          x: [0, 600],
          y: regressionPoints,
          type: 'scatter',
          mode: 'lines',
          marker: {color: 'blue'},
          name: 'Regression Line'
        },
        {
          x,
          y,
          type: 'scatter',
          mode: 'lines+markers',
          marker: {color: 'lightblue'},
          name: 'Data Points'
        }
      ]}
      layout={{width, height, title: 'Linear Regression - Federico Cattini'}}
    />
  );
}

export default App;
