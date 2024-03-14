
        async function fetchCountryInfo() {
            const getCountryName = document.getElementById('getCountryName').value.trim();
            const apiUrl = `https://restcountries.com/v3.1/name/${getCountryName}`;

            if (!getCountryName) {
                alert("Please enter a country name.");
                return;
            }

            try {
                const response = await fetch(apiUrl);//NB if this does not work then try to code the promise and callback instead of await, its frustrating
                const data = await response.json();

                if (!response.ok) {
                    throw new Error(data.message || "Country not found");
                }

                if (response.ok) {
                    const countryData = data[0];
                    const countryInfo = `
                        <h1>Country: ${countryData.name.common}</h1>
                        <p>Capital: ${countryData.capital}</p>
                        <p>Population: ${countryData.population}</p>
                        <p>Region: ${countryData.region}</p>
                        ${countryData.coatOfArms ? `<img src="${countryData.coatOfArms.png}" alt="Coat of Arms of ${countryData.name.common}" width="100">` : ''}
                    `;

                    document.getElementById('countryInfo').innerHTML = countryInfo;


                    const borderingCountries = countryData.borders;
                    let borderingCountriesInfo = '<h2>Bordering Countries:</h2>';


                    for (let border of borderingCountries) {
                        const borderCountryResponse = await fetch(`https://restcountries.com/v3.1/alpha/${border}`);
                        const borderCountryData = await borderCountryResponse.json();
                        borderingCountriesInfo += `
                            <section >
                                <p class="borderName">${borderCountryData[0].name.common}</p>
                                <img src="${borderCountryData[0].coatOfArms.png}" alt="coats of arms of ${borderCountryData[0].name.common}" width="80">

                            </section>
                        `;
                    }
                    document.getElementById('borderingCountries').innerHTML = borderingCountriesInfo;
                } else {
                    document.getElementById('countryInfo').innerHTML = `<p>Error: ${data.message}</p>`;
                }
            } catch (error) {
                document.getElementById('countryInfo').innerHTML = `<p>Error: ${error.message}</p>`;
            }
        }
  