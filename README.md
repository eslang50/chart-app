StockSnap built with Next.js and Django

## How to run

First clone the repo and navigate to root directory (/chart-app)

Make sure to have at least Node 18 and Python 3.10

To run the front end (root directory)

/chart-app

```bash
npm install

npm run dev
```

To run the backend (api directory)

/chart-app/api

```bash
python3 -m venv venv

source venv/bin/activate  # On Windows, use `venv\Scripts\activate`

pip install -r requirements.txt

python3 manage.py migrate

python3 manage.py runserver
```

OR use docker to run both services (much easier)

In root directory, make sure docker is open

```bash
docker-compose build
docker-compose up
```

front end - http://localhost:3000
back end - http://localhost:8000

## Tools Used

Front end

- React
- Next.js
- Tailwind
- Typescript
- echarts

Back end

- Python
- Django

## Thoughts and process

This was a really fun project/task to work on! I wasn't too familiar with Next.js or Django but had a good understanding of React and using Express routes for APIs so it was easy to pick up through tutorials and the documentation

I first started creating the routes with Django; this was fairly straighforward with setting of the GET routes with the urls and data that were given in the instructions.

I then started working on the Next.js app set up. Having the built in routing system was very helpful instead of having to use React router so I decided to create a dashboard page and a list of different charts and info to look at for a stock. On each page I grabbed the data using the fetch API and used the data to populate the charts. I later configured the pages to all use a custom Chart component I created to simplify the code duplication with fetching.

With charting, I first started using Chart.js which worked but it was difficult to get a working candlestick chart (it wasn't built in but they had a working chart here (https://github.com/chartjs/chartjs-chart-financial/tree/master/docs), but relatively new so there weren't any docs on how to get started). I ended up switching over to echarts which had a lot of documentation (very helpful) and a built in candlestick type which worked!

Docker was also really fun to implement, I never created one for a full stack project before but using tutorials and documentation helped

Continuing to add more features to this project!

## Examples

![Image of stock price](./public/price.png)

![Image of finances](./public/finances.png)

![Image of stock news](./public/news.png)
