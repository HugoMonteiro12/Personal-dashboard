import React from 'react';
import './App.css';
import Header from './components/Header';
import Weather from './components/Weather';
import Calendar from './components/Calendar';
import Agenda from './components/Agenda';
import News from './components/News';
import Spotify from './components/Spotify';

function App() {
    return (
        <div className="min-h-screen bg-gray-900 p-6">
            <div className="grid grid-cols-12 gap-6 max-w-[1920px] h-[1080px] mx-auto">
                <Header />
                <Weather />
                <Calendar />
                <Agenda />
                <News />
                <Spotify />
            </div>
        </div>
    );
}

export default App;

