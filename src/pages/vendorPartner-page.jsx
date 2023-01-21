import React from 'react'
import Sidebar from '../components/sidebar';
import { IconBuilding, IconHome, IconReceipt2 } from '@tabler/icons';
import { VendorURL } from '../router/client_router';
import { LoadingOverlay, Modal, Space, Table, Text, Title } from '@mantine/core';
import { useState } from 'react';
import { useEffect } from 'react';
import { GetHotelUsers, GetUserDetails, GetVendorHotelsListMiddleware } from './vendorMiddleware';
import { showNotification } from '@mantine/notifications';

function VendorPartnerPage() {

  const [loading, setLoading] = useState(true);
  const [rows, setRows] = useState([{id: '-', partnerName: '-'}]);
  const [hotelUsersModal, setHotelUsersModal] = useState(false);
  const [hotelUsers, setHotelUsers] = useState([{name:'-', merchantName: '-', benificiaryName: '-', totalAmount: '-', arrivalDate: '-', departureDate: '-', paymentMethod: '-'}]);
  const [users, setUsers] = useState({});
  const [usersmodal, setUsersModal] = useState(false);
    const data = [
        { link: VendorURL.home, label: 'Home', icon: IconHome },
        { link: VendorURL.partner, label: 'Partner', icon: IconBuilding },
      ];

      useEffect(() => {
        // on mount
        setLoading(true);
        GetVendorHotelsListMiddleware().then(({apiSuccess, response}) => {
          if (apiSuccess && response.data.result.length > 0) {
            setRows(response.data.result);
            setLoading(false);
          } else {
            setLoading(false);
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
          })
        ).finally(() => setLoading(false))
      
        return () => {
          // on unmount
          setLoading(true);
        }
      }, []);
      
  return (
    <>
    <LoadingOverlay visible={loading} />
        <div style={{display: 'flex', flexDirection: 'row'}}>
        <Sidebar data={data} name={'Booking.com'} />
        <div>
          <Space h={20} />
          <Text weight={700}>List of affiliated Hotels</Text>
          <Space h={20} />
          <Table>
            <thead>
              <tr>
                <th>
                  ID
                </th>
                <th>
                  Hotel Name
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((value, index) => (
                <tr key={index} onClick={() => {
                  GetHotelUsers({partnerName: value.partnerName}).then(({apiSuccess, response}) => {
                    if (apiSuccess && response.data.result.length > 0) {
                      setHotelUsers(response.data.result);
                      setLoading(false);
                      setHotelUsersModal(true);
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
                  })).finally(() => setLoading(false))
                }}>
                  <td>{value.id}</td>
                  <td>{value.partnerName}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
        <Modal opened={hotelUsersModal} size='80%' onClose={() => setHotelUsersModal(false)}>
          <Table>
            <thead>
              <tr>
                <th>Payee Name</th>
                <th>Merchant Name</th>
                <th>Benificiary Name</th>
                <th>Total Amount</th>
                <th>Arrival Date</th>
                <th>Departure Date</th>
                <th>Payment Method</th>
              </tr>
            </thead>
            <tbody>
              {hotelUsers.map((value,index) => (
                <tr key={index} onClick={() => {
                  GetUserDetails({userId: value.id}).then(({apiSuccess, response}) => {
                    console.log(response);
                    if (apiSuccess && response.data.result.length > 0) {
                      setUsers(response.data.result[0]);
                      setUsersModal(true);
                      setHotelUsersModal(false);
                    } else {
                      showNotification({
                        title: 'Error',
                        message: 'Unexpected error occurred, please try reloading',
                        color: 'red',
                      })
                    }
                  }).catch(error => {
                    showNotification({
                      title: 'Error',
                      message: 'Unexpected error occurred, please try reloading',
                      color: 'red',
                    })
                  })
                }}>
                  <td>{value.name}</td>
                  <td>{value.merchantName}</td>
                  <td>{value.benificiaryName}</td>
                  <td>{value.totalAmount}</td>
                  <td>{value.arrivalDate}</td>
                  <td>{value.departureDate}</td>
                  <td>{value.paymentMethod}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Modal>
        <Modal opened={usersmodal} onClose={() => setUsersModal(false)}>
          <Text weight={700}>User Details</Text>
          <Space h={20} />
          <div style={{display: 'flex', flexDirection: 'row'}}><Text weight={700}>Name</Text><Space w={20} /><Text>{users.name}</Text></div>
          <div style={{display: 'flex', flexDirection: 'row'}}><Text weight={700}>Country</Text><Space w={20} /><Text>{users.country}</Text></div>
          <div style={{display: 'flex', flexDirection: 'row'}}><Text weight={700}>Hotel Name</Text><Space w={20} /><Text>{users.benificiaryName}</Text></div>
          <div style={{display: 'flex', flexDirection: 'row'}}><Text weight={700}>Arrival Date</Text><Space w={20} /><Text>{users.arrivalDate}</Text></div>
          <div style={{display: 'flex', flexDirection: 'row'}}><Text weight={700}>Departure Date</Text><Space w={20} /><Text>{users.departureDate}</Text></div>
          <div style={{display: 'flex', flexDirection: 'row'}}><Text weight={700}>Payment Date</Text><Space w={20} /><Text>{users.paymentDate}</Text></div>
          <div style={{display: 'flex', flexDirection: 'row'}}><Text weight={700}>Payment Mode</Text><Space w={20} /><Text>{users.paymentMode}</Text></div>
          <div style={{display: 'flex', flexDirection: 'row'}}><Text weight={700}>Payment Method</Text><Space w={20} /><Text>{users.paymentMethod}</Text></div>
          {/* <div style={{display: 'flex', flexDirection: 'row'}}><Text weight={700}>Card Number</Text><Space w={20} /><Text>{users.cardNumber}</Text></div> */}
          <div style={{display: 'flex', flexDirection: 'row'}}><Text weight={700}>Total Amount</Text><Space w={20} /><Text>{users.totalAmount}</Text></div>
          <div style={{display: 'flex', flexDirection: 'row'}}><Text weight={700}>GST</Text><Space w={20} /><Text>{users.gstValue}</Text></div>
          <div style={{display: 'flex', flexDirection: 'row'}}><Text weight={700}>Fare Amount</Text><Space w={20} /><Text>{users.fareValue}</Text></div>
          <div style={{display: 'flex', flexDirection: 'row'}}><Text weight={700}>Commission Amount</Text><Space w={20} /><Text>{users.commissionValue}</Text></div>
          <div style={{display: 'flex', flexDirection: 'row'}}><Text weight={700}>Status</Text><Space w={20} /><Text>{users.status}</Text></div>
        </Modal>
    </div>
    </>
  )
}

export default VendorPartnerPage;