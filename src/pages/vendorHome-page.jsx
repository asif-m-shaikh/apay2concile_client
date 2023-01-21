import React from 'react'
import { IconBuilding, IconHome, IconReceipt2 } from '@tabler/icons';
import SidebarApayConnect from '../components/sidebar';
import { VendorURL } from '../router/client_router';
import { SimpleGrid, Table } from '@mantine/core';
import { Paper, Text, Group, RingProgress, } from '@mantine/core'
import { IconArrowUpRight, IconArrowDownRight } from '@tabler/icons';
import { useEffect } from 'react';
import { GetAgingReport, GetStatusCountMiddleware } from './vendorMiddleware';
import { useState } from 'react';
import { showNotification } from '@mantine/notifications';



const icons = {
  up: IconArrowUpRight,
  down: IconArrowDownRight,
};


function StatsRing(props) {
  const stats = props.data.map((stat) => {
    return (
      <Paper withBorder radius="md" p="xs" key={stat.label}>
        <Group>
          <RingProgress
            size={80}
            roundCaps
            thickness={8}
            sections={[{ value: stat.progress, color: stat.color }]}
          />

          <div>
            <Text color="dimmed" size="xs" transform="uppercase" weight={700}>
              {stat.label}
            </Text>
            <Text weight={700} size="xl">
              {stat.stats}
            </Text>
          </div>
        </Group>
      </Paper>
    );
  });
  return (
    <SimpleGrid cols={3} breakpoints={[{ maxWidth: 'xs', cols: 1 }]}>
      {stats}
    </SimpleGrid>
  );
}


function VendorDashboardHomePage() {

  const [counts, setCounts] = useState({completed: 0, awaiting: 0, rejected: 0});
  const [totalCounts, setTotalCounts] = useState(0);

      const data = [
          { link: VendorURL.home, label: 'Home', icon: IconHome },
          { link: VendorURL.partner, label: 'Partner', icon: IconBuilding },
        ];

        
        useEffect(() => {
          // on mount
          let date = new Date();
          let month = Number(date.getMonth()) < 10 ? `0${date.getMonth()+1}` : `0${date.getMonth()+1}`;
          let day = Number(date.getDate()) < 10 ? `0${date.getDate()+1}` : `0${date.getDate()+1}`;
          let year = date.getFullYear();


          let date7 = new Date();
          let newmonth = Number(date7.getMonth()) < 10 ? `0${date7.getMonth()+1}` : `${date7.getMonth()+1}`;
          let newday = Number((date7.getDate()+7)) < 10 ? `0${(date7.getDate()+7)}` : `${(date7.getDate()+7)}`;
          let newyear = date7.getFullYear();
          console.log(newday);
          
          GetStatusCountMiddleware().then(({apiSuccess, response}) => {
            if (apiSuccess && response.data.result) {
              setCounts(response.data.result);
              setTotalCounts(response.data.result.completed + response.data.result.awaiting + response.data.result.rejected);
            } else {
              showNotification({
                title: 'Error',
                message: 'Unexpected error occurred, please try reloading',
                color: 'red',
              })
            }
          }).catch(error => showNotification({
            title: 'Error',
            message: 'Unexpected error occurred, please try reloading',
            color: 'red',
          }))

          GetAgingReport({month, day, year, newmonth, newday, newyear}).then(({apiSuccess, response}) => { 
            console.log(response);
          }).catch((error => showNotification({ title: 'Error', message: 'Unexpected error occurred, please try reloading', color: 'red'})))
        
          return () => {
            // on unmount
          }
        }, [])
        

        // const statisticsData1 = [
        //   {
        //     label: 'Pending',
        //     stats: '1212',
        //     progress: 100-50,
        //     color: 'yellow'
        //   },
        //   {
        //     label: 'Completed',
        //     stats: '1122',
        //     progress: 100-70,
        //     color: 'green',
        //   },
        //   {
        //     label: 'Failed',
        //     stats: '2211',
        //     progress: 100-20,
        //     color: 'red',
        //   },
        // ];

  return (
    <div style={{display:"flex", flexDirection:'row'}}>
      <SidebarApayConnect data={data} name={'Booking.com'}/>
      <div style={{width: '100rem', marginLeft: '0.8rem', marginTop: '2rem'}}>
        <StatsRing data={[
          {
            label: 'Completed',
            stats: counts.completed,
            progress: (counts.completed * 100) / totalCounts,
            color: 'green'
          },
          {
            label: 'Pending',
            stats: counts.awaiting,
            progress: (counts.awaiting * 100 / totalCounts),
            color: 'yellow'
          },
          {
            label: 'Rejected',
            stats: counts.rejected,
            progress: (counts.rejected * 100) / totalCounts,
            color: 'red',
          }
        ]} />
        <div>
          <Table>
            {/* <thead>
              <tr>
                <th>
                  
                </th>
              </tr>
            </thead> */}
          </Table>
        </div>
      </div>
    </div>
  )
}

export default VendorDashboardHomePage;