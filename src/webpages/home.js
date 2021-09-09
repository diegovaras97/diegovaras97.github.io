import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <div
        style={{
          display: "flex",
          marginLeft: 100,
          marginTop: 100,
          textDecorationLine: "underline",
        }}
      >
        <img
          height="60"
          src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/36cf953e-bc1d-49bd-9dde-dff42a74e146/d46nsar-dacdd7d1-6a32-4550-9b9d-b3dd7b2d9c27.gif?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzM2Y2Y5NTNlLWJjMWQtNDliZC05ZGRlLWRmZjQyYTc0ZTE0NlwvZDQ2bnNhci1kYWNkZDdkMS02YTMyLTQ1NTAtOWI5ZC1iM2RkN2IyZDljMjcuZ2lmIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.1q8n0E5yWiPMY-Jis-yT-iDj7jgElkyfkLAd4Xs30Dg"
        ></img>
        <h1 style={{ marginLeft: 20 }}>Bienvenido a Panchillapp!</h1>
      </div>
      <div
        style={{
          display: "block",
          marginLeft: 500,
          fontSize: 36,
        }}
      >
        <br></br>
        <br></br>
        <Link to={`./users`}> Ver lista de usuarios </Link>
        <br></br>
        <br></br>
        <Link to={`./cities`}> Ver lista de ciudades </Link>
      </div>
    </div>
  );
};
export default Home;
