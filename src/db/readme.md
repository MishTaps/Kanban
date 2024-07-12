Доска загружается из файла JSON.

Структура файла JSON:

```json
{
	"name": "string",
	"id": 123,
	"columns": []
}
```

-   `name` - Название доски;
-   `id` - Идентификатор доски;
-   `columns[]` - Массив, содержащий колонки данной доски.

Структура массива `columns[]`:

```json
{
	"name": "string",
	"id": 123,
	"color": "string",
	"cards": []
}
```

-   `name` - Название колонки;
-   `id` - Идентификатор колонки;
-   `color` - Цвет кружочка у названия колонки (см. таблицу ниже);
-   `cards[]` - Массив, содержащий карточки данной колонки.

Значения, которые может принимать `color`:

| Значение   | Цвет (rgba)            |
| ---------- | ---------------------- |
| red        | rgba(194, 78, 78, 1)   |
| orange     | rgba(224, 120, 45, 1)  |
| yellow     | rgba(254, 217, 31, 1)  |
| green      | rgba(115, 222, 182, 1) |
| light-blue | rgba(54, 180, 216, 1)  |
| blue       | rgba(51, 104, 201, 1)  |
| purple     | rgba(125, 106, 247, 1) |

Структура массива `cards[]`:

```json
{
	"name": "string",
	"id": 123,
	"subtasks": []
}
```

-   `name` - Название карточки;
-   `id` - Идентификатор карточки;
-   `subtasks[]` - Массив, содержащий подзадачи данной карточки.

Структура массива `subtasks[]`:

```json
{
	"name": "string",
	"id": 123,
	"finished": true
}
```

-   `name` - Название подзадачи;
-   `id` - Идентификатор подзадачи;
-   `finished` - Завершена ли подзадача.

---

Общий вид JSON файла:

```json
{
	"name": "string",
	"id": 123,
	"columns": [
		{
			"name": "string",
			"id": 123,
			"color": "string",
			"cards": [
				{
					"name": "string",
					"id": 123,
					"subtasks": [
						{
							"name": "string",
							"id": 123,
							"finished": true
						}
					]
				}
			]
		}
	]
}
```

Пример JSON файла:

```json
{
	"name": "Доска из файла JSON",
	"id": 0,
	"columns": [
		{
			"name": "Сделать",
			"id": 0,
			"color": "blue",
			"cards": [
				{
					"name": "Заголовок задачи №1",
					"id": 0,
					"subtasks": [
						{
							"name": "Подзадача №1",
							"id": 0,
							"finished": false
						},
						{
							"name": "Подзадача №2",
							"id": 1,
							"finished": true
						},
						{
							"name": "Подзадача №3",
							"id": 2,
							"finished": false
						}
					]
				},
				{
					"name": "Заголовок задачи №2",
					"id": 1,
					"subtasks": [
						{
							"name": "Подзадача №1",
							"id": 0,
							"finished": false
						},
						{
							"name": "Подзадача №2",
							"id": 1,
							"finished": false
						},
						{
							"name": "Подзадача №3",
							"id": 2,
							"finished": false
						}
					]
				},
				{
					"name": "Заголовок задачи №3",
					"id": 0,
					"subtasks": [
						{
							"name": "Подзадача №1",
							"id": 0,
							"finished": true
						},
						{
							"name": "Подзадача №2",
							"id": 1,
							"finished": false
						},
						{
							"name": "Подзадача №3",
							"id": 2,
							"finished": true
						}
					]
				}
			]
		},
		{
			"name": "В работе",
			"id": 1,
			"color": "purple",
			"cards": [
				{
					"name": "Заголовок задачи №4",
					"id": 3,
					"subtasks": [
						{
							"name": "Подзадача №1",
							"id": 0,
							"finished": false
						},
						{
							"name": "Подзадача №2",
							"id": 1,
							"finished": false
						},
						{
							"name": "Подзадача №3",
							"id": 2,
							"finished": true
						}
					]
				},
				{
					"name": "Заголовок задачи №5",
					"id": 4,
					"subtasks": [
						{
							"name": "Подзадача №1",
							"id": 0,
							"finished": false
						},
						{
							"name": "Подзадача №2",
							"id": 1,
							"finished": false
						},
						{
							"name": "Подзадача №3",
							"id": 2,
							"finished": false
						}
					]
				}
			]
		},
		{
			"name": "Готово",
			"id": 2,
			"color": "green",
			"cards": [
				{
					"name": "Заголовок задачи №6",
					"id": 5,
					"subtasks": [
						{
							"name": "Подзадача №1",
							"id": 0,
							"finished": true
						},
						{
							"name": "Подзадача №2",
							"id": 1,
							"finished": true
						},
						{
							"name": "Подзадача №3",
							"id": 2,
							"finished": true
						}
					]
				},
				{
					"name": "Заголовок задачи №7",
					"id": 6,
					"subtasks": [
						{
							"name": "Подзадача №1",
							"id": 0,
							"finished": true
						},
						{
							"name": "Подзадача №2",
							"id": 1,
							"finished": false
						},
						{
							"name": "Подзадача №3",
							"id": 2,
							"finished": false
						}
					]
				},
				{
					"name": "Заголовок задачи №8",
					"id": 7,
					"subtasks": [
						{
							"name": "Подзадача №1",
							"id": 0,
							"finished": false
						},
						{
							"name": "Подзадача №2",
							"id": 1,
							"finished": false
						},
						{
							"name": "Подзадача №3",
							"id": 2,
							"finished": false
						}
					]
				},
				{
					"name": "Заголовок задачи №9",
					"id": 8,
					"subtasks": [
						{
							"name": "Подзадача №1",
							"id": 0,
							"finished": false
						},
						{
							"name": "Подзадача №2",
							"id": 1,
							"finished": true
						},
						{
							"name": "Подзадача №3",
							"id": 2,
							"finished": false
						}
					]
				}
			]
		}
	]
}
```
