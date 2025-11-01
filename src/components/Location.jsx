import React, { useEffect, useSyncExternalStore } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

const Location = () => {
    const {t} = useTranslation();
    const navigate = useNavigate();
    const [district,setDistrict] = useState('');
    const [detectedDistrict, setDetectedDistrict] = useState('');
    const [loading, setLoading] = useState(false);
    const [found,setFound] = useState(false);

    const districts = [
        "Agra", "Aligarh", "Ambedkar Nagar", "Amethi", "Amroha", "Auraiya",
        "Ayodhya", "Azamgarh", "Badaun", "Bahraich", "Ballia", "Banda",
        "Barabanki", "Bareilly", "Basti", "Bijnor", "Bulandshahr", "Chandauli",
        "Chitrakoot", "Deoria", "Etah", "Etawah", "Farrukhabad", "Fatehpur",
        "Firozabad", "Gautam Buddha Nagar", "Ghaziabad", "Ghazipur", "Gonda",
        "Gorakhpur", "Hamirpur", "Hapur", "Hardoi", "Hathras", "Jalaun",
        "Jaunpur", "Jhansi", "Kannauj", "Kanpur Dehat", "Kanpur Nagar",
        "Kasganj", "Kaushambi", "Kushinagar", "Lakhimpur Kheri", "Lalitpur",
        "Lucknow", "Maharajganj", "Mahoba", "Mainpuri", "Mathura", "Meerut",
        "Mirzapur", "Moradabad", "Muzaffarnagar", "Pilibhit", "Pratapgarh",
        "Prayagraj", "Raebareli", "Rampur", "Saharanpur", "Sambhal",
        "Sant Kabir Nagar", "Shahjahanpur", "Shamli", "Shravasti", "Siddharthnagar",
        "Sitapur", "Sonbhadra", "Sultanpur", "Unnao", "Varanasi"
    ];

    useEffect(() => {
        const detectDistrict = async () => {
            if(!navigator.geolocation){
                alert(t("geolocation_not_supported"));
                return;
            }
        

        setLoading(true);
        navigator.geolocation.getCurrentPosition(
            async(position) =>{
                try{
                    const {latitude, longitude} = position.coords;
                    const response = await axios.get(
                        `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
                    );
                    const address = response.data.address;
                    
                    const districtName = address.district || address.state_district;
                    
                    const stateName = address.state;
                    setDetectedDistrict(districtName);
                    
                    if(stateName?.toLowerCase().includes("uttar pradesh")){
                        const match = districts.find((d) => d.toLowerCase() === districtName?.toLowerCase().trim());

                        if(match){
                            setDistrict(match);
                            setFound(true);
                            localStorage.setItem('selectedDistrict', match);
                        }
                    }else{
                        alert(t("district_not_supported",{district:districtName || "Your area"}) );
                    }
                    
                } catch(error){
                    console.error("error detecting district",error);
                }finally{
                    setLoading(false);
                }

            },(error) =>{
                console.error("accessed denied",error);
                setLoading(false);
            }
        );
    };
        detectDistrict();
    },[t]);

    const handleNext = () => {
        if(!district) return alert(t("select_district"));
        localStorage.setItem('selectedDistrict', district);
        navigate('/dashboard');
    }
    
    return (
    <div className="flex flex-col items-center justify-center h-[90vh] bg-[#f5e9d9]">
      <h1 className="text-2xl font-bold mb-6">{t("select_district")}</h1>
      <p className="border-2 rounded-md p-3 m-2 w-[80vw] sm:w-[50vw] text-lg">
        {t("state_for_assignment")}
      </p>

      {loading && <p className="text-gray-600 mb-2">{t("detecting_location")}...</p>}
           

      
      {!found ? (
        <select
          className="border-2 rounded-md p-3 w-[80vw] sm:w-[50vw] text-lg"
          value={district}
          onChange={(e) => setDistrict(e.target.value)}
        >
          <option value="">{t("choose_district")}</option>
          {districts.map((d) => (
            <option key={d} value={d}>
              {t(`districts.${d}`, { defaultValue: d })}
            </option>
          ))}
        </select>
      ) : (
        <div className="border-2 rounded-md p-3 w-[80vw] sm:w-[50vw] text-lg text-center bg-white">
          {t(`districts.${district}`, { defaultValue: district })}
        </div>
      )}

      <button
        className="mt-6 px-6 py-3 bg-[#a15537] text-white rounded-lg text-lg hover:bg-[#873c27]"
        onClick={handleNext}
      >
        {t("next")}
      </button>
    </div>
  )
}

export default Location
