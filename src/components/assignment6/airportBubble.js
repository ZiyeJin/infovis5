import React, { useEffect, useState } from "react";
import { groupByCity } from "./utils";
import { forceSimulation, forceX, forceY, forceCollide } from "d3-force";
import { scaleLinear } from "d3-scale";
import { min, max } from "d3-array";

function AirportBubble(props) {
    const { width, height, routes, selectedAirline } = props;
    const runSimulation = (cities) => {
        const radiusScale = scaleLinear()
            .domain([min(cities, d => d.Count), max(cities, d => d.Count)])
            .range([2, width * 0.15]);

        forceSimulation(cities)
            .velocityDecay(0.2)
            .force("x", forceX(width / 2).strength(0.02))
            .force("y", forceY(height / 2).strength(0.02))
            .force("collide", forceCollide(d => radiusScale(d.Count)))
            .tick(200);

        return cities;
    };

    const [cityData, setCityData] = useState([]);

    useEffect(() => {
        let cities;
        if (selectedAirline) {
            cities = groupByCity(routes.filter(a => a.AirlineID === selectedAirline));
        } else {
            cities = groupByCity(routes);
        }
        
        cities.sort((a, b) => a.Count - b.Count);
        
        setCityData(runSimulation(cities));
    }, [routes, selectedAirline, width, height]);

    const renderBubbles = cityData.map((city, idx) => {
        const topHub = idx >= cityData.length - 5;
        return (
            <g key={city.City + idx}>
                <circle
                    cx={city.x}
                    cy={city.y}
                    r={scaleLinear()
                        .domain([min(cityData, d => d.Count), max(cityData, d => d.Count)])
                        .range([2, width * 0.15])(city.Count)}
                    fill={topHub ? "#ADD8E6" : "#2a5599"}
                    stroke="black"
                    strokeWidth="2"
                />
                {topHub && (
                    <text
                        x={city.x}
                        y={city.y}
                        style={{
                            textAnchor: "middle",
                            stroke: "pink",
                            strokeWidth: "0.5em",
                            fill: "#992a2a",
                            fontSize: "16",
                            fontFamily: "cursive",
                            paintOrder: "stroke",
                            strokeLinejoin: "round"
                        }}
                    >
                        {city.City}
                    </text>
                )}
            </g>
        );
    });

    return <g>{renderBubbles}</g>;
}

export default AirportBubble;

export { AirportBubble }