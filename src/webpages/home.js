import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
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

const Home = (props) => {
  const [error] = useState(null);

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
                  zoom={13}
                  scrollWheelZoom={false}
                  style={{ height: "400px" }}
                >
                  <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  <Marker position={[51.505, -0.09]}>
                    <Popup>
                      A pretty CSS3 popup. <br /> Easily customizable.
                    </Popup>
                  </Marker>
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
