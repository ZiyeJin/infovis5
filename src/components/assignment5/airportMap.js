import React from "react";
import { geoPath, geoMercator } from "d3-geo";
import { Routes } from './routes'
import { count } from "d3";


function AirportMap(props){
    const {width, height, countries, airports, routes, selectedAirline} = props;
    console.log(airports)
    //TODO: 
    // 1.Define a projection which is geoMercator; 
    // set .scale(97), and .translate([width/2, height/2+20]); 
    let projection = geoMercator()
        .scale(97)
        .translate([width / 2, height / 2 + 20]);

    // 2. Define a path generator using geoPath();
    let pathGenerator = geoPath().projection(projection);

    // 3. Plot the world map; remember to use countries.features.map(); (Note: stroke is "#ccc", and color is "#eee");
    // 4. Plot the airports; remember to use routes.map(); (Note: radius is 1; color is "#2a5599"); 

    return (
        <g>
            {countries.features.map((feature, index) => (
                <path
                    key={index}
                    d={pathGenerator(feature)}
                    fill="#eee"
                    stroke="#ccc"
                />
            ))}
            
            {airports.map((airport, index) => {
                const [x, y] = projection([airport.Longitude, airport.Latitude]);
                return (
                    <circle
                        key={index}
                        cx={x}
                        cy={y}
                        r={1}
                        fill="#2a5599"
                    />
                );
            })}
            
            <Routes projection={projection} routes={routes} selectedAirline={selectedAirline} />
        </g>
    );
}

export { AirportMap }