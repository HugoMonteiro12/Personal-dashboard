import React from 'react';
import './App.css';
import Header from './components/Header';
import Weather from './components/Weather';
import Calendar from './components/Calendar';
import News from './components/News';
import Spotify from './components/Spotify';
import Photo from "./components/Photo";

function App() {
    return (
        <div className="min-h-screen bg-gray-900 p-6">
            <div className="grid grid-cols-12 gap-6 max-w-[1920px] h-[1080px] mx-auto">
                <Header />
                <Weather />
                <Spotify />
                <News />
                <Calendar />
                <Photo />
            </div>
        </div>
    );
}

export default App;

