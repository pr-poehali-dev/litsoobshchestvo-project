export const MOCK_BOOKS = [
  { id:1, title:"Сердце вереска", author:"Ольга Светлова", authorId:"user2", genre:"Романтика", sub:"Исторический", chapters:18, readers:2340, saves:870, views:14200, likes:512, cover:"🌿", tags:["18+"], isNew:true, isHot:true, status:"ongoing" },
  { id:2, title:"Последний архивист", author:"Виктор Грин", authorId:"user3", genre:"Фантастика", sub:"Киберпанк", chapters:9, readers:980, saves:320, views:6800, likes:210, cover:"📡", tags:[], isNew:true, isHot:false, status:"ongoing" },
  { id:3, title:"Туман над Ладогой", author:"Алина Корень", authorId:"user4", genre:"Историческая проза", sub:"Роман", chapters:31, readers:4100, saves:1640, views:28000, likes:1020, cover:"🌊", tags:[], isNew:false, isHot:true, status:"finished" },
  { id:4, title:"Тени под ивой", author:"Марк Лесной", authorId:"user5", genre:"Мистика", sub:"Психологическая", chapters:6, readers:560, saves:190, views:3200, likes:98, cover:"🍃", tags:["насилие"], isNew:true, isHot:false, status:"ongoing" },
  { id:5, title:"Алхимик трав", author:"Соня Вешняя", authorId:"user6", genre:"Фэнтези", sub:"Славянское", chapters:24, readers:3200, saves:1100, views:19000, likes:780, cover:"🌱", tags:[], isNew:false, isHot:true, status:"ongoing" },
  { id:6, title:"Ночной сонет", author:"Дарья Ручей", authorId:"user7", genre:"Поэзия", sub:"Сонет", chapters:0, readers:740, saves:280, views:4400, likes:330, cover:"🌙", tags:[], isNew:true, isHot:false, status:"ongoing" },
  { id:7, title:"Степная волчица", author:"Лера Зима", authorId:"user8", genre:"Фэнтези", sub:"Боевое", chapters:12, readers:1890, saves:560, views:11200, likes:440, cover:"🐺", tags:["насилие"], isNew:true, isHot:true, status:"ongoing" },
  { id:8, title:"Кофе и Константин", author:"Маша Лист", authorId:"user9", genre:"Современная проза", sub:"", chapters:7, readers:3600, saves:1300, views:22000, likes:890, cover:"☕", tags:[], isNew:true, isHot:false, status:"ongoing" },
];

export const MOCK_NEWCOMERS = [
  { id:"n1", name:"Анна Первая", nick:"@anna_pervaya", genre:"Проза", role:"Автор", icon:"🌲", books:1, joinedDays:3 },
  { id:"n2", name:"Иван Росток", nick:"@ivan_rostok", genre:"Поэзия", role:"Автор", icon:"☀️", books:2, joinedDays:5 },
  { id:"n3", name:"Катя Туман", nick:"@katya_tuman", genre:"Мистика", role:"Автор", icon:"🌫️", books:1, joinedDays:7 },
  { id:"n4", name:"Лёша Нива", nick:"@lesha_niva", genre:"Фэнтези", role:"Автор", icon:"🌾", books:1, joinedDays:2 },
  { id:"n5", name:"Рита Сад", nick:"@rita_sad", genre:"Романтика", role:"Автор", icon:"❄️", books:1, joinedDays:6 },
  { id:"n6", name:"Дима Лес", nick:"@dima_les", genre:"Фантастика", role:"Чтец", icon:"🌳", books:0, joinedDays:1 },
];

export const MOCK_TOP_AUTHORS = [
  { rank:1, name:"Алина Корень", nick:"@alina_koren", books:9, readers:38000, rating:9850, badge:"🥇" },
  { rank:2, name:"Ольга Светлова", nick:"@olga_svetlova", books:6, readers:29500, rating:8720, badge:"🥈" },
  { rank:3, name:"Соня Вешняя", nick:"@sonya_veshnaya", books:11, readers:24000, rating:7640, badge:"🥉" },
  { rank:4, name:"Виктор Грин", nick:"@viktor_grin", books:4, readers:16200, rating:5300, badge:"" },
  { rank:5, name:"Марк Лесной", nick:"@mark_lesnoy", books:7, readers:12800, rating:4200, badge:"" },
  { rank:6, name:"Дарья Ручей", nick:"@darya_ruchey", books:3, readers:9400, rating:3100, badge:"" },
  { rank:7, name:"Лера Зима", nick:"@lera_zima", books:2, readers:7800, rating:2600, badge:"" },
  { rank:8, name:"Маша Лист", nick:"@masha_list", books:1, readers:6200, rating:2100, badge:"" },
];

export const MOCK_DUELS = [
  { id:1, title:"«Дорога домой»", theme:"Любая дорога ведёт домой", a1:{ name:"Алина Корень", votes:312 }, a2:{ name:"Виктор Грин", votes:278 }, timeLeft:"08:14:22", active:true, endDate:"25 апр 2026" },
  { id:2, title:"«Первый снег»", theme:"Первый снег как метафора начала", a1:{ name:"Соня Вешняя", votes:641 }, a2:{ name:"Марк Лесной", votes:589 }, timeLeft:"завершена", active:false, endDate:"22 апр 2026" },
];

