import DrawerCanvas from './Components/DrawerCanvas'
import ArcGisDrawerCanvas from './Components/ArcGisDrawerCanvas'

// import '@arcgis/core/assets/esri/themes/light/main.css'
import 'leaflet/dist/leaflet.css'
import './App.css'

function App() {
  return (
    <div className="App">
      <DrawerCanvas />
      {/* <ArcGisDrawerCanvas /> */}
    </div>
  );
}

export default App;
