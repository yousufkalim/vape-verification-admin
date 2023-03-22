/*!

=========================================================
* Argon Dashboard React - v1.2.1
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, { useEffect } from 'react';
import { useLocation, Route, Switch, Redirect, useHistory } from 'react-router-dom';
import api from 'api';
import { Store, UpdateStore } from 'StoreContext';
// reactstrap components
import { Container } from 'reactstrap';
// core components
import AdminNavbar from 'components/Navbars/AdminNavbar.js';
import AdminFooter from 'components/Footers/AdminFooter.js';
import Sidebar from 'components/Sidebar/Sidebar.js';

import routes from 'routes.js';
import Header from 'components/Headers/Header';
import { mediaUrl } from 'config';

const Brand = (props) => {
  const mainContent = React.useRef(null);
  const location = useLocation();
  let history = useHistory();

  const { loggedIn } = Store();
  const updateStore = UpdateStore();
  const store = Store();

  const sidebarRoutes = routes.filter((route) => !route.isChild && route.layout === '/brand');

  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    mainContent.current.scrollTop = 0;

    // checkauth
    getUser();
  }, [location]);

  const getUser = () => {
    api('get', '/auth').then((data) => {
      api('get', `/users/${data.user._id}`).then((userData) => {
        if (userData?.user && userData?.user?.active) {
          updateStore({
            user: userData.user,
            loggedIn: true,
            token: data.token,
          });
        } else {
          localStorage.setItem('token', '');
          history.push('/auth/login');
        }
      });
    });
  };

  useEffect(() => {
    getStats();
  }, []);

  const getStats = () => {
    api('get', '/users/stats').then((res) => {
      updateStore({ stats: res?.stats });
    });
  };

  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.layout === '/brand' && loggedIn) {
        return <Route exact path={prop.layout + prop.path} component={prop.component} key={key} />;
      } else {
        return null;
      }
    });
  };

  const getBrandText = (path) => {
    for (let i = 0; i < routes.length; i++) {
      if (props.location.pathname.indexOf(routes[i].layout + routes[i].path) !== -1) {
        return routes[i].name;
      }
    }
    return 'Brand';
  };

  const token = localStorage.getItem('token');
  if (!token) {
    history.push('/auth/login');
  } else if (store?.user?.role === 'admin') {
    history.push('/admin/index');
  }

  const logo = `${mediaUrl}${store?.user?.preferences?.logo}`;

  return (
    <>
      <Sidebar
        {...props}
        routes={sidebarRoutes}
        logo={{
          innerLink: '/admin/index',
          imgSrc: logo,
          imgAlt: '...',
        }}
      />
      <div className='main-content' ref={mainContent}>
        <AdminNavbar
          getUser={getUser}
          {...props}
          brandText={getBrandText(props.location.pathname)}
        />
        <Header />
        <Switch>
          {getRoutes(routes)}
          <Redirect from='*' to='/brand/index' />
        </Switch>
        <Container fluid>
          <AdminFooter />
        </Container>
      </div>
    </>
  );
};

export default Brand;
