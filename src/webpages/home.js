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

  function handleRepair(code) {
    socketRef.current.emit("CHAT", {
      message: `Esta siendo atendido el camión ${code}`,
      name: "Alerta de Sistema",
    });
    socketRef.current.emit("FIX", {
      code: code,
    });
  }

  useEffect(() => {
    socketRef.current.on(
      TRUCK_EVENT,
      (message) => {
        var out = message.map((x) => {
          x.status = "Ok";
          x.fails = "Ninguna";
          x.actual_position = false;

          return x;
        });
        setTrucks(out);
      },
      []
    );
  }, []);
  useEffect(() => {
    socketRef.current.on(
      "FAILURE",
      (message) => {
        var trucks2 = [...trucks];
        trucks2.map((truck) => {
          if (truck.code === message.code) {
            truck.status = "Not ok";
            truck.fails = message.source;
            setTrucks(trucks2);
          }
        });
      },
      []
    );
    socketRef.current.on(
      "POSITION",
      (message) => {
        var trucks2 = [...trucks];
        trucks2.map((truck) => {
          if (truck.code === message.code) {
            truck.actual_position = message.position;
            setTrucks(trucks2);
          }
        });
      },
      []
    );

    socketRef.current.on(
      "FIX",
      (message) => {
        var trucks2 = [...trucks];
        trucks2.map((truck) => {
          if (truck.code === message.code) {
            truck.status = "Ok";
            truck.fails = "Ninguna";
            setTrucks(trucks2);
          }
        });
      },
      []
    );
  }, [trucks]);
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

                      <ChangeView center={trucks[0].origin} zoom={10} />
                      {truck.actual_position && (
                        <Marker position={truck.actual_position}>
                          <Popup>Destino de {truck.truck} </Popup>
                        </Marker>
                      )}
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
        <br></br>
        <ul>
          {trucks.map((truck) => (
            <li key={truck.code}>
              <div
                style={{
                  display: "line",
                  color: `${truck.status === "Ok" ? "green" : "red"}`,
                }}
              >
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                  }}
                >
                  <button
                    style={{
                      marginLeft: 16,
                      marginRight: 16,
                    }}
                    disabled={truck.status === "Ok"}
                    onClick={() => handleRepair(truck.code)}
                  >
                    {" "}
                    Reparar
                  </button>
                  <h4> Camión : {truck.truck} </h4>
                  <h6 style={{ marginLeft: 16 }}>
                    Código: {truck.code} || Motor: {truck.engine} || Estado:{" "}
                    {truck.status} || Capacidad: {truck.capacity}
                  </h6>
                </div>

                <h5 style={{ fontWeight: "bold" }}>
                  Origen : {truck.origin} → Destino : {truck.destination}
                </h5>
                <h5 style={{ fontWeight: "bold" }}>Fallas: {truck.fails}</h5>
                <h6> Staff:</h6>
                {truck.staff.map((person) => (
                  <h6 key={person.name}>
                    {person.name}, {person.age}
                  </h6>
                ))}

                <hr></hr>
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  }
};

export default Home;
