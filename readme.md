# Тайжанов Нурбек (16 лет) Техническое задание на nFactorial Incubator 2023


## Installation

Run backend first

```cmd
cd backend
npm install
npm start
```

Then, run frontend

```cmd
cd ../
cd frontend
npm install
npm start
```

## Usage

Open http://localhost:3000/ on your browser

## Notes

Мой стек - React.js в качестве клиента, express.js в качестве сервера. Базу данных создал с нуля - db folder. В нем хранятся таблицы - users, files. Я реализовал почти все типы данных (int, url, string, etc.). Я использовал constraints (as null, primary key) в своей базе данных. Также разработал систему обработки фильтра и сортировки данных по желанию пользователя с нуля с помощью алгоритмов. Таким образом построил оптимальную логику хранения данных. Внес возможность CRUD данных. Храню большие данные как изображение, документы, файлы в uploads. Самый эффективные и в тоже время простой метод — хранить URL-адрес файла в базе данных JSON. Если вы хотите получить файл, вы можете использовать URL-адрес для загрузки файла. Также в фронтенде добавил возможность визуализации таблиц. На самом деле хотел сделать копию MongoDB (со схемами), но 2 дня за это критично мало. Все же вложился в проект почти по максимуму. Хочу добавить что, я больше робототехник и инженер по машинному обучению. Спасибо за внимание!
