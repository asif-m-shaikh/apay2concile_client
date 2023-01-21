const serverBaseURL = "http://localhost:53124/";
// const serverBaseURL = "http://localhost:53124/";
const GetPaymentDetailsCount = "paymentDetails/getPaymentDetailsCount";
const GetVendorHotelsList = "partner/getPartnersRelatedToVendor";
const GetVendorHotelUsersList =
  "paymentDetails/getPaymentDetailsRelatedToPartner";
const UserDetails = "paymentDetails/getPaymentDetailsOfUser";
const UserPayments = "paymentDetails/insertPaymentDetails";
const GetUserPayment = "paymentDetails/getPaymentDetails";

export {
  serverBaseURL,
  GetPaymentDetailsCount,
  GetVendorHotelsList,
  GetVendorHotelUsersList,
  UserDetails,
  UserPayments,
  GetUserPayment,
};
