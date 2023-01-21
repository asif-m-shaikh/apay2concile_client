import React from 'react';
import { MantineProvider } from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PaymentPage from '../pages/payment-page';
import Home from '../pages/home-page';
import ApayConnectHomePage from '../pages/apayConnectHome-page';
import ApayConnectBillingPage from '../pages/apayConnectBilling';
import VendorDashboardHomePage from '../pages/vendorHome-page';
import VendorPartnerPage from '../pages/vendorPartner-page';
import { APAYConnectURL, VendorURL } from './client_router';


function App() {
  return (
    <MantineProvider withNormalizeCSS withGlobalStyles>
    <NotificationsProvider>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='payment' element={<PaymentPage />} />
        <Route path={VendorURL.home} element={<VendorDashboardHomePage />} />
        <Route path={VendorURL.partner} element={<VendorPartnerPage />} />
        <Route path={APAYConnectURL.home} element={<ApayConnectHomePage />} />
        <Route path={APAYConnectURL.billing} element={<ApayConnectBillingPage />} />
      </Routes>
    </BrowserRouter>
    </NotificationsProvider>
    </MantineProvider>
  )
}

export default App