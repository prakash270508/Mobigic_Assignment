import Signup from "./components/Signup"
import {BrowserRouter as Router , Route ,Routes} from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MainPage from "./components/MainPage";
import Home from "./components/Home";

function App() {
  return (
    <>
      <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        {/* <Route path="/" element={<Home />} /> */}
        <Route path="/sign-up" element={<Signup />} />
      </Routes>
      </Router>
      <ToastContainer />
    </>
  )
}

export default App
