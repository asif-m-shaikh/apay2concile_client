import { baseURL } from "../router/client_router";
import {
  UserPayments,
  GetUserPayment,
  serverBaseURL,
} from "../router/server_router";
import { APAYAxios } from "../services/api-service";

async function GetPaymentsDetails({ fromDate, toDate }) {
  try {
    console.log("from", fromDate, toDate);
    let response = await APAYAxios({
      method: "post",
      url: `${serverBaseURL}${GetUserPayment}`,
      requestBody: {
        fromDate,
        toDate,
        isDeleted: 0
      },
    });
    return {
      apiSuccess: true,
      response,
    };
  } catch (error) {
    throw {
      apiSuccess: false,
      error,
    };
  }
}

async function AddPaymentDetails(val) {
  const {
    name,
    merchantName,
    benificiaryName,
    totalAmount,
    country,
    property,
    benificiaryAddress,
    arrivalDate,
    departureDate,
    paymentMethod,
    cardNumber,
    fareValue,
    gstValue,
    commissionValue,
    paymentMode,bookingNumber
  }=val
  try {
    let response = await APAYAxios({
      method: "post",
      url: `${serverBaseURL}${UserPayments}`,
      requestBody: {
        name,
        merchantName,
        benificiaryName,
        totalAmount,
        country,
        property,
        benificiaryAddress,
        arrivalDate,
        departureDate,
        paymentMethod,
        cardNumber,
        fareValue,
        gstValue,
        commissionValue,
        paymentMode,
        bookingNumber
      },
    });
    console.log('response', response);
    return {
      apiSuccess: true,
      response,
    };
  } catch (error) {
    console.log('error', error);
    throw {
      apiSuccess: false,
      error,
    };
  }
}
export { AddPaymentDetails, GetPaymentsDetails };
