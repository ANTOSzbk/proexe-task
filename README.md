# Proexe Recruitment Task

### Installation
Steps to reproduce development environment.

Using Docker container explicit environment, `docker-compose`:

```
git clone git@github.com:ANTOSzbk/proexe-task.git
docker-compose run project npm install
docker-compose up
```

Using just `npm` package manager:

```
git clone git@github.com:ANTOSzbk/proexe-task.git
cd proexe-task && cd dashboard
npm i
npm run start
```

After installation and executing run script project is available at http://localhost:3000.
Project is also available remotely at https://proexe.antoszbk.xyz/ - my personal domain.

## Information

Standard file structure created using _Create-React-App CLI_.
I used Docker for unique Node environment.
Time spent with project ~3-4h. Mostly with setting up environment, but had some problems with POST, DELETE, PUT read-only singularity. I could make it a little bit faster, but design and bughunting is too important for me.
I used `react-hook-form` and `react-bootstrap` as external libraries for validation and visual appearance.

File structure - Standard CRA - components, containers(views), and redux store parallel.

```
├── README.md
├── package.json
├── public
└── src
    ├── App.css
    ├── App.js
    ├── components
    │   ├── Alert
    │   ├── User
    │   └── Users
    ├── containers
    │   ├── Dashboard
    │   └── Form
    └── redux
        ├── Store.js
        ├── actions
        │   └── ReduxActions.js
        └── reducers
            └── ReduxReducers.js

```

## Thoughts

Zadanie było bardzo przyjemne. Mimo kilku trudności napotkanych przez konieczność oddzielenia zapytań API od podręcznej pamięci pracowało się przyjemnie. Czas poświęcony na projekt to między 3 a 4 godziny.

# Frontend

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
