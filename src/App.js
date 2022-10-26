import './App.css';
import {Outlet, Route, Routes} from "react-router-dom";
import Home from "./routes/home/home.component";
import Navigation from "./routes/navigation/navigation.component";
import SignIn from "./routes/sign-in/sign-in.component";

const App = () => {
  return (
    <Routes>
      <Route path={'/'} element={<Navigation/>}>
        <Route index={true} element={<Home/>}></Route>
        <Route path={'shop'} element={<Shop/>}></Route>
        <Route path={'sign-in'} element={<SignIn/>}></Route>
      </Route>
    </Routes>
  );
}

const Shop = () => {
  return (
    <div>
      Shop
    </div>
  )
}

export default App;