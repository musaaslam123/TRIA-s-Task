import { useState, useEffect } from "react";

function AddContactForm({ onAdd }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    countryCode: "+91",
    phone: "",
  });

  const [countries, setCountries] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState({
    name: "India",
    code: "+91",
    flag: "https://flagcdn.com/w320/in.png",
  });

  // Fetch countries for country code selector
  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all?fields=name,idd,flags")
      .then((res) => res.json())
      .then((data) => {
        const countryData = data
          .filter((c) => c.idd?.root)
          .map((c) => ({
            name: c.name.common,
            code: `${c.idd.root}${c.idd.suffixes ? c.idd.suffixes[0] : ""}`,
            flag: c.flags?.png,
          }))
          .sort((a, b) => a.name.localeCompare(b.name));
        setCountries(countryData);
      })
      .catch((err) => console.error("Error fetching countries:", err));
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest(".country-dropdown")) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "phone") {
      const numericValue = value.replace(/\D/g, "");
      setForm({ ...form, [name]: numericValue });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  // Handle submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.phone) {
      return alert("All fields are required");
    }
    const fullPhone = `${form.countryCode} ${form.phone}`;
    onAdd({ name: form.name, email: form.email, phone: fullPhone });
    setForm({ name: "", email: "", countryCode: "+91", phone: "" });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white dark:bg-white/10 border border-gray-300 dark:border-white/20
             rounded-xl shadow-md p-6 backdrop-blur-sm transition-colors duration-300"
    >
      <h3 className="font-semibold mb-3 text-gray-800 dark:text-gray-100 text-center md:text-left">
        Add New Contact
      </h3>

      <div className="grid gap-3">
        {/* Full Name */}
        <div className="flex items-center border border-gray-400 dark:border-gray-500 rounded-lg bg-white dark:bg-transparent focus-within:ring-2 focus-within:ring-blue-400 hover:border-blue-400 transition-colors duration-300">
          <span className="pl-3 pr-2 text-blue-400 text-lg">👤</span>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            className="flex-1 bg-transparent text-gray-800 dark:text-white p-2 rounded-r-lg focus:outline-none placeholder-gray-500 dark:placeholder-gray-400 transition-colors duration-300"
          />
        </div>

        {/* Email */}
        <div className="flex items-center border border-gray-400 dark:border-gray-500 rounded-lg bg-white dark:bg-transparent focus-within:ring-2 focus-within:ring-blue-400 hover:border-blue-400 transition-colors duration-300">
          <span className="pl-3 pr-2 text-blue-400 text-lg">✉︎</span>
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={form.email}
            onChange={handleChange}
            className="flex-1 bg-transparent text-gray-800 dark:text-white p-2 rounded-r-lg focus:outline-none placeholder-gray-500 dark:placeholder-gray-400 transition-colors duration-300"
          />
        </div>

        {/* Country Code + Phone */}
        <div className="flex gap-2 items-center w-full">
          {/* Country Code Dropdown */}
          <div className="relative w-24 sm:w-28 country-dropdown">
            <button
              type="button"
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center justify-between 
                         bg-white dark:bg-gray-800 
                         text-gray-800 dark:text-white 
                         border border-gray-300 dark:border-gray-600 
                         rounded-lg px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 
                         focus:ring-2 focus:ring-blue-400 focus:outline-none transition-colors w-full"
            >
              <div className="flex items-center gap-2">
                {selectedCountry.flag && (
                  <img
                    src={selectedCountry.flag}
                    alt={selectedCountry.name}
                    className="w-5 h-4 rounded-sm flex-shrink-0"
                  />
                )}
                <span className="tracking-wide">{selectedCountry.code}</span>
              </div>
              <span
                className={`text-gray-400 dark:text-gray-300 text-sm ml-2 transform transition-transform duration-300 ${
                  dropdownOpen ? "rotate-180" : ""
                }`}
              >
                ▼
              </span>
            </button>

            {/* Dropdown menu */}
            {dropdownOpen && (
              <ul className="absolute z-20 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg mt-1 max-h-60 overflow-y-auto w-full custom-scrollbar shadow-lg">
                {countries.map((country) => (
                  <li
                    key={country.name}
                    onClick={() => {
                      setSelectedCountry(country);
                      setForm({ ...form, countryCode: country.code });
                      setDropdownOpen(false);
                    }}
                    className="flex items-center gap-2 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer transition-colors"
                  >
                    <img
                      src={country.flag}
                      alt={country.name}
                      className="w-5 h-4 rounded-sm"
                    />
                    <span>{country.code}</span>
                    <span className="text-xs text-gray-600 dark:text-gray-400 truncate">
                      ({country.name})
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Phone Input */}
          <div className="flex items-center border border-gray-400 dark:border-gray-500 rounded-lg flex-1 bg-white dark:bg-transparent focus-within:ring-2 focus-within:ring-blue-400 hover:border-blue-400 transition-colors duration-300">
            <span className="pl-3 pr-2 text-blue-400 text-lg">📞</span>
            <input
              type="text"
              name="phone"
              placeholder="Phone Number"
              value={form.phone}
              onChange={handleChange}
              inputMode="numeric"
              className="flex-1 bg-transparent text-gray-800 dark:text-white p-2 rounded-r-lg focus:outline-none placeholder-gray-500 dark:placeholder-gray-400 transition-colors duration-300"
            />
          </div>
        </div>

        {/* Submit button */}
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition font-semibold"
        >
          Add Contact
        </button>
      </div>
    </form>
  );
}

export default AddContactForm;
