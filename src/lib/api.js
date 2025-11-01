import axios from "axios";

const BASE_URL =
  "https://api.data.gov.in/resource/ee03643a-ee4c-48c2-ac30-9f2ff26ab722";
const DEFAULT_API_KEY =
  "579b464db66ec23bdd000001341666828f20494d61dc7a62125b1941";

export const fetchDistrictData = async ({
  state,
  fin_year,
  districtName,
  pageSize = 500,
  maxPages = 5,
} = {}) => {
  try {
    const apiKey = DEFAULT_API_KEY;
    let allRecords = [];
    let offset = 0;

    for (let page = 0; page < maxPages; page++) {
      const params = {
        "api-key": apiKey,
        format: "json",
        limit: pageSize,
        offset,
        "filters[state_name]":"UTTAR PRADESH",
      };

      if(fin_year){
        params["fin_year]"] = fin_year;
      }
      
      

      const response = await axios.get(BASE_URL, { params });
      const records = response?.data?.records ?? [];

      allRecords = allRecords.concat(records);
      // console.log(allRecords,"hello these are the records")
      if (records.length < pageSize) break; // no more pages
      offset += pageSize;
    }

    const filtered = allRecords.filter(
        (r)=>
            r.state_name== "UTTAR PRADESH" &&
            (!districtName || (r.district_name === districtName && r.fin_year === fin_year))
    );

    return filtered;
  } catch (error) {
    console.error("API fetch failed:", error);
    throw new Error("Unable to fetch data for this district.");
  }
};
