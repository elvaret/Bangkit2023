import React from "react";
import '../Dashboard.css';

const HomeComp = () => {
    return (
        <div>
            <section className='home' id='home'>
                <div className="container">
                    <h1>GlassFIT</h1>
                    <h2>Find Your Perfect Frame</h2>
                    <p>Get your perfect frame by initializing your face shape and finding the nearest glasses shops around your location!</p>
                    <button><a href="#about">Get Started</a></button>
                </div>
            </section>
        </div>
    )
}


export default HomeComp;