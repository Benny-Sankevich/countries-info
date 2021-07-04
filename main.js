function getInformationFromRemoteServer(url) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url,
            success: json => resolve(json),
            error: err => reject(err)
        });
    })
}

async function getApi() {
    try {
        const apiJsonData = await getInformationFromRemoteServer("https://restcountries.eu/rest/v2/all/");
        displayApi(apiJsonData);
    }
    catch (error) {
        alert(error.message)
    }
}

function displayApi(currenciesData) {
    $("tbody").empty();
    let index = 1;
    for (const item of currenciesData) {

        let currenciesCode = getCurrenciesCode(item.currencies);

        $("#countryTable").append(`
            <tr>
            <th>${index}</th>
            <td>${item.name}</td>
            <td>${item.topLevelDomain[0]}</td>
            <td>${item.capital}</td>
            <td>${currenciesCode}</td>
           <td> <img src= ${item.flag} style="width:150px;height:100px;"></td>
            <td>${item.borders}</td>
        </tr>
        `);
        index++;
    }
}

function getCurrenciesCode(currenciesArray) {
    const allCurrencies = currenciesArray.map(currenciesArray => currenciesArray.code);
    let cleanCurrencies = allCurrencies.filter(function (item) { return item != "(none)"; });
    return cleanCurrencies;
}
async function getApiOfCurrentSearch(id) {
    try {
        const api = await getInformationFromRemoteServer("https://restcountries.eu/rest/v2/name/" + id);
        displayApi(api);
    }
    catch (error) {
        alert("There is no country with this name.");
        $("#countryTable").empty();
    }
}

$('#searchAll').on("click", function () { getApi() });

$('#searchButton').on("click", function () {
    let dataSearch = $("#searchBox").val();
    if (dataSearch == "") {
        alert("input country name");
        $("#searchBox").focus();
        $("#countryTable").empty();
    }
    else {
        getApiOfCurrentSearch(dataSearch);
        $("#searchBox").val('');
    }
})


