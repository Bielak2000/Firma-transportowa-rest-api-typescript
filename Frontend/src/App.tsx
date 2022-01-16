import React from 'react';
import './App.css';
import {Route, Routes} from "react-router-dom";
import {TrasyList} from "./Pages/TrasyList";
import {PojazdyList} from "./Pages/PojazdyList";
import {KierowcyList} from "./Pages/KierowcyList";
import {Navigation} from "./Pages/Navigation";
import {TrasaPreview} from './Pages/TrasaPreview';
import {PojazdPreview} from './Pages/PojazdPreview';
import {KierowcaPreview} from './Pages/KierowcaPreview';
import {KierowcaForm} from './Pages/KierowcaForm';
import {TrasaForm} from './Pages/TrasaForm';
import {Login} from "./Pages/Login";
import {AuthRequired} from "./Pages/AuthRequired";
import {Wyloguj} from "./Pages/Wyloguj";
import {PojazdForm} from "./Pages/PojazdForm"


function App() {
    return (
        <div>
            <Navigation/>

            <Routes>
                <Route path="/" element={<Login/>}/>
                <Route path="/trasy" element={<TrasyList/>}/>
                <Route path="/pojazdy" element={<PojazdyList/>}/>
                <Route path="/kierowcy" element={<KierowcyList/>}/>
                <Route path="/trasy/:id" element={<TrasaPreview/>}/>
                <Route path="/pojazdy/:id" element={<PojazdPreview/>}/>
                <Route path="/kierowcy/:id" element={<KierowcaPreview/>}/>
                <Route path="/trasy/add" element={<AuthRequired><TrasaForm/></AuthRequired>}/>
                <Route path="/trasy/edit/:id" element={<AuthRequired><TrasaForm/></AuthRequired>}/>
                <Route path="/kierowcy/add" element={<AuthRequired><KierowcaForm/></AuthRequired>}/>
                <Route path="/kierowcy/edit/:id" element={<AuthRequired><KierowcaForm/></AuthRequired>}/>
                <Route path="/pojazdy/add" element={<AuthRequired><PojazdForm/></AuthRequired>}/>
                <Route path="/pojazdy/edit/:id" element={<AuthRequired><PojazdForm/></AuthRequired>}/>
                <Route path="/wyloguj" element={<AuthRequired><Wyloguj/></AuthRequired>}/>
            </Routes>
        </div>

    );
}

export default App;
