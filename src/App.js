import React, { useContext } from "react";
import './App.css';

import { Switch, withRouter, Redirect} from 'react-router-dom';

import { Routes } from "./Routes/Routes";
import PublicRoute from './Routes/public.routes';
import PrivateRoute from './Routes/private.routes';

import Layout from './hoc/Layout/Layout';

// screens
import { Login } from "./screens/Login/Login";

// super admin
import ChangePassword from "./screens/SuperAdmin/ChangePassword/ChangePassword";

import BusinessAccounts  from "./screens/SuperAdmin/BusinessAccount/BusinessAccount";
import AccuontRequest from "./screens/SuperAdmin/BusinessAccount/AccountRequest/AccountRequest";

import Categories from "./screens/SuperAdmin/Categories/Categories";
import AllUsers from './screens/SuperAdmin/Users/Users';
import Reports from './screens/SuperAdmin/Reports/Reports';
import Pricing from './screens/SuperAdmin/Pricing/Pricing';

// user admin
import Client from './screens/UserAdmin/Clients/Clients';
import Message from './screens/UserAdmin/Messages/Messages';
import Profiles from './screens/UserAdmin/Profile/Profile';
import Services from './screens/UserAdmin/Services/Services';
import Settings from './screens/UserAdmin/Settings/Settings';

import { Role } from "./Assets/Data";

import MyContext from './context/AuthContext/context';

const App = (props) => {

  const {history} = props;

  const pathanme = history.location.pathname;

  const value = useContext(MyContext);

  const { data } = value;

  let routes;
  
  if (Role.superAdmin.flag === data?.currRole) {
    routes = (
      <>
        <PrivateRoute path={`/${Routes.reports}`} exact component={Reports} restricted={true} auth={data} />
        <PrivateRoute path={`/${Routes.allUsers}`} exact component={() => <AllUsers isBanned={false} />} restricted={true} auth={data} />
        <PrivateRoute path={`/${Routes.bannedUsers}`} exact component={() => <AllUsers isBanned={true} />} restricted={true} auth={data} />
        <PrivateRoute path={`/${Routes.changePassword}`} exact component={ChangePassword} restricted={true} auth={data} />
        <PrivateRoute path={`/${Routes.businessAccounts}`} exact component={BusinessAccounts} restricted={true} auth={data} />
        <PrivateRoute path={`/${Routes.businessAccounts}/view/:id`} exact component={AccuontRequest} restricted={true} auth={data} />
        <PrivateRoute path={`/${Routes.categories}`} exact component={Categories} restricted={true} auth={data} />
        <PrivateRoute path={`/${Routes.pricing}`} exact component={Pricing} restricted={true} auth={data} />
      </>
    )
  }

  if (Role.admin.flag === data?.currRole) {
    routes = (
      <>
        <PrivateRoute path={`/${Routes.clients}`} exact component={Client} restricted={true} auth={data} />
        <PrivateRoute path={`/${Routes.messages}`} exact component={Message} restricted={true} auth={data} />
        <PrivateRoute path={`/${Routes.profile}`} exact component={Profiles} restricted={true} auth={data} />
        <PrivateRoute path={`/${Routes.services}`} exact component={Services} restricted={true} auth={data} />
        <PrivateRoute path={`/${Routes.settings}`} exact component={Settings} restricted={true} auth={data} />    
        <PublicRoute 
          path={`/${Routes.login}`} 
          exact component={() => <Login loginAuth={data?.loginAuth} />} 
          restricted={true} 
        />
      </>
    )
  }

  return(

    <Switch>
      
      { pathanme === "/" && <Redirect exact to={`/${Routes.login}`} /> }

      <Layout  history={history} isLogin={data?.loginAuth} currentRole={data?.currRole}>
        
        {routes}
  
      </Layout>

    </Switch>

  );

}

export default withRouter(App);
