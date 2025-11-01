import React from 'react'
import { useTranslation } from 'react-i18next'
import { Link, useNavigate } from 'react-router-dom'
import logo from '../assets/logo_MGNERGA.webp'
const Header = () => {

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
  const navigate = useNavigate();

  const handleLanguageChange = (e) => {
    const lang = e.target.value;
    i18n.changeLanguage(lang);
    localStorage.setItem('language', lang);
  }
  

  const handleHomeClick = (e) => {
    e.preventDefault();
    const lang = localStorage.getItem('language');
    const district = localStorage.getItem('selectedDistrict');
    // console.log(lang,district);
    if(!lang) navigate('/');
    else if(!district) navigate('/location');
    else navigate('/location');

  }


  const {t,i18n} = useTranslation();
  return (
    <div className='w-full  h-[10vh] flex justify-between items-center p-5 sticky top-0 bg-[#a15537]' >
      
        <div
        className="flex items-center gap-2 cursor-pointer"
        onClick={handleHomeClick}
      >
        <img src={logo} alt="MGNREGA Logo" className="h-15 w-30 rounded-full" />
      </div>
        <nav className="flex gap-6 text-lg">
        <Link
          onClick={handleHomeClick}
          className="hover:text-white underline text-xl transition-colors duration-200"
        >
          {t("home")}
        </Link>
        <Link
          to="/about"
          className="text-xl underline hover:text-white transition-colors duration-200"
        >
          {t("about")}
        </Link>
      </nav>
        <div className="flex items-center">
        <select
          onChange={handleLanguageChange}
          defaultValue={"Change Lanugage"}
          className="bg-[#a15537] border border-white rounded-md px-1 py-1 text-white focus:outline-none"
        >
          {languages.map((lang) => (
            <option key={lang.code} value={lang.code}>
              {lang.name}
            </option>
          ))}
        </select>
      </div>
    
    </div>
  )
}

export default Header;
