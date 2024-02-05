import queryString from "query-string";

export function parse(str) {
  return queryString.parse(str);
}

export function stringify(obj) {
  return queryString.stringify(obj);
}

export const getQueryStringValue = (key, qs = window.location.search) => {
  const values = queryString.parse(qs);
  return values[key];
};

const setQueryStringWithoutPageReload = (qsValue) => {
  const newUrl = `${window.location.protocol}//${window.location.host}${window.location.pathname}${qsValue}`;

  window.history.pushState({ path: newUrl }, "", newUrl);
};

export const setQueryStringValue = (
  key,
  value,
  qs = window.location.search
) => {
  const values = queryString.parse(qs);
  const newQsValue = queryString.stringify({ ...values, [key]: value });
  setQueryStringWithoutPageReload(`?${newQsValue}`);
};
