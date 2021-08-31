import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch(
      "https://us-central1-taller-integracion-310700.cloudfunctions.net/tarea-1-2021-2/53739/users"
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
        <h1>Lista de usuarios</h1>
        <hr></hr>
        <ul>
          {users.map((user) => (
            <li key={user.id}>
              <div style={{ display: "line", height: "60" }}>
                <img
                  alt={`profile_${user.id}`}
                  src={user.avatar}
                  height="50"
                  style={{ borderRadius: "50%" }}
                ></img>
                <h4>
                  Nombre: {user.name} || Apellido: {user.lastName} || Correo:{" "}
                  {user.email}
                </h4>
                <Link to={`./user/${user.id}`}> Ver perfil </Link>
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
