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
import Index from 'views/Index.js';
import Register from 'views/Register.js';
import Login from 'views/Login.js';
import Brands from 'views/brands/Brands';
import CodeRequests from 'views/CodeRequests/CodeRequests';
import BrandCodes from 'views/BrandCodes/BrandCodes';
import Customization from 'views/Customization/Customization';
import AdminBrandCodes from 'views/AdminBrandCodes/AdminBrandCodes';
import BrandDashboard from 'views/BrandDashboard/BrandDashboard';
import ResetPassword from 'views/ResetPassword';
import BrandCodesRequests from 'views/BrandCodesRequests/BrandCodesRequests';
import VerifyOtp from 'views/VerifyOtp';
import VectorMap from 'views/Map/VectorMap';

var routes = [
  /*    Super Admin Routes    */
  {
    path: '/:id/code',
    name: 'Brand Codes',
    icon: 'ni ni-single-02 text-primary',
    component: AdminBrandCodes,
    layout: '/admin',
    isChild: true,
  },
  {
    path: '/index',
    name: 'Dashboard',
    icon: 'ni ni-tv-2 text-red',
    component: Index,
    layout: '/admin',
    isChild: false,
  },
  {
    path: '/brands',
    name: 'All Brands',
    icon: 'fas fa-users text-primary',
    component: Brands,
    layout: '/admin',
    isChild: false,
  },
  {
    path: '/map',
    name: 'Vector Map',
    icon: 'fas fa-plus-square text-primary',
    component: VectorMap,
    layout: '/admin',
    isChild: false,
  },
  {
    path: '/batch-requests',
    name: 'Batch Requests',
    icon: 'fas fa-plus-square text-primary',
    component: CodeRequests,
    layout: '/admin',
    isChild: false,
  },
  /*    Brand Admin Routes    */
  {
    path: '/index',
    name: 'Dashboard',
    icon: 'ni ni-tv-2 text-red',
    component: BrandDashboard,
    layout: '/brand',
    isChild: false,
  },
  {
    path: '/batch-requests',
    name: 'Batch Requests',
    icon: 'fas fa-plus-square text-primary',
    component: BrandCodesRequests,
    layout: '/brand',
    isChild: false,
  },
  {
    path: '/codes',
    name: 'All Codes',
    icon: 'fas fa-barcode text-primary',
    component: BrandCodes,
    layout: '/brand',
    isChild: false,
  },
  {
    path: '/customization',
    name: 'Customization',
    icon: 'fa fa-list-alt text-primary',
    component: Customization,
    layout: '/brand',
    isChild: false,
  },
  {
    path: '/map',
    name: 'Vector Map',
    icon: 'fas fa-plus-square text-primary',
    component: VectorMap,
    layout: '/brand',
    isChild: false,
  },
  // {
  //   path: '/batch',
  //   name: 'View Brand',
  //   outerLink: true,
  //   icon: 'fas fa-barcode text-primary',
  //   component: BrandCodes,
  //   layout: '/brand',
  //   isChild: false,
  // },
  /*    Auth Routes   */
  // {
  //   path: '/register',
  //   name: 'Register',
  //   icon: 'ni ni-key-25 text-info',
  //   component: Register,
  //   layout: '/auth',
  //   isChild: false
  // },
  {
    path: '/login',
    name: 'Login',
    icon: 'ni ni-circle-08 text-pink',
    component: Login,
    layout: '/auth',
    isChild: false,
  },
  {
    path: '/verify-otp/:email',
    name: 'Verify Otp',
    icon: 'ni ni-circle-08 text-pink',
    component: VerifyOtp,
    layout: '/auth',
    isChild: false,
  },
  {
    path: '/verify/:token',
    name: 'Dashboard',
    icon: 'ni ni-tv-2 text-red',
    component: ResetPassword,
    layout: '/reset',
    isChild: false,
  },
];
export default routes;
