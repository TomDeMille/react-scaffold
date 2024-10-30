//import Counter from './components/Counter'


import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import AddTutorial from "./components/scaffold-test-components/AddTutorial.tsx";
import Tutorial from "./components/scaffold-test-components/Tutorial.tsx";
import TutorialsList from "./components/scaffold-test-components/TutorialsList.tsx";
import Counter from "./components/scaffold-test-components/Counter.tsx";

function App() {
    return (
        <>
            <div className="h-96 text-left">
                <nav className="navbar navbar-expand navbar-dark bg-dark">
                    <a href="/tutorials" className="navbar-brand">
           Tom DeMille Scaffold
                    </a>
                    <div className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <Link to={"/tutorials"} className="nav-link">
                                Item List
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to={"/add"} className="nav-link">
                                Add Item
                            </Link>
                        </li>
                    </div>

                </nav>

                <div className="container mt-3">
                    <Routes>
                        <Route path="/" element={<TutorialsList/>}/>
                        <Route path="/tutorials" element={<TutorialsList/>}/>
                        <Route path="/add" element={<AddTutorial/>}/>
                        <Route path="/tutorials/:id" element={<Tutorial/>}/>
                    </Routes>
                </div>
            </div>

            <div className="h-96 text-left">
                <Counter/>
            </div>
        </>
    )
}

export default App;