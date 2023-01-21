import axios from "axios";

const contentTypeHeaders = {
  "Content-Type": "application/json",
};

export const APAYAxios = ({ method, url, queryParam, requestBody }) => {
  return axios.request({
    method: method,
    url: url,
    params: queryParam,
    data: requestBody,
    headers: {
      ...contentTypeHeaders,
    },
  });
};
