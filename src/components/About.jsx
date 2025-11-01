import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

const About = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div className=" bg-[#f5e9d9] flex flex-col items-center justify-center h-[70vh] px-6 py-6 text-center">
      <h1 className="text-3xl font-bold text-[#a15537] mb-6">
        {t('about_Section.title')}
      </h1>

      <p className="max-w-3xl text-lg text-gray-800 leading-relaxed mb-6">
        {t('about_Section.description1')}
      </p>

      <p className="max-w-3xl text-lg text-gray-800 leading-relaxed mb-6">
        {t('about_Section.description2')}
      </p>

      <p className="max-w-3xl text-lg text-gray-800 leading-relaxed">
        {t('about_Section.description3')}
      </p>

      <div className="mt-8">
        <p className="text-md text-gray-600">
          <strong>{t('about_Section.note_title')}</strong> {t('about_Section.note_text')}
        </p>
      </div>

    </div>
  );
};

export default About;
