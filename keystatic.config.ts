import { collection, config, fields, singleton } from '@keystatic/core';

const pageSchema = {
  title: fields.text({
    label: 'Заголовок',
    validation: { isRequired: true },
  }),
  description: fields.text({
    label: 'SEO-описание',
    multiline: true,
  }),
  content: fields.markdoc({
    label: 'Содержание',
    extension: 'md',
  }),
};

export default config({
  storage: {
    kind: 'github',
    repo: 'evdeev/evdeev.tech',
  },
  ui: {
    brand: { name: 'evdeev.tech' },
    navigation: {
      Контент: ['notes'],
      Страницы: ['home', 'notesPage'],
    },
  },
  collections: {
    notes: collection({
      label: 'Заметки',
      path: 'src/content/notes/*',
      slugField: 'slug',
      columns: ['title', 'created', 'status', 'draft'],
      entryLayout: 'content',
      format: { contentField: 'content' },
      schema: {
        title: fields.text({
          label: 'Заголовок',
          validation: { isRequired: true },
        }),
        slug: fields.slug({
          name: {
            label: 'Slug',
            description: 'Адрес заметки латиницей, например: good-tool-does-not-distract',
            validation: { isRequired: true },
          },
          slug: {
            label: 'Имя файла',
            description: 'Должно совпадать со slug: сайт использует это значение в URL.',
          },
        }),
        topic: fields.text({ label: 'Тема' }),
        status: fields.select({
          label: 'Статус',
          options: [
            { label: 'Опубликовано', value: 'published' },
            { label: 'Черновик', value: 'draft' },
          ],
          defaultValue: 'published',
        }),
        description: fields.text({
          label: 'SEO-описание',
          multiline: true,
        }),
        intro: fields.text({
          label: 'Анонс',
          multiline: true,
        }),
        created: fields.text({
          label: 'Дата и время публикации',
          description: 'Формат: YYYY-MM-DD HH:mm:ss',
        }),
        draft: fields.checkbox({
          label: 'Черновик',
          description: 'Черновики не выводятся на сайте.',
          defaultValue: true,
        }),
        tags: fields.array(
          fields.text({ label: 'Тег' }),
          {
            label: 'Теги',
            itemLabel: (props) => props.value || 'Новый тег',
          },
        ),
        cover: fields.text({
          label: 'Обложка',
          description: 'Путь или URL изображения. Сейчас поле может оставаться пустым.',
        }),
        content: fields.markdoc({
          label: 'Текст заметки',
          extension: 'md',
        }),
      },
    }),
  },
  singletons: {
    home: singleton({
      label: 'Главная',
      path: 'src/content/pages/home',
      entryLayout: 'content',
      format: { contentField: 'content' },
      schema: pageSchema,
    }),
    notesPage: singleton({
      label: 'Страница заметок',
      path: 'src/content/pages/notes',
      entryLayout: 'content',
      format: { contentField: 'content' },
      schema: pageSchema,
    }),
  },
});
