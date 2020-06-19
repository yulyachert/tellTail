// Удобно разделять зависимости на три группы
// В первой – встроенные модули Node.js в алфавитном порядке
import path from 'path';

// Во второй – сторонние модули в алфавитном порядке
import config from 'config';
import express, { NextFunction as Next, Request, Response } from 'express';
import hbs from 'hbs';
import morgan from 'morgan';

// В третьей – собственные модули в алфавитном порядке
import commonData from 'middlewares/common-data';
import routes from 'routes';
import sequelize from './data-base-init';

// Создаём экземпляр приложения
const app = express();

// Определяем директорию для хранения шаблонов
// Для работы с директориями всегда используем модуль «path»
// и преобразуем относительные пути в абсолютные
const viewsDir = path.join(__dirname, 'views');

// Определяем директорию для хранения отдельных частей шаблонов
const partialsDir = path.join(viewsDir, 'partials');

// Определяем директорию для статичных файлов (изображений, стилей и скриптов)
const publicDir = path.join(__dirname, 'public');

// Подключаем шаблонизатор
app.set('view engine', 'hbs');

// Подключаем директорию с шаблонами
app.set('views', viewsDir);

// Логируем запросы к приложению в debug-режиме
if (config.get('debug')) {
    app.use(morgan('dev'));
}

// Отдаём статичные файлы из соответствующей директории
app.use(express.static(publicDir));

// Собираем общие данные для всех страниц приложения
app.use(commonData);

// Подключаем маршруты
routes(app);

// Фиксируем фатальную ошибку и отправляем ответ с кодом 500
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: Error, _req: Request, res: Response, _next: Next) => {
    console.error(err.stack);

    res.sendStatus(500);
});

(async () => {
    await sequelize.sync({ force: false });

    hbs.registerPartials(partialsDir, () => {
        const port = config.get('port');

        app.listen(port, () => {
            console.info(`Server started on ${port}`);
            console.info(`Open http://localhost:${port}/`);
        });
    });
})();
