import React, { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import InputField from "./Forms/InputField";
// commerce api link
import { commerce } from "../Lib/Commerce";
import Loading from "./Loading";

const AddressForm = ({ checkOutToken, next }) => {
  const [shippingCountries, setShippingCountries] = useState([]);
  const [shippingCountry, setShippingCountry] = useState("");
  const [subdivisions, setSubdivisions] = useState([]);
  const [subdivision, setSubdivision] = useState("");
  const [shippingOptions, setShippingOptions] = useState([]);
  const [shippingOption, setShippingOption] = useState("");
  const [loading, setLoading] = useState(false);

  // useform
  const methods = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      address: "",
      email: "",
      city: "",
      zip: "",
    },
  });

  // convert object of countries to array of object
  const countries = Object.entries(shippingCountries).map(([code, name]) => ({
    id: code,
    lable: name,
  }));
  // convert object of countries to array of object
  const subDivisions = Object.entries(subdivisions).map(([code, name]) => ({
    id: code,
    lable: name,
  }));

  const Options = shippingOptions.map(sO => ({
    id: sO.id,
    lable: `${sO.description} - (${sO.price.formatted_with_symbol})`,
  }));
  const fetchShippingCountries = async checkTokenId => {
    setLoading(true);
    const response = await commerce.services.localeListShippingCountries(
      checkTokenId
    );

    setShippingCountries(response.countries);
    setShippingCountry(Object.keys(response.countries)[0]);
  };

  const fetchSubDivisions = async countryCode => {
    const response = await commerce.services.localeListSubdivisions(
      countryCode
    );

    setSubdivisions(response.subdivisions);
    setSubdivision(Object.keys(response.subdivisions)[0]);
  };

  const fetchShippingOptions = async (
    checkOutToken,
    country,
    region = null
  ) => {
    const response = await commerce.checkout.getShippingOptions(checkOutToken, {
      country,
      region,
    });
    setShippingOptions(response);
    setShippingOption(response[0].id);
    setLoading(false);
  };
  // useEffect
  useEffect(() => {
    if (checkOutToken) {
      fetchShippingCountries(checkOutToken.id);
    }
  }, []);

  // useEffect
  useEffect(() => {
    if (shippingCountry) fetchSubDivisions(shippingCountry);
  }, [shippingCountry]);

  // useEffect
  useEffect(() => {
    if (subdivision)
      fetchShippingOptions(checkOutToken.id, shippingCountry, subdivision);
  }, [subdivision]);

  if (loading) return <div className="container-fluid my-5">loading...</div>;
  return (
    <div className="container-fluid mt-5" style={{ textAlign: "start" }}>
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(data =>
            next({
              ...data,
              shippingCountry,
              subdivision,
              shippingOption,
            })
          )}
        >
          <InputField
            name="firstName"
            label="firstName"
            text="First Name"
            placeholder="Enter your first  name"
          />
          <InputField
            name="lastName"
            label="lastName"
            text="Last Name"
            placeholder="Enter your last name"
          />
          <InputField
            name="email"
            label="email"
            text="Email"
            placeholder="Enter your email"
          />
          <InputField
            name="city"
            label="city"
            text="City"
            placeholder="Enter your city"
          />
          <InputField
            name="address"
            label="address"
            text="Address"
            placeholder="Enter your address"
          />
          <InputField
            name="zip"
            label="zip"
            text="Zip / Post Code"
            placeholder="Enter your zip code"
          />
          <label htmlFor="country" className="form-label">
            Country
          </label>
          <select
            className="form-select"
            aria-label="shipping country"
            value={shippingCountry}
            onChange={e => setShippingCountry(e.target.value)}
          >
            {countries.map(country => (
              <option value={country.id} key={country.id}>
                {country.lable}
              </option>
            ))}
          </select>
          <label htmlFor="region" className="form-label mt-3">
            Region
          </label>
          <select
            className="form-select "
            aria-label="shipping country"
            value={subdivision}
            onChange={e => setSubdivision(e.target.value)}
          >
            {subDivisions.map(subdivision => (
              <option value={subdivision.id} key={subdivision.id}>
                {subdivision.lable}
              </option>
            ))}
          </select>
          <label htmlFor="Shippingprice" className="form-label mt-3">
            Shipping Price
          </label>
          <select
            className="form-select"
            aria-label="shipping country"
            value={shippingOption}
            onChange={e => setShippingOption(e.target.value)}
          >
            {Options.map(option => (
              <option value={option.id} key={option.id}>
                {option.lable}
              </option>
            ))}
          </select>
          <div style={{ textAlign: "end" }}>
            <button type="submit" className="btn btn-primary my-3 px-3">
              next
            </button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default AddressForm;
