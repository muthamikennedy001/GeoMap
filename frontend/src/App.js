import "./App.css";
import "./Index.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./Components/Header";
import Home from "./Components/Home";
import AddGeoMap from "./Components/AddGeoMap";
import ViewAllMaps from "./Components/ViewAllMaps";
import AddSoilData from "./Components/AddSoilData";
import SignupPage from "./pages/Register";
import LoginPage from "./pages/Login";
import LogOut from "./pages/logout";
import DashBoard from "./pages/Home";
import ViewSpecificFarmerDetails from "./Components/ViewSpecifFarmerDetails";
import ParcelSoilData from "./Components/ParcelSoilData";

function App() {
  return (
    <div className="App">
      <Router>
        {/* <Header /> */}
        <Switch>
          <Route exact path="/" component={LoginPage} />
          <Route path="/map/:name" component={AddGeoMap} />
          <Route path="/viewAllMaps" component={ViewAllMaps} />
          <Route path="/AddSoilData/" component={AddSoilData} />
          <Route path="/LoginPage" component={LoginPage} />
          <Route path="/signup" component={SignupPage} />
          <Route path="/home" component={Home} />
          <Route path="/dashboard/:type" component={DashBoard} />
          <Route path="/logout" component={LogOut} />
          <Route path="/farmer/:idno" component={ViewSpecificFarmerDetails} />"
          <Route path="/AddParcelData/:mapId" component={ParcelSoilData} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
