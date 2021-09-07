import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const CitiesList = () => {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [users, setUsers] = useState([]);
  const [pageNumber, setPageNumber] = useState(6);
  const [currentPage, setCurrentPage] = useState(1);

  function handleEvent(e) {
    const value = e.target.value.replace(/\D/, "");
    const pages = Math.ceil(pageNumber / 10);
    value > pages ? setCurrentPage(pages) : setCurrentPage(value);
  }

  useEffect(() => {
    fetch(
      `https://us-central1-taller-integracion-310700.cloudfunctions.net/tarea-1-2021-2/53739/cities?_page=${currentPage}`
    )
      .then((res) => {
        setPageNumber(res.headers.get("X-Total-Count"));
        return res.json();
      })
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
  }, [currentPage]);

  const handleFocus = (event) => event.target.select();

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <div>
        <h1>Lista de ciudades</h1>
        <hr></hr>
        Digite el numero de página a ver (máx. {Math.ceil(
          pageNumber / 10
        )}):{" "}
        <input
          onFocus={handleFocus}
          type="text"
          pattern="[0-9]*"
          onInput={(e) => handleEvent(e)}
          value={currentPage}
        />
        <br></br>
        <br></br>
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
        <Link to={"/"} style={{ fontSize: 20 }}>
          Volver
        </Link>
      </div>
    );
  }
};
export default CitiesList;
