import { BrowserRouter, Routes, Route} from "react-router-dom";
import MainPage from "./pages/MainPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";


function App() {
  return (
   
   
    
    <BrowserRouter>
      <Routes>
        <Route path = "/login" element = {<LoginPage/>}/>
        <Route path = "/lista-precios" element = {<MainPage/>}>
        <Route index element = {<HomePage />} />
        </Route>
      </Routes>
   </BrowserRouter>
  );  
}




export default App
