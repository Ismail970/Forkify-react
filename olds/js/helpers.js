import { async } from "regenerator-runtime";
import { TIMEOUT_SEC } from "./config";

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

export const AJAX = async function (url, uploadData = undefined) {
  try {
    const fetchPro = uploadData ? fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(uploadData)
    }) : fetch(url);
    const res = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]);
    const data = await res.json();
    if (!res.ok) throw new Error(`${data.message} (${res.status})`);

    return data;
  } catch (err) {
    throw err;
  }
};

// to fractions
const gcd = (a, b) => (b) ? gcd(b, a % b) : a;

export const decimalToFraction = function (_decimal) {
  if (_decimal == parseInt(_decimal)) return parseInt(_decimal) + '/' + 1;
  else {
    const top = _decimal.toString().includes(".") ? _decimal.toString().replace(/\d+[.]/, '') : 0;
    const bottom = Math.pow(10, top.toString().replace('-', '').length);

    if (_decimal >= 1) top = +top + (Math.floor(_decimal) * bottom);
    else if (_decimal <= -1) top = +top + (Math.ceil(_decimal) * bottom);

    const x = Math.abs(gcd(top, bottom));
    return (top / x) + '/' + (bottom / x);
  }
};