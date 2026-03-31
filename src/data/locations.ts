export interface School {
  id: string;
  name: string;
  subtitle: string;
}

export interface City {
  id: string;
  name: string;
  subtitle: string;
  schools: School[];
}

export interface Country {
  id: string;
  name: string;
  flag: string;
  cities: City[];
}

export const LOCATIONS: Country[] = [
  {
    id: 'us',
    name: 'США',
    flag: '🇺🇸',
    cities: [
      {
        id: 'us-ny', name: 'Нью-Йорк', subtitle: 'штат Нью-Йорк',
        schools: [
          { id: 'us-ny-1', name: 'Stuyvesant High School', subtitle: 'Манхэттен' },
          { id: 'us-ny-2', name: 'Bronx Science', subtitle: 'Бронкс' },
          { id: 'us-ny-3', name: 'Brooklyn Tech', subtitle: 'Бруклин' },
        ],
      },
      {
        id: 'us-la', name: 'Лос-Анджелес', subtitle: 'штат Калифорния',
        schools: [
          { id: 'us-la-1', name: 'Harvard-Westlake School', subtitle: 'Студио-Сити' },
          { id: 'us-la-2', name: 'Marlborough School', subtitle: 'Хэнкок-Парк' },
          { id: 'us-la-3', name: 'Crossroads School', subtitle: 'Санта-Моника' },
        ],
      },
      {
        id: 'us-chi', name: 'Чикаго', subtitle: 'штат Иллинойс',
        schools: [
          { id: 'us-chi-1', name: 'Jones College Prep', subtitle: 'Даунтаун' },
          { id: 'us-chi-2', name: 'Walter Payton College Prep', subtitle: 'Ривер Норт' },
        ],
      },
    ],
  },
  {
    id: 'kz',
    name: 'Казахстан',
    flag: '🇰🇿',
    cities: [
      {
        id: 'kz-ast', name: 'Астана', subtitle: 'столица',
        schools: [
          { id: 'kz-ast-1', name: 'НИШ Астана', subtitle: 'Назарбаев Интеллектуальная Школа' },
          { id: 'kz-ast-2', name: 'БИЛ Астана', subtitle: 'Bilim-Innovation Lyceum' },
          { id: 'kz-ast-3', name: 'Школа-лицей №65', subtitle: 'Сарыарка район' },
        ],
      },
      {
        id: 'kz-alm', name: 'Алматы', subtitle: 'Акмолинская область (регион)',
        schools: [
          { id: 'kz-alm-1', name: 'НИШ Алматы', subtitle: 'Назарбаев Интеллектуальная Школа' },
          { id: 'kz-alm-2', name: 'Лицей №165', subtitle: 'Бостандыкский район' },
          { id: 'kz-alm-3', name: 'Гимназия №12', subtitle: 'Алмалинский район' },
        ],
      },
    ],
  },
  {
    id: 'ru',
    name: 'Россия',
    flag: '🇷🇺',
    cities: [
      {
        id: 'ru-msk', name: 'Москва', subtitle: 'Московский регион',
        schools: [
          { id: 'ru-msk-1', name: 'Школа №179', subtitle: 'МИОО, Центральный АО' },
          { id: 'ru-msk-2', name: 'Лицей ВШЭ', subtitle: 'Высшая школа экономики' },
          { id: 'ru-msk-3', name: 'Школа №57', subtitle: 'Центральный АО' },
        ],
      },
      {
        id: 'ru-spb', name: 'Санкт-Петербург', subtitle: 'Северо-Западный федеральный округ',
        schools: [
          { id: 'ru-spb-1', name: 'Президентский ФМЛ №239', subtitle: 'Центральный район' },
          { id: 'ru-spb-2', name: 'Лицей №30', subtitle: 'Василеостровский район' },
        ],
      },
    ],
  },
  {
    id: 'gb',
    name: 'Великобритания',
    flag: '🇬🇧',
    cities: [
      {
        id: 'gb-lon', name: 'Лондон', subtitle: 'Англия',
        schools: [
          { id: 'gb-lon-1', name: 'Westminster School', subtitle: 'Вестминстер' },
          { id: 'gb-lon-2', name: 'St Paul\'s School', subtitle: 'Хаммерсмит' },
          { id: 'gb-lon-3', name: 'City of London School', subtitle: 'Сити' },
        ],
      },
      {
        id: 'gb-man', name: 'Манчестер', subtitle: 'Англия',
        schools: [
          { id: 'gb-man-1', name: 'Manchester Grammar School', subtitle: 'Виктория Парк' },
          { id: 'gb-man-2', name: 'Withington Girls\' School', subtitle: 'Уизингтон' },
        ],
      },
    ],
  },
  {
    id: 'de',
    name: 'Германия',
    flag: '🇩🇪',
    cities: [
      {
        id: 'de-ber', name: 'Берлин', subtitle: 'федеральная земля Берлин',
        schools: [
          { id: 'de-ber-1', name: 'Gymnasium zum Grauen Kloster', subtitle: 'Митте' },
          { id: 'de-ber-2', name: 'Schadow-Gymnasium', subtitle: 'Целендорф' },
        ],
      },
      {
        id: 'de-mun', name: 'Мюнхен', subtitle: 'Бавария',
        schools: [
          { id: 'de-mun-1', name: 'Maximiliansgymnasium', subtitle: 'Максфорштадт' },
          { id: 'de-mun-2', name: 'Wilhelmsgymnasium', subtitle: 'Людвигсфорштадт' },
        ],
      },
    ],
  },
  {
    id: 'fr',
    name: 'Франция',
    flag: '🇫🇷',
    cities: [
      {
        id: 'fr-par', name: 'Париж', subtitle: 'Иль-де-Франс',
        schools: [
          { id: 'fr-par-1', name: 'Lycée Louis-le-Grand', subtitle: '5-й округ' },
          { id: 'fr-par-2', name: 'Lycée Henri-IV', subtitle: '5-й округ' },
          { id: 'fr-par-3', name: 'Lycée Janson de Sailly', subtitle: '16-й округ' },
        ],
      },
    ],
  },
  {
    id: 'ca',
    name: 'Канада',
    flag: '🇨🇦',
    cities: [
      {
        id: 'ca-tor', name: 'Торонто', subtitle: 'провинция Онтарио',
        schools: [
          { id: 'ca-tor-1', name: 'Upper Canada College', subtitle: 'Форест-Хилл' },
          { id: 'ca-tor-2', name: 'Havergal College', subtitle: 'Лоренс Парк' },
        ],
      },
      {
        id: 'ca-van', name: 'Ванкувер', subtitle: 'провинция Британская Колумбия',
        schools: [
          { id: 'ca-van-1', name: 'St. George\'s School', subtitle: 'Шонгнесси' },
          { id: 'ca-van-2', name: 'Crofton House School', subtitle: 'Мерсер' },
        ],
      },
    ],
  },
  {
    id: 'ae',
    name: 'ОАЭ',
    flag: '🇦🇪',
    cities: [
      {
        id: 'ae-dxb', name: 'Дубай', subtitle: 'эмират Дубай',
        schools: [
          { id: 'ae-dxb-1', name: 'GEMS Wellington Academy', subtitle: 'Аль-Хайл' },
          { id: 'ae-dxb-2', name: 'Dubai College', subtitle: 'Аль-Суфух' },
          { id: 'ae-dxb-3', name: 'Jumeirah English Speaking School', subtitle: 'Джумейра' },
        ],
      },
      {
        id: 'ae-abu', name: 'Абу-Даби', subtitle: 'столица ОАЭ',
        schools: [
          { id: 'ae-abu-1', name: 'Abu Dhabi Grammar School', subtitle: 'Аль-Марказия' },
          { id: 'ae-abu-2', name: 'Brighton College Abu Dhabi', subtitle: 'Аль-Раха' },
        ],
      },
    ],
  },
  {
    id: 'tr',
    name: 'Турция',
    flag: '🇹🇷',
    cities: [
      {
        id: 'tr-ist', name: 'Стамбул', subtitle: 'Мармарский регион',
        schools: [
          { id: 'tr-ist-1', name: 'Robert College', subtitle: 'Арнавуткёй' },
          { id: 'tr-ist-2', name: 'Galatasaray Lisesi', subtitle: 'Бейоглу' },
        ],
      },
      {
        id: 'tr-ank', name: 'Анкара', subtitle: 'Центральная Анатолия',
        schools: [
          { id: 'tr-ank-1', name: 'TED Ankara College', subtitle: 'Коллеж' },
          { id: 'tr-ank-2', name: 'Ankara Science High School', subtitle: 'Кечиорен' },
        ],
      },
    ],
  },
  {
    id: 'au',
    name: 'Австралия',
    flag: '🇦🇺',
    cities: [
      {
        id: 'au-syd', name: 'Сидней', subtitle: 'штат Новый Южный Уэльс',
        schools: [
          { id: 'au-syd-1', name: 'Sydney Grammar School', subtitle: 'Дарлингхёрст' },
          { id: 'au-syd-2', name: 'Cranbrook School', subtitle: 'Белльвью-Хилл' },
        ],
      },
      {
        id: 'au-mel', name: 'Мельбурн', subtitle: 'штат Виктория',
        schools: [
          { id: 'au-mel-1', name: 'Melbourne Grammar School', subtitle: 'Саут-Ярра' },
          { id: 'au-mel-2', name: 'Scotch College', subtitle: 'Хоторн' },
        ],
      },
    ],
  },
];
