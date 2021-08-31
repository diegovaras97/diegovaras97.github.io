import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div style={{ display: "block" }}>
      <Link to={`./users`}> Ver lista de usuarios </Link>
      <Link to={`./cities`}> Ver lista de ciudades </Link>
    </div>
  );
};
export default Home;
