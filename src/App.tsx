import { Editor } from './components/editor'
import Map from './components/Map'

import './App.css'

function App() {
  return (
    <div className="App">
      <Map>
        <Editor />
      </Map>
    </div>
  );
}

export default App;
