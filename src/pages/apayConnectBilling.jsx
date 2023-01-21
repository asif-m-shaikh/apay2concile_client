import React from 'react'
import { IconHome, IconReceipt2 } from '@tabler/icons';
import Sidebar from '../components/sidebar';
import { APAYConnectURL } from '../router/client_router';




function ApayConnectBillingPage() {
  const home = APAYConnectURL.home;
  const billing = APAYConnectURL.billing;

    const data = [
        { link: home, label: 'Home', icon: IconHome },
        { link: billing, label: 'Billing', icon: IconReceipt2 },
      ];


    return (
    <div style={{display: 'flex', flexDirection: 'row'}}>
        <Sidebar data={data} name={'APAYConnect'}/>
        <div>APAYConnect Billing page</div>
    </div>
  )
}

export default ApayConnectBillingPage;