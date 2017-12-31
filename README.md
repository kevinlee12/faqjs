# FAQ JS edition

## Running the app

At the root:

```bash
DEBUG=faqjs:* yarn start
```

In `public/javascripts`

```bash
parcel watch index.js
```

## Getting started checklist

- MongoDB
  - URL in .env
  - Create index for `question` and `answer`
  - Load threads into MongoDB
- Elasticsearch Url (tbd - to be developed)
- Install NodeJS
- Run `yarn install` or `npm install` at root and `public/javascripts/`


## Developer notes

Please do not commit your `.env` file!
