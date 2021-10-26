import React, { useState, useRef, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  Polyline,
} from "react-leaflet";
import ChatRoom from "./chatRoom";

import L from "leaflet";
import "leaflet/dist/leaflet.css";

import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
});

L.Marker.prototype.options.icon = DefaultIcon;

const socketIOClient = require("socket.io-client");
const SOCKET_SERVER_URL =
  "ws://tarea-3-websocket.2021-2.tallerdeintegracion.cl";

const TRUCK_EVENT = "TRUCKS"; // Name of the event

const Home = (props) => {
  const [error] = useState(null);
  const [trucks, setTrucks] = useState([]);
  const socketRef = useRef();

  function ChangeView({ center, zoom }) {
    const map = useMap();
    map.setView(center, zoom);
    return null;
  }

  const CSS_COLOR_NAMES = [
    "red",
    "blue",
    "brown",
    "black",
    "SeaGreen",
    "SeaShell",
    "Sienna",
    "SkyBlue",
    "SlateBlue",
    "SpringGreen",
    "SteelBlue",
    "Tan",
    "Teal",
    "Thistle",
    "Tomato",
    "Turquoise",
    "Violet",
    "Yellow",
    "YellowGreen",
  ];

  function randomChoice(arr) {
    return arr[Math.floor(arr.length * Math.random())];
  }
  useEffect(() => {
    socketRef.current.on(
      TRUCK_EVENT,
      (message) => {
        setTrucks(message);
        console.log(message);
      },
      []
    );
  }, []);
  socketRef.current = socketIOClient.connect(SOCKET_SERVER_URL, {
    path: "/trucks",
  });
  socketRef.current.emit(TRUCK_EVENT);

  if (error) {
    return <div>Error: {error.message}</div>;
  } else {
    return (
      <div>
        <hr></hr>
        <h1>App de flota de camiones</h1>
        <hr></hr>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            width: "100%",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              flexBasis: "100%",
              flex: 1,
              margin: 8,
            }}
          >
            <div style={{ display: "table-row" }}>
              <h3>Mapa</h3>
              <div
                style={{
                  width: "100%",
                  height: "400px",
                  boxShadow: "5px 5px 5px #888",
                }}
              >
                <MapContainer
                  center={[51.505, -0.09]}
                  zoom={1}
                  scrollWheelZoom={false}
                  style={{ height: "400px" }}
                >
                  <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  {trucks.map((truck, i) => (
                    <div key={i}>
                      <Polyline
                        positions={[truck.origin, truck.destination]}
                        color={randomChoice(CSS_COLOR_NAMES)}
                      />

                      <ChangeView center={truck.origin} zoom={10} />
                      <Marker position={truck.origin}>
                        <Popup>Origen de {truck.truck}</Popup>
                      </Marker>
                      <Marker position={truck.destination}>
                        <Popup>Destino de {truck.truck} </Popup>
                      </Marker>
                    </div>
                  ))}
                </MapContainer>
              </div>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              flexBasis: "100%",
              flex: 1,
              margin: 8,
            }}
          >
            <div style={{ display: "table-row" }}>
              <h3>Chat</h3>
              <ChatRoom></ChatRoom>
            </div>
          </div>
        </div>
        Y aca abajo lo de los estados
      </div>
    );
  }
};

export default Home;
