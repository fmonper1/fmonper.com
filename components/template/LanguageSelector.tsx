import Image from 'next/image'
import { useTranslation } from 'react-i18next'

const LanguageSelector = ({}) => {
  const { i18n } = useTranslation('common')
  return (
    <div className="group">
      <div className="flex items-center p-2 cursor-pointer">
        {i18n.language === 'en' && (
          <Image src={`/images/en-flag.png?g=`} height={24} width={24} />
        )}
        {i18n.language === 'es' && (
          <Image src={`/images/es-flag.png?g=`} height={24} width={24} />
        )}
        {i18n.language === 'de' && (
          <Image src={`/images/de-flag.png?g=`} height={24} width={24} />
        )}
      </div>
      <div className="absolute hidden group-hover:block bg-primary-main rounded-b-md">
        <div className="p-2">
          <Image
            src="/images/en-flag.png"
            height={24}
            width={24}
            className="cursor-pointer"
            onClick={() => i18n.changeLanguage('en')}
          />
        </div>
        <div className="p-2">
          <Image
            src="/images/es-flag.png"
            height={24}
            width={24}
            className="cursor-pointer"
            onClick={() => i18n.changeLanguage('es')}
          />
        </div>
        <div className="p-2">
          <Image
            src="/images/de-flag.png"
            height={24}
            width={24}
            className="cursor-pointer"
            onClick={() => i18n.changeLanguage('de')}
          />
        </div>
      </div>
    </div>
  )
}

export default LanguageSelector
