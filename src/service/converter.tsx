import store from "../store/store";

export const getCountries = async () => {
  const apiKey = process.env.REACT_APP_API_KEY;
  if (apiKey === "" || apiKey === undefined) {
    console.error(
      "Api key is missing (specify it in the environment variables."
    );
    return null;
  }
  try {
    let res = await fetch(
      `https://free.currconv.com/api/v7/countries?apiKey=${apiKey}`
    );
    if (res.ok) {
      const jsonRes: any = await res.json();

      if (jsonRes) {
        const formatedRes = Object.values(jsonRes.results);
        return formatedRes;
      }
    }
    return null;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getCoef = async () => {
  const deviseOut = store.getState().countriesReducer.selectedCountryOut;
  const deviseIn = store.getState().countriesReducer.selectedCountryIn;
  // console.log(`IN: ${deviseIn}, OUT: ${deviseOut}`);

  try {
    let res = await fetch(
      `https://free.currconv.com/api/v7/convert?q=${deviseIn}_${deviseOut}&compact=ultra&apiKey=${process.env.REACT_APP_API_KEY}`
    );
    if (res.ok) {
      return res.json();
    }
    return null;
  } catch (error) {
    console.log(error);
    return null;
  }
};
