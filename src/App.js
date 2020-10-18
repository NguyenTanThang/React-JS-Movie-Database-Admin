import React from 'react';
import "bootstrap/dist/css/bootstrap.css";
import 'antd/dist/antd.css';
import './App.css';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";

import GenrePage from "./pages/GenrePage";
import ManagerPage from "./pages/ManagerPage";
import CustomerPage from "./pages/CustomerPage";
import MoviePage from "./pages/MoviePage";
import SeriesPage from "./pages/SeriesPage";
import AddManagerPage from "./pages/AddManagerPage";
import AddCustomerPage from "./pages/AddCustomerPage";
import AddMoviePage from "./pages/AddMoviePage";
import AddSeriesPage from "./pages/AddSeriesPage";
import EditManagerPage from "./pages/EditManagerPage";
import EditCustomerPage from "./pages/EditCustomerPage";
import EditMoviePage from "./pages/EditMoviePage";
import EditSeriesPage from "./pages/EditSeriesPage";
import LayoutSide from "./components/partials/LayoutSide";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={LayoutSide}/>
          <Route exact path="/managers" component={ManagerPage}/>
          <Route exact path="/movies" component={MoviePage}/>
          <Route exact path="/series" component={SeriesPage}/>
          <Route exact path="/customers" component={CustomerPage}/>
          <Route exact path="/managers/add" component={AddManagerPage}/>
          <Route exact path="/customers/add" component={AddCustomerPage}/>
          <Route exact path="/movies/add" component={AddMoviePage}/>
          <Route exact path="/series/add" component={AddSeriesPage}/>
          <Route path="/managers/edit/:managerID" component={EditManagerPage}/>
          <Route path="/customers/edit/:customerID" component={EditCustomerPage}/>
          <Route path="/movies/edit/:movieID" component={EditMoviePage}/>
          <Route path="/series/edit/:seriesID" component={EditSeriesPage}/>
          <Route path="/genres" component={GenrePage}/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
