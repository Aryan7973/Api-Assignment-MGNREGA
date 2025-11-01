import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { fetchDistrictData } from "../lib/api";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [district, setDistrict] = useState(localStorage.getItem("selectedDistrict") || "");
  const [finYear, setFinYear] = useState(localStorage.getItem("selectedFinYear") || "2024-2025");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const stateName = localStorage.getItem("selectedState") || "Uttar Pradesh";
  const finYears = ["2023-2024", "2024-2025", "2025-2026"];

  useEffect(() => {
    const getData = async () => {
      if (!district) {
        alert(t("no_district_selected"));
        navigate("/location");
        return;
      }

      setLoading(true);
      setError("");

      // Try cached first
      const cacheKey = `data_${district}_${finYear}`;
      const cached = localStorage.getItem(cacheKey);

      if (cached) {

        setData(JSON.parse(cached));
        setLoading(false);
        return;

      }

      try {
        let freshData = await fetchDistrictData({
          state : stateName,
          fin_year: finYear,
        });

        if (freshData.length === 0) {
          throw new Error("Empty data");
        }

        freshData = freshData.slice(0,100);
        setData(freshData);
        localStorage.setItem(cacheKey, JSON.stringify(freshData));

      } catch (err) {
        console.error(err);
        if (!cached) setError(t("data_fetch_error"));
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, [district, t, navigate, finYear]);

  const handleYearChange = (e) => {
    const newYear = e.target.value;
    setFinYear(newYear);
    localStorage.setItem("selectedFinYear", newYear);
  };

  const handleHardReferesh = () => {
    window.location.href = window.location.href;
  }

  if (loading)
    return <p className="text-center mt-10">{t("loading")}...</p>;

  if (error)
    return <p className="text-center text-red-600 mt-10">{error}</p>;

  if (!data)
    return <p className="text-center mt-10">{t("no_data_available")}</p>;

  // aggregate: use the most recent record (latest month)
  const latest = data[data.length - 1] || {};

  const chartData = [
    { name: t("Households"), value: +latest.Total_Households_Worked || 0 },
    { name: t("Individuals"), value: +latest.Total_Individuals_Worked || 0 },
    { name: t("Completed Works"), value: +latest.Number_of_Completed_Works || 0 },
    { name: t("Ongoing Works"), value: +latest.Number_of_Ongoing_Works || 0 },
  ];

  return (
    <div className="bg-[#f5e9d9] p-6 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-semibold text-[#5a3924]">
          {t("dashboard_for")}{" "}
          {t(`districts.${district}`, { defaultValue: district })}
        </h1>

        {/* Year Selection */}
        <select
          value={finYear}
          onChange={handleYearChange}
          className="bg-white border border-[#a15537] rounded-md px-3 py-2 text-[#5a3924] font-medium"
        >
          {finYears.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        <div className="bg-white rounded-xl shadow p-5 text-center">
          <p className="text-gray-600">{t("total_expenditure")}</p>
          <h2 className="text-2xl font-bold text-[#a15537]">
            ₹{latest.Total_Exp || "—"}
          </h2>
        </div>

        <div className="bg-white rounded-xl shadow p-5 text-center">
          <p className="text-gray-600">{t("average_wage_rate")}</p>
          <h2 className="text-2xl font-bold text-[#a15537]">
            ₹{latest.Average_Wage_rate_per_day_per_person || "—"}
          </h2>
        </div>

        <div className="bg-white rounded-xl shadow p-5 text-center">
          <p className="text-gray-600">{t("persondays_generated")}</p>
          <h2 className="text-2xl font-bold text-[#a15537]">
            {latest.Persondays_of_Central_Liability_so_far || "—"}
          </h2>
        </div>
      </div>

      <div className="mt-10 h-72 bg-white rounded-2xl shadow p-5">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#a15537" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="flex justify-center mt-10">
        <button
          onClick={() => window.location.reload()}
          className="bg-[#a15537] text-white px-6 py-3 rounded-lg hover:bg-[#8b412b] transition"
        >
          {t("refresh_data")}
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
