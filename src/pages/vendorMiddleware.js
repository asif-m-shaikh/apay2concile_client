import { baseURL } from "../router/client_router";
import {
  GetPaymentDetailsCount,
  GetUserPayment,
  GetVendorHotelUsersList,
  GetVendorHotelsList,
  UserDetails,
  serverBaseURL,
} from "../router/server_router";
import { APAYAxios } from "../services/api-service";

async function GetStatusCountMiddleware() {
  try {
    let response = await APAYAxios({
      method: "get",
      url: `${serverBaseURL}${GetPaymentDetailsCount}`,
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

async function GetVendorHotelsListMiddleware(params) {
  try {
    let response = await APAYAxios({
      method: "get",
      url: `${serverBaseURL}${GetVendorHotelsList}`,
    });
    console.log(response);
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

async function GetHotelUsers({ partnerName }) {
  try {
    let response = await APAYAxios({
      method: "post",
      url: `${serverBaseURL}${GetVendorHotelUsersList}`,
      requestBody: {
        partnerName,
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

async function GetUserDetails({ userId }) {
  try {
    let response = await APAYAxios({
      method: "post",
      url: `${serverBaseURL}${UserDetails}`,
      requestBody: {
        userId,
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
async function GetAgingReport({month, day, year, newmonth, newday, newyear}) {
console.log('trigger');
    try {
        let response = await APAYAxios({
            method: 'post',
            url: `${serverBaseURL}${GetUserPayment}`,
            requestBody: {
                fromDate: `${year}/${month}/${day}`,
                toDate: `${newyear}/${newmonth}/${newday}`,
                isDeleted: 0
            },
        })
        console.log(response);
        return {
            apiSuccess: true,
            response
        }
    } catch (error) {
        console.log(error);
        throw {
            apiSuccess: false,
            error
        }
    }
}
export {
  GetStatusCountMiddleware,
  GetVendorHotelsListMiddleware,
  GetHotelUsers,
  GetUserDetails,
  GetAgingReport,
};
