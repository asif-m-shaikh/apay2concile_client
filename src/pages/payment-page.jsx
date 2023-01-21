import React, { useEffect } from "react";
import { useForm } from "@mantine/form";
import { Select, Space, TextInput, Divider, Text } from "@mantine/core";
import { Button, Radio } from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { Title } from "@mantine/core";
import { AddPaymentDetails } from "./apayConnectMiddleware";
import { showNotification } from "@mantine/notifications";
function PaymentPage() {
  const paymentForm = useForm({
    initialValues: {
      name: "",
      merchantName: "",
      benificiaryName: "",
      totalAmount: 0,
      country: "IN",
      property: "",
      benificiaryAddress:
        "JW Marriot, Juhu Tara Road, Juhu, andheri West, Mumbai",
      arrivalDate: new Date(),
      departureDate: new Date(),
      paymentMethod: "VISA",
      cardNumber: "1234567890",
      fareValue: 0,
      gstValue: 0,
      commissionValue: 0,
    },
  });
  useEffect(() => {
    // const storedValue = window.localStorage.getItem("user-form");
    // if (storedValue) {
    //   try {
    //     form.setValues(JSON.parse(window.localStorage.getItem("user-form")));
    //   } catch (e) {
    //     console.log("Failed to parse stored value");
    //   }
    // }
  }, []);
  useEffect(() => {
    // window.localStorage.setItem("user-form", JSON.stringify(form.values));
  }, []);
  function  addPayment  (val) {
    console.log("fwefwf", val);
    AddPaymentDetails(val)
      .then(({ apiSuccess, response }) => {
        console.log("Response", response.data);
        if (apiSuccess && response.data.message) {
          showNotification({
            title: 'Success',
            message: 'Record added',
            color: 'cyan',
          })
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
  };

  return (
    <div style={{ maxWidth: 320, margin: "auto" }}>
      <Title order={1} align="center">
        APAY2 CONCILE
      </Title>
      <Space h={30} />
      <Title order={5} align="center">
        Payment Process
      </Title>
      {/* <Text>Payment Process</Text> */}
      <form
        onSubmit={paymentForm.onSubmit((values) => {
          values.property = values.benificiaryName;
          values.fareValue = values.totalAmount * 0.85;
          values.gstValue = values.totalAmount * 0.05;
          values.commissionValue = values.totalAmount * 0.1;
          values.arrivalDate = [
            values.ArrivalDateFrom.getFullYear(),
            values.ArrivalDateFrom.getMonth() + 1,
            values.ArrivalDateFrom.getDate(),
          ].join("/");
          values.departureDate = [
            values.DepartureDateTo.getFullYear(),
            values.DepartureDateTo.getMonth() + 1,
            values.DepartureDateTo.getDate(),
          ].join("/");
          
          console.log(values);
          addPayment({...values,bookingNumber:1232});
        })}
      >
        <TextInput
          mt="md"
          label="Name"
          placeholder="John Doe"
          {...paymentForm.getInputProps("name")}
        />
        <TextInput
          mt="md"
          label="Merchant Name"
          placeholder="Booking.com"
          {...paymentForm.getInputProps("merchantName")}
        />
        {/* <TextInput
          mt="md"
          label="Benificiary Name"
          placeholder="JW Marriot"
          {...paymentForm.getInputProps("BenificiaryName")}
        /> */}
        <Select
          mt="md"
          label="Benificiary Name"
          placeholder="Hotel Oberoy"
          data={[
            { value: "hotel oberoy", label: "Hotel Oberoy" },
            { value: "hotel taj", label: "Hotel Taj" },
          ]}
          {...paymentForm.getInputProps("benificiaryName")}
        />
        <TextInput
          mt="md"
          label="Total amount"
          placeholder="10,000"
          {...paymentForm.getInputProps("totalAmount")}
        />
        {/* <TextInput
          mt="md"
          label="Booking ID"
          placeholder="12345"
          {...paymentForm.getInputProps("Booking ID")}
        /> */}
        <Select
          mt="md"
          label="Country"
          placeholder="India"
          data={[
            { value: "india", label: "INDIA" },
            { value: "australia", label: "AUSTRALIA" },
            { value: "us", label: "US" },
          ]}
          {...paymentForm.getInputProps("country")}
        />
        <TextInput
          mt="md"
          label="Hotel Address"
          placeholder="Hotel Address"
          // value="JW Marriot, Juhu Tara Road, Juhu, andheri West, Mumbai"
          {...paymentForm.getInputProps("benificiaryAddress")}
        />
        <DatePicker
          mt="md"
          placeholder="Pick arrival date"
          label="Arrival date"
          withAsterisk
          {...paymentForm.getInputProps("ArrivalDateFrom")}
        />
        <DatePicker
          mt="md"
          placeholder="Pick departure date"
          label="Departure date"
          withAsterisk
          {...paymentForm.getInputProps("DepartureDateTo")}
        />

        <Space h={30} />
        <Divider my="lg" label="Payment Details" labelPosition="center" />
        <TextInput
          mt="md"
          label="Payment Method"
          placeholder="VISA"
          value="VISA"
          {...paymentForm.getInputProps("PaymentMethod")}
        />
        <TextInput
          mt="md"
          label="Card Number"
          placeholder="1234567890"
          value="1234567890"
          {...paymentForm.getInputProps("cardNumber")}
        />
        <Space h={30} />
        <Radio.Group
          name="paymentMode"
          label="Select your payment mode"
          {...paymentForm.getInputProps("paymentMode")}
          withAsterisk
        >
          <Radio value="paynow" label="Pay Now" />
          <Radio value="paylater" label="Pay Later" />
        </Radio.Group>
        <Space h={30} />
        <div style={{ display: "flex", justifyContent: "space-around" }}>
          <Button
            variant="gradient"
            gradient={{ from: "#ed6ea0", to: "#ec8c69", deg: 35 }}
            type="submit"
          >
            Pay
          </Button>
        </div>
        <Space h={30} />
      </form>
    </div>
  );
}

export default PaymentPage;
