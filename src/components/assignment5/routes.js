import React from "react";

function Routes(props) {
    const {projection, routes, selectedAirline } = props;

    if (selectedAirline === null) {
        return <g></g>;
    }
    const selectedRoutes = routes.filter(route => route.AirlineID === selectedAirline);
    return (
        <g>
            {selectedRoutes.map((route, idx) => {
                const source = projection([route.SourceLongitude, route.SourceLatitude]);
                const destination = projection([route.DestLongitude, route.DestLatitude]);
                return (
                    <line
                        key={idx}
                        x1={source[0]}
                        y1={source[1]}
                        x2={destination[0]}
                        y2={destination[1]}
                        stroke="#992a5b"
                        strokeWidth="0.1"
                    />
                );
            })}
        </g>
    );
}

export { Routes }
