import React, { useEffect, useState } from "react";
import Sidebar from "../components/sidebar";
import { IconHome, IconReceipt2 } from "@tabler/icons";
import { APAYConnectURL } from "../router/client_router";
import {
  createStyles,
  Table,
  ScrollArea,
  Title,
  Anchor,
  Modal,
  Paper,
  Text,
  Group,
  RingProgress,
  SimpleGrid,
  Space,
  Button,
} from "@mantine/core";
import "./apayConnectHome-page.css";
import { GetPaymentsDetails } from "./apayConnectMiddleware";
import { showNotification } from "@mantine/notifications";
import { DatePicker, DateRangePicker } from "@mantine/dates";
function ApayConnectHomePage() {
  const [scrolled, setScrolled] = useState(false);
  const [listData, setListData] = useState([]);
  const [openPopup, setOpenPopup] = useState(false);
  const [bgColour, setBgColour] = useState("#fafafa");
  const [index, setIndex] = useState();
  const [dateValue, setDateValue] = useState([
    new Date(2023, 0, 10),
    new Date(2023, 0, 15),
  ]);
  console.log(dateValue);
  const statisticsData1 = [
    {
      label: "Pending",
      stats: "1212",
      progress: 100 - 50,
      color: "yellow",
    },
    {
      label: "Completed", 
      stats: "1122",
      progress: 100 - 70,
      color: "green",
    },
    {
      label: "Failed",
      stats: "2211",
      progress: 100 - 20,
      color: "red",
    },
  ];
  useEffect(() => {
    // GetPaymentsDetails({
    //   fromDate: [
    //     dateValue[0].getFullYear(),
    //     dateValue[0].getMonth() + 1,
    //     dateValue[0].getDate(),
    //   ].join("/"),
    //   toDate: [
    //     dateValue[1].getFullYear(),
    //     dateValue[1].getMonth() + 1,
    //     dateValue[1].getDate(),
    //   ].join("/"),
    // })
    //   .then(({ apiSuccess, response }) => {
    //     if (apiSuccess && response.data.result) {
    //       console.log("response", response);
    //     } else {
    //       showNotification({
    //         title: "Error",
    //         message: "Unexpected error occurred, please try reloading",
    //         color: "red",
    //       });
    //     }
    //   })
    //   .catch((error) =>
    //     showNotification({
    //       title: "Error",
    //       message: "Unexpected error occurred, please try reloading",
    //       color: "red",
    //     })
    //   );
    // setListData([
    //   {
    //     name: "Am Shaikh",
    //     merchantName: "booking.com",
    //     benificiaryName: "Hotel Oberoy",
    //     totalAmount: 100000,
    //     country: "IN",
    //     property: "fwefewf",
    //     benificiaryAddress:
    //       "JW Marriot, Juhu Tara Road, Juhu, andheri West, Mumbai",
    //     arrivalDate: "2023-01-20 15:00:00",
    //     departureDate: "2023-01-21 15:00:00",
    //     paymentMethod: "VISA",
    //     cardNumber: "1234567890",
    //     fareValue: 0,
    //     gstValue: 0,
    //     commissionValue: 0,
    //     paymentMode: "paylater",
    //     bookingNumber: "1234",
    //     status: "pending",
    //   },
    //   {
    //     name: "Am Shaikhwdsa",
    //     merchantName: "booking.com",
    //     benificiaryName: "Hotel Oberoy",
    //     totalAmount: 100000,
    //     country: "IN",
    //     property: "fwefwefewefdfdsscc",
    //     benificiaryAddress:
    //       "JW Marriot, Juhu Tara Road, Juhu, andheri West, Mumbai",
    //     arrivalDate: "2023-01-20 15:00:00",
    //     departureDate: "2023-01-21 15:00:00",
    //     paymentMethod: "VISA",
    //     cardNumber: "1234567890",
    //     fareValue: 0,
    //     gstValue: 0,
    //     commissionValue: 0,
    //     paymentMode: "paylater",
    //     bookingNumber: "1234",
    //     status: "pending",
    //   },
    // ]);
  }, []);
  const data = [
    { link: APAYConnectURL.home, label: "Home", icon: IconHome },
    { link: APAYConnectURL.billing, label: "Billing", icon: IconReceipt2 },
  ];
  const useStyles = createStyles((theme) => ({
    header: {
      position: "sticky",
      top: 0,
      backgroundColor:
        theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
      transition: "box-shadow 150ms ease",

      "&::after": {
        content: '""',
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 0,
        borderBottom: `1px solid ${
          theme.colorScheme === "dark"
            ? theme.colors.dark[3]
            : theme.colors.gray[2]
        }`,
      },
    },

    scrolled: {
      boxShadow: theme.shadows.sm,
    },
  }));
  const { classes, cx } = useStyles();
  const rows = listData.map((row, index) => (
    <tr
      key={row.name}
      onClick={() => {
        setOpenPopup(true);
        setIndex(index);        
      }}
      className="tab"
    >
      <td>{row.name}</td>
      <td>{row.merchantName}</td>
      <td>{row.bookingNumber}</td>
      <td>{row.totalAmount}</td>
      <td>{new Date(row.arrivalDate).toDateString()}</td>
      <td>{new Date(row.departureDate).toDateString()}</td>
      <td>{row.paymentMethod}</td>
      <td>{row.paymentMode}</td>
      <td>{row.status}</td>
    </tr>
  ));
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
      <SimpleGrid cols={3} breakpoints={[{ maxWidth: "sm", cols: 1 }]}>
        {stats}
      </SimpleGrid>
    );
  }

  function Popup(props) {

    return (
      <Modal
        opened={props.openPopup}
        onClose={() => props.setOpenPopup(false)}
        size="lg"
      >
        <div>
          <Table sx={{ minWidth: "100%" }}>
            <thead
              className={cx(classes.header, { [classes.scrolled]: scrolled })}
            >
              <tr>
                <th>Name</th>
                <th>Country</th>
                <th>Property</th>
                <th>Benificiary Address</th>
              </tr>
            </thead>
            <tbody>
              <tr key={props?.listData[props?.index]?.name}>
                <td>{props?.listData[props?.index]?.name}</td>
                <td>{props?.listData[props?.index]?.country}</td>
                <td>{props?.listData[props?.index]?.property}</td>
                <td>{props?.listData[props?.index]?.benificiaryAddress}</td>
              </tr>
            </tbody>
          </Table>
        </div>
      </Modal>
    );

  
  }
  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <div style={{ width: "20%" }}>
        <Sidebar data={data} name={"APAY2 CONCILE"} />
      </div>
      <div style={{ width: "80%", margin: "50px 50px" }}>
        {/* <div
          style={{ width: "70rem", marginLeft: "1.2rem", marginTop: "2rem" }}
        >
          <StatsRing data={statisticsData1} />
        </div> */}
        <div style={{ margin: "20px 0px" }}>
          <Title order={1} align="center">
            User Booking List
          </Title>
          <Space h={20} />
          <DateRangePicker
      label="Book hotel"
      placeholder="Pick dates range"
      value={dateValue}
      onChange={setDateValue}
    />
    <Button onClick={() => {
          GetPaymentsDetails({
            fromDate: [
              dateValue[0].getFullYear(),
              Number(dateValue[0].getMonth()) < 10 ? `0${dateValue[0].getMonth()+1}` : `${dateValue[0].getMonth()}`,
              Number(dateValue[0].getDate()) < 10 ? `0${dateValue[0].getDate()}` : `${dateValue[0].getDate()}`,
            ].join("/"),
            toDate: [
              dateValue[1].getFullYear(),
              Number(dateValue[1].getMonth()) < 10 ? `0${dateValue[1].getMonth()+1}` : `${dateValue[1].getMonth()}`,
              Number(dateValue[1].getDate()) < 10 ? `0${dateValue[1].getDate()}` : `${dateValue[1].getDate()}`,
            ].join("/"),
          })
            .then(({ apiSuccess, response }) => {
              if (apiSuccess && response.data.result) {
                console.log("response", response);
              } else {
                showNotification({
                  title: "Error",
                  message: "Unexpected error occurred, please try reloading",
                  color: "red",
                });
              }
            })
            .catch((error) =>
              showNotification({
                title: "Error",
                message: "Unexpected error occurred, please try reloading",
                color: "red",
              })
            );
          setListData([
            {
              name: "Am Shaikh",
              merchantName: "booking.com",
              benificiaryName: "Hotel Oberoy",
              totalAmount: 100000,
              country: "IN",
              property: "fwefewf",
              benificiaryAddress:
                "JW Marriot, Juhu Tara Road, Juhu, andheri West, Mumbai",
              arrivalDate: "2023-01-20 15:00:00",
              departureDate: "2023-01-21 15:00:00",
              paymentMethod: "VISA",
              cardNumber: "1234567890",
              fareValue: 0,
              gstValue: 0,
              commissionValue: 0,
              paymentMode: "paylater",
              bookingNumber: "1234",
              status: "pending",
            },
            {
              name: "Am Shaikhwdsa",
              merchantName: "booking.com",
              benificiaryName: "Hotel Oberoy",
              totalAmount: 100000,
              country: "IN",
              property: "fwefwefewefdfdsscc",
              benificiaryAddress:
                "JW Marriot, Juhu Tara Road, Juhu, andheri West, Mumbai",
              arrivalDate: "2023-01-20 15:00:00",
              departureDate: "2023-01-21 15:00:00",
              paymentMethod: "VISA",
              cardNumber: "1234567890",
              fareValue: 0,
              gstValue: 0,
              commissionValue: 0,
              paymentMode: "paylater",
              bookingNumber: "1234",
              status: "pending",
            },
          ]);
    }}>Get Details</Button>
          <Space h={20} />
        </div>
        <ScrollArea
          sx={{ height: "100%" }}
          onScrollPositionChange={({ y }) => setScrolled(y !== 0)}
        >
          <Popup
            openPopup={openPopup}
            setOpenPopup={setOpenPopup}
            index={index}
            listData={listData}
          />
          <Table sx={{ minWidth: "100%" }}>
            <thead
              className={cx(classes.header, { [classes.scrolled]: scrolled })}
            >
              <tr>
                <th>Name</th>
                <th>Merchant Name</th>
                <th>Booking Number</th>
                <th>Total Amount</th>
                <th>Arrival Date</th>
                <th>Departure Date</th>
                <th>Payment Method</th>
                <th>Payment Mode</th>
                <th>Status</th>
              </tr>
            </thead>
            {listData && listData.length ? (
              <tbody>{rows}</tbody>
            ) : (
              <tbody>
              <tr style={{ textAlign: "center" }}>
                <td>No Record Found</td>
              </tr>
              </tbody>
            )}
          </Table>
        </ScrollArea>
      </div>
    </div>
  );
}

export default ApayConnectHomePage;
