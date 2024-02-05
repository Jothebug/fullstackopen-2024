import { useState, useEffect } from "react";
import { Countries } from "./components";
import { getCountries } from "./services";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState([]);

  const onSearch = async (e) => {
    const text = e.target.value;
    if (text) {
      const searched = countries.filter((country = {}) => {
        const {
          name: { common },
        } = country;
        return common.toLowerCase().includes(text);
      });
      setSearch(searched);
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const res = await getCountries();
        setCountries(res.data);
      } catch (error) {
        console.log(error.message);
      }
    })();
  }, []);

  return (
    <div>
      <Countries countries={search} onSearch={onSearch} />
    </div>
  );
};

export default App;
