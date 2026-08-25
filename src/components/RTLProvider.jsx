// src/components/RTLProvider.jsx
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

export default function RTLProvider({ children }) {
  const { i18n } = useTranslation();

  useEffect(() => {
    // Update dir attribute based on current language
    const dir = i18n.language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.dir = dir;
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);

  return children;
}