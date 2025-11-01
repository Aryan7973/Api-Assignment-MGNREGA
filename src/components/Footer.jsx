import React from "react";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="w-full bg-[#a15537] text-white py-8 mt-auto">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center sm:text-left">
        <div>
          <h2 className="text-xl font-semibold mb-2">{t("footer.about_title")}</h2>
          <p className="text-sm leading-relaxed">{t("footer.about_text")}</p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">{t("footer.quick_links")}</h2>
          <ul className="text-sm space-y-1">
            <li><a href="/" className="hover:underline">{t("home")}</a></li>
            <li><a href="/about" className="hover:underline">{t("about")}</a></li>
            <li><a href="/dashboard" className="hover:underline">{t("dashboard.title")}</a></li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">{t("footer.contact_title")}</h2>
          <p className="text-sm">{t("footer.contact_text")}</p>
          <p className="text-sm mt-1">{t("footer.email")}: info@mgnrega.gov.in</p>
        </div>
      </div>

      <div className="border-t border-white/30 mt-8 pt-4 text-center text-sm">
        {t("footer.copyright")}
      </div>
    </footer>
  );
};

export default Footer;
