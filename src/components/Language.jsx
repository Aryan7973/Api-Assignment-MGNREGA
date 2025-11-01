import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';


const languages = [
  { code: "en", name: "English" },
  { code: "bn", name: "Bengali (বাংলা)" },
  { code: "doi", name: "Dogri (डोगरी)" },
  { code: "hi", name: "Hindi (हिन्दी)" },
  { code: "ml", name: "Malayalam (മലയാളം)" },
  { code: "as", name: "Assamese (অসমীয়া)" },
  { code: "brx", name: "Bodo (बर' राव)" },
  { code: "gu", name: "Gujarati (ગુજરાતી)" },
  { code: "kn", name: "Kannada (ಕನ್ನಡ)" },
  { code: "mr", name: "Marathi (मराठी)" },
  { code: "or", name: "Odia (ଓଡ଼ିଆ)" },
  { code: "pa", name: "Punjabi (ਪੰਜਾਬੀ)" },
  { code: "ur", name: "Urdu (اردو)" },
  { code: "ta", name: "Tamil (தமிழ்)" },
  { code: "te", name: "Telugu (తెలుగు)" },
];

const Language = () => {  
   const {t,i18n} = useTranslation(); 
    const navigate = useNavigate();
    const changeLanguage = (lang) => {
        i18n.changeLanguage(lang).then(()=>{
            navigate("/location");
        });
    }


  return (
    <>
    <div className='h-min-screen w-full  bg-[#eedbc8] flex flex-col items-center p-[18vh]'>
      <div className='w-[80vw] mb-10 h-1/10 flex justify-center items-center text-2xl font-bold' >{t("select_language")}</div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-5 w-[85vw] max-w-4xl">
        {languages.map((lang) => (
          <button
            key={lang.code}
            onClick={() => changeLanguage(lang.code)}
            className={`bg-amber-50 border-2 rounded-xl py-3 px-2 text-center h-[10vh] border-[#a15537] font-semibold text-lg transition-all hover:text-white hover:bg-[#a15537]`}
          >
            {lang.name}
          </button>
        ))}
      </div>
    </div>
      
    </>
  )
}

export default Language
