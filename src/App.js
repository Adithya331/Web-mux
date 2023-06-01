import React from "react";
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import {Routes, Route} from 'react-router-dom';
import FrontPage from "./FrontPage";
import ScreenShare from "./ScreenShare";

export default function App()
{
  return(
    <div>
        <BrowserRouter>
					<Routes>                                                                        
						<Route path="/" element={<FrontPage/>}/>
						<Route path="/screen" element={<ScreenShare/>}/>
				</Routes>                    
		</BrowserRouter>
    </div>
  );
}