import React from 'react';
import "bootstrap/dist/css/bootstrap.css";
import 'antd/dist/antd.css';
import './App.css';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";

import GenrePage from "./pages/GenrePage";
import LoginPage from "./pages/LoginPage";
import ChangePasswordPage from "./pages/ChangePasswordPage";
import Logout from "./pages/Logout";
import PlanPage from "./pages/PlanPage";
import SubscriptionPage from "./pages/SubscriptionPage";
import ManagerPage from "./pages/ManagerPage";
import CustomerPage from "./pages/CustomerPage";
import MoviePage from "./pages/MoviePage";
import SeriesPage from "./pages/SeriesPage";
import AddManagerPage from "./pages/AddManagerPage";
import AddPlanPage from "./pages/AddPlanPage";
import AddCustomerPage from "./pages/AddCustomerPage";
import AddMoviePage from "./pages/AddMoviePage";
import AddSeriesPage from "./pages/AddSeriesPage";
import EditManagerPage from "./pages/EditManagerPage";
import EditPlanPage from "./pages/EditPlanPage";
import EditCustomerPage from "./pages/EditCustomerPage";
import EditMoviePage from "./pages/EditMoviePage";
import EditSeriesPage from "./pages/EditSeriesPage";
import CustomerDetailsPage from "./pages/CustomerDetailsPage";
import MovieDetailsPage from "./pages/MovieDetailsPage";
import SeriesDetailsPage from "./pages/SeriesDetailsPage";
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
          <Route exact path="/plans/add" component={AddPlanPage}/>
          <Route exact path="/customers/add" component={AddCustomerPage}/>
          <Route exact path="/movies/add" component={AddMoviePage}/>
          <Route exact path="/series/add" component={AddSeriesPage}/>
          <Route path="/managers/edit/:managerID" component={EditManagerPage}/>
          <Route path="/customers/edit/:customerID" component={EditCustomerPage}/>
          <Route path="/movies/edit/:movieID" component={EditMoviePage}/>
          <Route path="/series/edit/:seriesID" component={EditSeriesPage}/>
          <Route path="/plans/edit/:planID" component={EditPlanPage}/>
          <Route path="/customers/details/:customerID" component={CustomerDetailsPage}/>
          <Route path="/movies/details/:movieID" component={MovieDetailsPage}/>
          <Route path="/series/details/:seriesID" component={SeriesDetailsPage}/>
          <Route path="/genres" component={GenrePage}/>
          <Route path="/plans" component={PlanPage}/>
          <Route path="/subscriptions" component={SubscriptionPage}/>
          <Route path="/login" component={LoginPage}/>
          <Route path="/logout" component={Logout}/>
          <Route path="/users/change-password" component={ChangePasswordPage}/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
