// import { addLocaleData } from 'react-intl';
import EnLang from './entries/en-US';
import EsLang from './entries/es-ES';
// import enRtlLang from './entries/en-US-rtl';

// import {createIntl, createIntlCache, RawIntlProvider} from 'react-intl'

// // This is optional but highly recommended
// // since it prevents memory leak
// const cache = createIntlCache()

// const intl = createIntl({
//   locale: 'fr-FR',
//   messages: {}
// }, cache)

const AppLocale = {
  en: EnLang,
  es: EsLang,
  // enrtl: enRtlLang,
};
// addLocaleData(AppLocale.en.data);
// addLocaleData(AppLocale.es.data);
// addLocaleData(AppLocale.enrtl.data);

export default AppLocale;
