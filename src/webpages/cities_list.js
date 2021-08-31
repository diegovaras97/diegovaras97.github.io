import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const UsersList = () => {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch(
      "https://us-central1-taller-integracion-310700.cloudfunctions.net/tarea-1-2021-2/53739/cities"
    )
      .then((res) => res.json())
      .then(
        (data) => {
          setIsLoaded(true);
          setUsers(data);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, []);

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <div>
        <h1>Lista de ciudades</h1>
        <hr></hr>
        <ul>
          {users.map((city) => (
            <li key={city.id}>
              <div style={{ display: "line", height: "60" }}>
                <h4>
                  Nombre: {city.name} || País: {city.country}
                </h4>
                <Link to={`./city/${city.id}`}>
                  {" "}
                  Mostrar toda la información asociada a la ciudad{" "}
                </Link>
                <hr></hr>
              </div>
            </li>
          ))}
        </ul>
        <Link to={"/"}>Volver</Link>
      </div>
    );
  }
};
export default UsersList;
