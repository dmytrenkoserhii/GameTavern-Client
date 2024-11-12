// {
//   "description": {
//     "part1": "Edit <1>src/App.js</1> and save to reload.",
//     "part2": "Learn React"
//   },
//   "counter_one": "Changed language just once",
//   "counter_other": "Changed language already {{count}} times",
//   "footer": {
//     "date": "Today is {{date, DATE_HUGE}}",
//     "date_morning": "Good morning! Today is {{date, DATE_HUGE}} | Have a nice day!",
//     "date_afternoon": "Good afternoon! It's {{date, DATE_HUGE}}",
//     "date_evening": "Good evening! Today was the {{date, DATE_HUGE}}"
//   }
// }

// {
//   "description": {
//     "part1": "Змініть src/App.js та збережіть, щоб перезавантажити.",
//     "part2": "Вивчайте React"
//   },
//   "counter_one": "Мову змінено {{count}} раз",
//   "counter_few": "Мову змінено {{count}} рази",
//   "counter_many": "Мову змінено {{count}} разів",
//   "counter_other": "Мову змінено {{count}} разів",
//   "footer": {
//     "date": "Сьогодні {{date, DATE_HUGE}}",
//     "date_morning": "Доброго ранку! Сьогодні {{date, DATE_HUGE}} | Бажаю гарного дня!",
//     "date_afternoon": "Добрий день! Зараз {{date, DATE_HUGE}}",
//     "date_evening": "Добрий вечір! Сьогодні було {{date, DATE_HUGE}}"
//   }
// }

// const { t, i18n } = useTranslation();
// const [count, setCounter] = React.useState(0);

// const languages: { [index: string]: { nativeName: string } } = {
//   en: { nativeName: 'English' },
//   uk: { nativeName: 'Ukraine' },
// };

// <div>
//   {Object.keys(languages).map((lng) => (
//     <button
//       key={lng}
//       style={{ fontWeight: i18n.resolvedLanguage === lng ? 'bold' : 'normal' }}
//       type="submit"
//       onClick={() => {
//         i18n.changeLanguage(lng);
//         setCounter((c) => c + 1);
//       }}
//     >
//       {languages[lng].nativeName}
//     </button>
//   ))}
// </div>

//   <p>
//     <i>{t('counter', { count })}</i>
//   </p>

// <a
//   className="App-link"
//   href="https://reactjs.org"
//   target="_blank"
//   rel="noopener noreferrer"
// >
//   {t('description.part2')}
// </a>

// const getGreetingTime = (d = DateTime.now()) => {
//   const split_afternoon = 12; // 24hr time to split the afternoon
//   const split_evening = 17; // 24hr time to split the evening
//   const currentHour = parseFloat(d.toFormat('hh'));

//   if (currentHour >= split_afternoon && currentHour <= split_evening) {
//     return 'afternoon';
//   } else if (currentHour >= split_evening) {
//     return 'evening';
//   }
//   return 'morning';
// };

// <div>
//   <div>{t('footer.date', { date: new Date() })}</div>
// </div>
// <div>{t('footer.date', { date: new Date(), context: getGreetingTime() })}</div>
