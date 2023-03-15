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
import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { ToastContainer, Flip } from 'react-toastify';

import 'antd/lib/select/style/css';
import 'assets/plugins/nucleo/css/nucleo.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'assets/scss/argon-dashboard-react.scss';
import 'react-toastify/dist/ReactToastify.css';

import AdminLayout from 'layouts/Admin.js';
import AuthLayout from 'layouts/Auth.js';
import Brand from 'layouts/Brand';
import ResetPassword from 'views/ResetPassword';

function App() {
  return (
    <>
      <ToastContainer position='bottom-right' autoClose={3000} transition={Flip} />

      <BrowserRouter>
        <Switch>
          <Route path='/admin' render={(props) => <AdminLayout {...props} />} />
          <Route path='/brand' render={(props) => <Brand {...props} />} />
          <Route path='/auth' render={(props) => <AuthLayout {...props} />} />
          <Route path='/verify/:token' component={ResetPassword} />
          <Redirect from='/' to='/auth/login' />
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
