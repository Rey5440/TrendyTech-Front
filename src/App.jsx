import { Routes, Route } from "react-router-dom";
import Home from "./components/home/home";
import Detail from "./components/detail/detail";
import Create from "./components/create/create";

function App() {

  return (
    <div>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='detail/:id' element={<Detail/>}/>
        <Route path='/create' element={<Create/>}/>
      </Routes>
    </div>
  )
}

export default App
