import { useState } from "react";
import Weather from "./Weather";

const CountryInfo = ({ country }) => {
  return (
    <>
      <h1>{country.name.common}</h1>
      <p>Capital: {country.capital[0]}</p>
      <p>Population: {country.population}</p>
      <h2>Languages</h2>
      {Object.values(country.languages).map((language) => (
        <li key={language}>{language}</li>
      ))}
      <img src={country.flags.png} alt="flag" width="100px" />
      <Weather capital={country.capitalInfo} />
    </>
  );
};

const Country = ({ country, isShownInfo }) => {
  const [isShown, setIsShown] = useState(false);

  const handeShowInfo = () => {
    setIsShown((prev) => !prev);
  };

  return (
    <div>
      {isShownInfo ? (
        <CountryInfo country={country} />
      ) : (
        <dt>
          {country.name.common}{" "}
          <button onClick={handeShowInfo}>
            {isShown ? "Not show" : "Show"}
          </button>{" "}
          {isShown && <CountryInfo country={country} />}
        </dt>
      )}
    </div>
  );
};

const Countries = ({ onSearch, countries }) => {
  return (
    <div>
      <label>
        find countries: <input onChange={onSearch} />
      </label>

      {countries.length > 9 ? (
        <p>Too many matches, specify another filter</p>
      ) : (
        <dl>
          {countries.map((item, index) => (
            <Country
              key={index}
              country={item}
              isShownInfo={countries.length === 1 ? true : false}
            />
          ))}
        </dl>
      )}
    </div>
  );
};

export default Countries;