export const MOCK_EVENTS = [
  { id:1, title:"Майский марафон", tag:"Марафон", date:"1–31 мая 2026", desc:"Напишите не менее 30 000 знаков за месяц. Все финишировавшие получат значок «Марафонец».", icon:"🌿", participants:342 },
  { id:2, title:"Флэшмоб «Зелёное слово»", tag:"Флэшмоб", date:"5 мая 2026", desc:"Напишите рассказ или стихотворение с ключевой фразой «зелёное слово». До 2 000 знаков.", icon:"✍️", participants:87 },
  { id:3, title:"Конкурс «Листопад»", tag:"Конкурс", date:"15–25 мая 2026", desc:"Лучший рассказ об осени. Приз: коммерческий статус на 3 месяца.", icon:"🍂", participants:156 },
  { id:4, title:"Дуэль недели", tag:"Дуэли", date:"Каждый пн", desc:"Публичные баттлы рассказов от подписчиков. Голосуют все зарегистрированные читатели.", icon:"⚔️", participants:28 },
];

export const MOCK_REVIEWS = [
  { id:1, book:"Сердце вереска", bookId:1, author:"ЧитательNix", rating:5, text:"Невероятно атмосферно! Каждая глава — как глоток свежего воздуха.", spoiler:"В финале выясняется, что Анна — тайная наследница рода Светловых.", likes:23, date:"23 апр" },
  { id:2, book:"Алхимик трав", bookId:5, author:"Книголюб_99", rating:4, text:"Интересный мир, много деталей о травничестве. Герои живые.", spoiler:"Учитель алхимика оказывается антагонистом — крадёт силу растений из снов.", likes:15, date:"22 апр" },
  { id:3, book:"Туман над Ладогой", bookId:3, author:"ИсторикМих", rating:5, text:"Документальная точность в историческом романе — редкость. Рекомендую.", spoiler:"Главный герой теряет память и начинает новую жизнь под чужим именем.", likes:31, date:"20 апр" },
];

export const MOCK_CHAT = [
  { id:1, user:"Алина К.", av:"АК", text:"Доброе утро всем! Кто пишет сегодня? 🌿", likes:6, time:"09:04" },
  { id:2, user:"Виктор Г.", av:"ВГ", text:"Закончил 9-ю главу. Наконец-то поворот!", likes:14, time:"09:22" },
  { id:3, user:"ЧитательNix", av:"ЧН", text:"Жду продолжения «Сердца вереска» 😭", likes:8, time:"09:48" },
  { id:4, user:"Соня В.", av:"СВ", text:"Новые главы «Алхимика трав» загружены! 🌱", likes:21, time:"10:11" },
  { id:5, user:"Дарья Р.", av:"ДР", text:"Объявлен конкурс стихов на тему природы!", likes:9, time:"10:35" },
];

export const MOCK_MESSAGES = [
  { id:1, user:"Ольга Светлова", av:"ОС", last:"Спасибо за рецензию!", time:"10:40", unread:2 },
  { id:2, user:"Виктор Грин", av:"ВГ", last:"Готов к дуэли в пятницу?", time:"вчера", unread:0 },
  { id:3, user:"Редакция", av:"РД", last:"Ваш материал одобрен.", time:"вчера", unread:0 },
  { id:4, user:"Техподдержка", av:"ТП", last:"Здравствуйте! Чем можем помочь?", time:"вчера", unread:0 },
];

export const MOCK_NOTIFS = [
  { icon:"MessageSquare" as const, text:'Книголюб_99 оставил рецензию на «Алхимика трав»', time:"3 мин назад", unread:true },
  { icon:"Heart" as const, text:"18 новых лайков на главу 24", time:"12 мин назад", unread:true },
  { icon:"BookMarked" as const, text:"Ваша книга добавлена в 12 библиотек", time:"1 час назад", unread:false },
  { icon:"FileCheck" as const, text:"Заявка на коммерческий статус рассматривается", time:"2 часа назад", unread:false },
  { icon:"Megaphone" as const, text:"Майский марафон стартует 1 мая!", time:"3 часа назад", unread:false },
  { icon:"Sword" as const, text:"Вам брошен вызов на дуэль! Тема: «Осень»", time:"4 часа назад", unread:false },
];

export const COAUTHOR_PROJECTS = [
  { id:1, title:"«Лесная академия»", authors:["Соня В.","Алина К."], genre:"Фэнтези", chapters:8, status:"Активен", lastEdit:"сегодня" },
  { id:2, title:"«Код молчания»", authors:["Виктор Г.","Марк Л."], genre:"Триллер", chapters:3, status:"Активен", lastEdit:"вчера" },
];

export const SOCIAL_PROVIDERS = [
  { id:"vk", label:"ВКонтакте", color:"#0077FF", bg:"#E8F1FF", emoji:"💙" },
  { id:"google", label:"Google", color:"#DB4437", bg:"#FFEEED", emoji:"🔴" },
  { id:"ok", label:"Одноклассники", color:"#EE8208", bg:"#FFF3E0", emoji:"🟠" },
  { id:"yandex", label:"Яндекс", color:"#FC3F1D", bg:"#FFF0EE", emoji:"🟡" },
];

export const ROLES = ["Автор","Читатель","Художник","Режиссёр","Чтец"];
