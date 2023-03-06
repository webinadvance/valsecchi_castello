import { useTranslation } from 'react-i18next'
import { useCookies } from 'react-cookie'

const languageNames: Record<string, string> = {
  en: 'English',
  it: 'Italiano'
}

const languageIcons: Record<string, string> = {
  en: 'https://hatscripts.github.io/circle-flags/flags/us.svg',
  it: 'https://hatscripts.github.io/circle-flags/flags/it.svg'
}

function LanguageSwitcher () {
	const [, setCookie] = useCookies(['preferredLanguage'])
	const handleLanguageChange = (newLanguage: string) => {
    setCookie('preferredLanguage', newLanguage, { path: '/' })
		i18n.changeLanguage(newLanguage)
	};

  const { i18n } = useTranslation()

	return (
		<div className="flex flex-col items-center">
			{Object.keys(languageNames).map((lang) => {
			  const languageCode = lang
			  return (
					<button
						key={languageCode}
						className={`mr-2 ${
							languageCode === i18n.language ? 'text-blue-500' : ''
						}`}
						onClick={() => { handleLanguageChange(languageCode) }}
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
			  )
			})}
		</div>
  );
}

export default LanguageSwitcher
