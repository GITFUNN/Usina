import { BrowserRouter, Routes, Route} from "react-router-dom";
import MainPage from "./pages/MainPage";
import HomePage from "./pages/HomePage";

function App() {
  return (
   
   
    
    <BrowserRouter>
      <Routes>
        <Route path = "/precios" element = {<MainPage/>}>
        <Route index element = {<HomePage />} />
        </Route>
      </Routes>
   </BrowserRouter>
  );  
}




export default App
