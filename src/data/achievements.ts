export interface Achievement {
  id: string;
  category: string;
  title: string;
  desc: string;
  icon: string;
  secret?: boolean;
}

export const ACHIEVEMENTS: Achievement[] = [
  // Выслуга лет
  { id:"first_day", category:"Выслуга", title:"Первый день", desc:"Впервые на сайте", icon:"🌱" },
  { id:"week", category:"Выслуга", title:"Неделя", desc:"Неделя на сайте", icon:"🌿" },
  { id:"month", category:"Выслуга", title:"Месяц", desc:"Месяц на сайте", icon:"🍃" },
  { id:"months3", category:"Выслуга", title:"3 месяца", desc:"3 месяца на сайте", icon:"🌳" },
  { id:"half_year", category:"Выслуга", title:"Полгода", desc:"Полгода на сайте", icon:"🌲" },
  { id:"year", category:"Выслуга", title:"Год", desc:"Год на сайте", icon:"🎋" },
  { id:"years2", category:"Выслуга", title:"2 года", desc:"2 года на сайте", icon:"🏔️" },
  { id:"years3", category:"Выслуга", title:"3 года", desc:"3 года на сайте", icon:"⛰️" },
  { id:"years5", category:"Выслуга", title:"5 лет", desc:"5 лет на сайте", icon:"🗻" },
  { id:"years7", category:"Выслуга", title:"7 лет", desc:"7 лет на сайте", icon:"🌍" },
  { id:"years10", category:"Выслуга", title:"10 лет", desc:"10 лет на сайте", icon:"🌟" },
  { id:"years15", category:"Выслуга", title:"15 лет", desc:"15 лет на сайте", icon:"💫" },
  { id:"years20", category:"Выслуга", title:"20 лет", desc:"20 лет на сайте", icon:"✨" },

  // Писательство
  { id:"first_book", category:"Писательство", title:"Первая книга", desc:"Первая написанная книга", icon:"📖" },
  { id:"first_chapter", category:"Писательство", title:"Первая глава", desc:"Первая опубликованная глава", icon:"📝" },
  { id:"books5", category:"Писательство", title:"Пять книг", desc:"5 книг написано", icon:"📚" },
  { id:"books10", category:"Писательство", title:"Десять книг", desc:"10 книг написано", icon:"📚" },
  { id:"books25", category:"Писательство", title:"25 книг", desc:"25 книг написано", icon:"🗂️" },
  { id:"books50", category:"Писательство", title:"50 книг", desc:"50 книг написано", icon:"🗄️" },
  { id:"books100", category:"Писательство", title:"100 книг", desc:"100 книг написано", icon:"🏛️" },
  { id:"chars500k", category:"Писательство", title:"500К знаков", desc:"500 000 знаков написано", icon:"✍️" },
  { id:"chars1m", category:"Писательство", title:"1 миллион", desc:"1 000 000 знаков написано", icon:"🖊️" },
  { id:"chars5m", category:"Писательство", title:"5 миллионов", desc:"5 000 000 знаков написано", icon:"🪶" },
  { id:"chars10m", category:"Писательство", title:"10 миллионов", desc:"10 000 000 знаков написано", icon:"🏆" },
  { id:"book_finished", category:"Писательство", title:"Финал", desc:'Книга дописана — статус "Завершено"', icon:"🎯" },
  { id:"new_genre", category:"Писательство", title:"Новый жанр", desc:"Первая книга в новом жанре", icon:"🎭" },

  // Читатели
  { id:"reader1", category:"Читатели", title:"Первый читатель", desc:"Первый читатель у вашей книги", icon:"👁️" },
  { id:"readers10", category:"Читатели", title:"10 читателей", desc:"10 читателей", icon:"👥" },
  { id:"readers50", category:"Читатели", title:"50 читателей", desc:"50 читателей", icon:"👥" },
  { id:"readers100", category:"Читатели", title:"100 читателей", desc:"100 читателей", icon:"🎪" },
  { id:"readers500", category:"Читатели", title:"500 читателей", desc:"500 читателей", icon:"🎭" },
  { id:"readers1k", category:"Читатели", title:"1 000 читателей", desc:"1 000 читателей", icon:"🌟" },
  { id:"readers5k", category:"Читатели", title:"5 000 читателей", desc:"5 000 читателей", icon:"⭐" },
  { id:"readers10k", category:"Читатели", title:"10 000 читателей", desc:"10 000 читателей", icon:"💫" },
  { id:"readers50k", category:"Читатели", title:"50 000 читателей", desc:"50 000 читателей", icon:"🌠" },
  { id:"readers100k", category:"Читатели", title:"100 000 читателей", desc:"100 000 читателей", icon:"☀️" },

  // Подписчики
  { id:"sub1", category:"Подписчики", title:"Первый подписчик", desc:"Первый подписчик", icon:"🔔" },
  { id:"subs10", category:"Подписчики", title:"10 подписчиков", desc:"10 подписчиков", icon:"🔔" },
  { id:"subs50", category:"Подписчики", title:"50 подписчиков", desc:"50 подписчиков", icon:"🔔" },
  { id:"subs100", category:"Подписчики", title:"100 подписчиков", desc:"100 подписчиков", icon:"📣" },
  { id:"subs500", category:"Подписчики", title:"500 подписчиков", desc:"500 подписчиков", icon:"📣" },
  { id:"subs1k", category:"Подписчики", title:"1 000 подписчиков", desc:"1 000 подписчиков", icon:"📢" },
  { id:"subs5k", category:"Подписчики", title:"5 000 подписчиков", desc:"5 000 подписчиков", icon:"📢" },
  { id:"subs10k", category:"Подписчики", title:"10 000 подписчиков", desc:"10 000 подписчиков", icon:"📡" },

  // Библиотека
  { id:"lib1", category:"Библиотека", title:"В библиотеку", desc:"Первое добавление в библиотеку", icon:"🔖" },
  { id:"lib10", category:"Библиотека", title:"10 добавлений", desc:"10 добавлений в библиотеку", icon:"📌" },
  { id:"lib50", category:"Библиотека", title:"50 добавлений", desc:"50 добавлений в библиотеку", icon:"📌" },
  { id:"lib100", category:"Библиотека", title:"100 добавлений", desc:"100 добавлений в библиотеку", icon:"📍" },
  { id:"lib500", category:"Библиотека", title:"500 добавлений", desc:"500 добавлений в библиотеку", icon:"📍" },
  { id:"lib1k", category:"Библиотека", title:"1 000 добавлений", desc:"1 000 добавлений в библиотеку", icon:"🗃️" },
  { id:"lib5k", category:"Библиотека", title:"5 000 добавлений", desc:"5 000 добавлений в библиотеку", icon:"🗃️" },
  { id:"lib10k", category:"Библиотека", title:"10 000 добавлений", desc:"10 000 добавлений в библиотеку", icon:"🏦" },

  // Лайки
  { id:"like1", category:"Лайки", title:"Первый лайк", desc:"Получен первый лайк", icon:"📜" },
  { id:"likes10", category:"Лайки", title:"10 лайков", desc:"10 лайков", icon:"📜" },
  { id:"likes50", category:"Лайки", title:"50 лайков", desc:"50 лайков", icon:"📜" },
  { id:"likes100", category:"Лайки", title:"100 лайков", desc:"100 лайков", icon:"📜" },
  { id:"likes500", category:"Лайки", title:"500 лайков", desc:"500 лайков", icon:"📜" },
  { id:"likes1k", category:"Лайки", title:"1 000 лайков", desc:"1 000 лайков", icon:"🏅" },
  { id:"likes5k", category:"Лайки", title:"5 000 лайков", desc:"5 000 лайков", icon:"🥇" },
  { id:"likes10k", category:"Лайки", title:"10 000 лайков", desc:"10 000 лайков", icon:"🎖️" },

  // Комментарии
  { id:"comment1", category:"Комментарии", title:"Первый комментарий", desc:"Первый комментарий получен", icon:"💬" },
  { id:"comments10", category:"Комментарии", title:"10 комментариев", desc:"10 комментариев", icon:"💬" },
  { id:"comments50", category:"Комментарии", title:"50 комментариев", desc:"50 комментариев", icon:"💭" },
  { id:"comments100", category:"Комментарии", title:"100 комментариев", desc:"100 комментариев", icon:"💭" },
  { id:"comments500", category:"Комментарии", title:"500 комментариев", desc:"500 комментариев", icon:"🗣️" },
  { id:"comments1k", category:"Комментарии", title:"1 000 комментариев", desc:"1 000 комментариев", icon:"🗣️" },
  { id:"comments5k", category:"Комментарии", title:"5 000 комментариев", desc:"5 000 комментариев", icon:"📡" },

  // Рецензии
  { id:"review1", category:"Рецензии", title:"Первый отзыв", desc:"Первый отзыв", icon:"🖊️" },
  { id:"reviews5", category:"Рецензии", title:"5 отзывов", desc:"5 отзывов", icon:"🖊️" },
  { id:"reviews10", category:"Рецензии", title:"10 отзывов", desc:"10 отзывов", icon:"✒️" },
  { id:"reviews25", category:"Рецензии", title:"25 отзывов", desc:"25 отзывов", icon:"✒️" },
  { id:"reviews50", category:"Рецензии", title:"50 отзывов", desc:"50 отзывов", icon:"📋" },
  { id:"reviews100", category:"Рецензии", title:"100 отзывов", desc:"100 отзывов", icon:"📋" },
  { id:"deep_review1", category:"Рецензии", title:"Первая рецензия", desc:"Первая развёрнутая рецензия", icon:"📝" },
  { id:"deep_reviews10", category:"Рецензии", title:"10 рецензий", desc:"10 развёрнутых рецензий", icon:"📝" },
  { id:"deep_reviews25", category:"Рецензии", title:"25 рецензий", desc:"25 развёрнутых рецензий", icon:"📜" },
  { id:"deep_reviews50", category:"Рецензии", title:"50 рецензий", desc:"50 развёрнутых рецензий", icon:"📜" },

  // Активность читателя
  { id:"read_1h", category:"Активность читателя", title:"1 час чтения", desc:"Прочитано 1 час", icon:"⏱️" },
  { id:"read_10h", category:"Активность читателя", title:"10 часов", desc:"Прочитано 10 часов", icon:"⏱️" },
  { id:"read_50h", category:"Активность читателя", title:"50 часов", desc:"Прочитано 50 часов", icon:"⏰" },
  { id:"read_100h", category:"Активность читателя", title:"100 часов", desc:"Прочитано 100 часов", icon:"⏰" },
  { id:"read_500h", category:"Активность читателя", title:"500 часов", desc:"Прочитано 500 часов", icon:"🕰️" },
  { id:"read_1000h", category:"Активность читателя", title:"1 000 часов", desc:"Прочитано 1 000 часов", icon:"🕰️" },
  { id:"read_5000h", category:"Активность читателя", title:"5 000 часов", desc:"Прочитано 5 000 часов", icon:"⌚" },
  { id:"read_book1", category:"Активность читателя", title:"Первая книга", desc:"Прочитана первая книга", icon:"📗" },
  { id:"read_books5", category:"Активность читателя", title:"5 книг", desc:"Прочитано 5 книг", icon:"📗" },
  { id:"read_books10", category:"Активность читателя", title:"10 книг", desc:"Прочитано 10 книг", icon:"📘" },
  { id:"read_books25", category:"Активность читателя", title:"25 книг", desc:"Прочитано 25 книг", icon:"📘" },
  { id:"read_books50", category:"Активность читателя", title:"50 книг", desc:"Прочитано 50 книг", icon:"📙" },
  { id:"read_books100", category:"Активность читателя", title:"100 книг", desc:"Прочитано 100 книг", icon:"📙" },
  { id:"read_books500", category:"Активность читателя", title:"500 книг", desc:"Прочитано 500 книг", icon:"📚" },
  { id:"reader_review1", category:"Активность читателя", title:"Первый отзыв", desc:"Первый отзыв как читатель", icon:"💬" },
  { id:"reader_reviews10", category:"Активность читателя", title:"10 отзывов", desc:"10 отзывов как читатель", icon:"💬" },
  { id:"reader_reviews25", category:"Активность читателя", title:"25 отзывов", desc:"25 отзывов как читатель", icon:"💭" },
  { id:"reader_reviews50", category:"Активность читателя", title:"50 отзывов", desc:"50 отзывов как читатель", icon:"💭" },
  { id:"reader_reviews100", category:"Активность читателя", title:"100 отзывов", desc:"100 отзывов как читатель", icon:"🗣️" },

  // Дуэли
  { id:"duel1", category:"Дуэли", title:"Первая дуэль", desc:"Первая дуэль", icon:"⚔️" },
  { id:"duels5", category:"Дуэли", title:"5 дуэлей", desc:"5 дуэлей", icon:"⚔️" },
  { id:"duels10", category:"Дуэли", title:"10 дуэлей", desc:"10 дуэлей", icon:"🗡️" },
  { id:"duels25", category:"Дуэли", title:"25 дуэлей", desc:"25 дуэлей", icon:"🗡️" },
  { id:"duels50", category:"Дуэли", title:"50 дуэлей", desc:"50 дуэлей", icon:"🏹" },
  { id:"duel_win1", category:"Дуэли", title:"Победа!", desc:"Победа в дуэли", icon:"🥇" },
  { id:"duel_wins5", category:"Дуэли", title:"5 побед", desc:"5 побед в дуэлях", icon:"🥇" },
  { id:"duel_wins10", category:"Дуэли", title:"10 побед", desc:"10 побед в дуэлях", icon:"🏆" },
  { id:"duel_wins25", category:"Дуэли", title:"25 побед", desc:"25 побед в дуэлях", icon:"🏆" },

  // Конкурсы
  { id:"contest1", category:"Конкурсы", title:"Первый конкурс", desc:"Первый конкурс", icon:"🎪" },
  { id:"contest_win", category:"Конкурсы", title:"Победитель!", desc:"Победа в конкурсе", icon:"🥇" },
  { id:"contest_prize", category:"Конкурсы", title:"Призовое место", desc:"Призовое место в конкурсе", icon:"🥈" },
  { id:"contests5", category:"Конкурсы", title:"5 конкурсов", desc:"Участие в 5 конкурсах", icon:"🎭" },
  { id:"contests10", category:"Конкурсы", title:"10 конкурсов", desc:"Участие в 10 конкурсах", icon:"🎭" },

  // Соавторство
  { id:"coauthor1", category:"Соавторство", title:"Соавтор", desc:"Первое соавторство", icon:"🤝" },
  { id:"coauthors3", category:"Соавторство", title:"3 проекта", desc:"3 совместных проекта", icon:"🤝" },
  { id:"coauthors5", category:"Соавторство", title:"5 проектов", desc:"5 совместных проектов", icon:"🤝" },
  { id:"coauthors10", category:"Соавторство", title:"10 проектов", desc:"10 совместных проектов", icon:"🤝" },

  // Блоги
  { id:"blog1", category:"Блоги", title:"Первый пост", desc:"Первый пост в блоге", icon:"✏️" },
  { id:"blogs5", category:"Блоги", title:"5 постов", desc:"5 постов в блоге", icon:"✏️" },
  { id:"blogs10", category:"Блоги", title:"10 постов", desc:"10 постов в блоге", icon:"📝" },
  { id:"blogs25", category:"Блоги", title:"25 постов", desc:"25 постов в блоге", icon:"📝" },
  { id:"blogs50", category:"Блоги", title:"50 постов", desc:"50 постов в блоге", icon:"📋" },
  { id:"blogs100", category:"Блоги", title:"100 постов", desc:"100 постов в блоге", icon:"📋" },
  { id:"blogs500", category:"Блоги", title:"500 постов", desc:"500 постов в блоге", icon:"📚" },

  // Коммерческий статус
  { id:"commercial", category:"Коммерческий", title:"Коммерческий статус", desc:"Коммерческий статус получен", icon:"💼" },
  { id:"sale1", category:"Коммерческий", title:"Первая продажа", desc:"Первая продажа", icon:"💰" },
  { id:"sales10", category:"Коммерческий", title:"10 продаж", desc:"10 продаж", icon:"💰" },
  { id:"sales50", category:"Коммерческий", title:"50 продаж", desc:"50 продаж", icon:"💵" },
  { id:"sales100", category:"Коммерческий", title:"100 продаж", desc:"100 продаж", icon:"💵" },
  { id:"sales500", category:"Коммерческий", title:"500 продаж", desc:"500 продаж", icon:"🏦" },
  { id:"award1", category:"Коммерческий", title:"Первая награда", desc:"Первая награда", icon:"🏅" },
  { id:"awards3", category:"Коммерческий", title:"3 награды", desc:"3 награды", icon:"🏅" },
  { id:"awards5", category:"Коммерческий", title:"5 наград", desc:"5 наград", icon:"🎖️" },
  { id:"awards10", category:"Коммерческий", title:"10 наград", desc:"10 наград", icon:"🎖️" },
  { id:"bought_book", category:"Коммерческий", title:"Купленная книга", desc:"Куплена книга (для читателя)", icon:"🛒" },

  // Особые
  { id:"genre_top", category:"Особые", title:"Топ жанра", desc:"Книга в топе жанра", icon:"🔥" },
  { id:"hot_new", category:"Особые", title:"Горячая новинка", desc:"Книга в горячих новинках", icon:"🔥" },
  { id:"book_of_week", category:"Особые", title:"Книга недели", desc:"Книга недели", icon:"⭐" },
  { id:"author_of_week", category:"Особые", title:"Автор недели", desc:"Автор недели", icon:"🌟" },
  { id:"author_of_month", category:"Особые", title:"Автор месяца", desc:"Автор месяца", icon:"☀️" },
  { id:"veteran", category:"Особые", title:"Ветеран", desc:"Ветеран платформы — 5+ лет", icon:"🏰" },
  { id:"legend", category:"Особые", title:"Легенда", desc:"Легенда платформы — 10+ лет", icon:"👑" },
  { id:"gift1", category:"Особые", title:"Первый донат", desc:"Первый подарок или донат", icon:"🎁" },
  { id:"ambassador", category:"Особые", title:"Амбассадор", desc:"Амбассадор сообщества", icon:"🌍" },
  { id:"collector", category:"Особые", title:"Коллекционер", desc:"100+ книг в библиотеке", icon:"📦" },
  { id:"night_writer", category:"Особые", title:"Ночной писатель", desc:"Активность после полуночи", icon:"🌙" },
  { id:"early_bird", category:"Особые", title:"Ранняя пташка", desc:"Активность до 6 утра", icon:"🌅" },
  { id:"secret1", category:"Секретные", title:"???", desc:"Секретное достижение", icon:"🔮", secret: true },
  { id:"secret2", category:"Секретные", title:"???", desc:"Секретное достижение", icon:"🔮", secret: true },
  { id:"secret3", category:"Секретные", title:"???", desc:"Секретное достижение", icon:"🔮", secret: true },
];

export const ACHIEVEMENT_CATEGORIES = [...new Set(ACHIEVEMENTS.map(a => a.category))];
