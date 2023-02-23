import {useState} from 'react';
import {IoLanguage} from 'react-icons/io5';
import {IconType} from 'react-icons/lib';
import {useTranslation} from "react-i18next";

type Language = 'en' | 'it';

const languageNames: Record<Language, string> = {
    en: 'English',
    it: 'Italiano',
};

const languageIcons: Record<Language, string> = {
    en: 'https://hatscripts.github.io/circle-flags/flags/us.svg',
    it: 'https://hatscripts.github.io/circle-flags/flags/it.svg',
};

function LanguageSwitcher() {
    const [language, setLanguage] = useState<Language>('en');

    const handleLanguageChange = (newLanguage: Language) => {
        i18n.changeLanguage(newLanguage);
        setLanguage(newLanguage);
    };

    const {i18n} = useTranslation();
    
    return (
        <div className="flex flex-column items-center">
            {Object.keys(languageNames).map((lang) => {
                const languageCode = lang as Language;
                return (
                    <div>
                        <button
                            key={languageCode}
                            className={`mr-2 ${
                                languageCode === language ? 'text-blue-500' : ''
                            }`}
                            onClick={() => handleLanguageChange(languageCode)}
                        >
                            <div className="flex items-center">
                                <img
                                    src={languageIcons[languageCode]}
                                    alt={`${languageNames[languageCode]} flag`}
                                    className="w-4 h-4 mr-1 rounded-full"
                                />
                                {languageNames[languageCode]}
                            </div>
                        </button>
                    </div>
                );
            })}
        </div>
    );
}

export default LanguageSwitcher;
