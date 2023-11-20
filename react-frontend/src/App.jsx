import {BrowserRouter} from 'react-router-dom';
import NavBar from './components/NavBar/NavBar'
import AppRouting from './components/Routing/AppRouting';
import './App.css'

function App() {

  return (
    <>
      <BrowserRouter>
        <NavBar />
        <AppRouting />
      </BrowserRouter>
      
    </>
  )
}

export default App
