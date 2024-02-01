# Kultur Ausstellungsplattform project for DCI_fbw_wd22_d10

## Technologies Used

- ReactJS
- Vite
- NodeJS
- SASS
- axios
- mui-material
- react-router-dom
- react-icons
- react-bootstrap
- react-datepicker
- react-dom
- react-router-dom
- emotion/react
- emotion/styled

## Project Description

- This is a project for the Kultur Ausstellungsplattform. It is a platform for events to be sheen widowt need to go on evri event holder.
- The project is a full-stack application with a frontend and a backend part. The frontend is built with React and the backend with Node.js and Express.js. The database is MongoDB.
- The frontend is deployed on Render.com and the backend on Cyclic.sh.
- The frontend is a single-page application with 3 main pages: Home, Event and Autentification. 
- The Home page is the landing page with a 9 Events with short description. 
- The Artists Info shows in all the events in the event details page. 
- The Artworks page shows all the artworks in the database. 
- The user can click on an event or an artwork to see more details. 
- The user can also filter for an event or an artwork by name. 
- The user can register and login to the platform for organization to post events. 

## Project Links

- [Website][Website]

- [Frontend GitHub Repo][GitHub-frontend]

- [Frontend Render Deployment][Render]

- [Backend GitHub Repo][GitHub-backend]

- [Backend cyclik Deployment][cyclik]

## User Stories

- As a user, I want to be able to see all the events in the database.
- As a user, I want to be able to see all the events in the database.
- As a user, I want to be able to see more details about an Event and location.
- As a user, I want to be able to filter for an date or an event type and Venue.
- As a user, I want to be able to not register and login to the platform for event to seack.

### MVP

- Create a frontend with ReactJS wit Vite.
- Create a backend with Node.js and Express.js.
- Create a database with MongoDB.
- Create a landing page Events page with 9 event teat are curent ongoing.
- Create a page with more details about an events.
- Create a filter bar to filter for an date range or an event type or event Vemue.
- Create a register page to register to the platform for promoters to post events.
- Create a login page to login to the platform.
- Create a page to add an events to the database.
- Create a page to overview all the events posted by the organization.
- Create a page to edit an event in the database.
- Create a page to desable an event from the database.
- Create a rutin to desable an event from the database after the event date.
- Create a rutin to be able to delete an event from the database after the event date.

## Components

| Component                | Description                                                                                    |
| ------------------------ | :--------------------------------------------------------------------------------------------: |
| EventOverview            | This component shows all the events in the database.                                           |
| RegisterForm             | This component is a form to register to the platform.                                          |
| RegisterOrganizationForm | This component is a form to register to the platform as an organization.                       |
| LoginForm                | This component is a form to login to the platform.                                             |
| LogOutScreen             | This component is a button to logout from the platform.                                        |
| AddEventForm             | This component is a form to add an event to the database.                                      |
| ContactForm              | This component is a form to contact the platform.                                              |
| EventDetails             | This component shows more details about an event.                                              |
| EventFilter              | This component is a filter bar to filter for an date range or an event type or event location. |
| UserTable                | This component shows all the users in the database.                                            |
| UserInformation          | This component shows more details about an user.                                               |
| EditEventForm            | This component is a form to edit an event in the database.                                     |

## Timeframes for 5 people team

| Component                                                                                     | Priority | Estimated Time | Time Invested | Actual Time |
| --------------------------------------------------------------------------------------------- | :------: | :------------: | :-----------: | :---------: |
| Create a backend with Node.js and Express.js                                                  | H        | 160h           | 160h          | 160h        |
| Create a database with MongoDB                                                                | H        | 4h             | 3h            | 3h          |
| Create a frontend with React                                                                  | H        | 3h             | 3h            | 3h          |
| Create a EventOverview page with all the events in the database                               | H        | 3h             | 3h            | 3h          |
| Create a RegisterForm page to register to the platform                                        | H        | 3h             | 3h            | 3h          |
| Create a RegisterOrganizationForm page to register to the platform as an organization         | H        | 3h             | 3h            | 3h          |
| Create a LoginForm page to login to the platform                                              | H        | 3h             | 3h            | 3h          |
| Create a LogOutScreen page to logout from the platform                                        | H        | 3h             | 3h            | 3h          |
| Create a AddEventForm page to add an event to the database                                    | H        | 3h             | 3h            | 3h          |
| Create a ContactForm page to contact the platform                                             | H        | 3h             | 3h            | 3h          |
| Create a EventDetails page to show more details about an event                                | H        | 3h             | 3h            | 3h          |
| Create a EventFilter page to filter for an date range or an event type or event location      | H        | 30h            | 30h           | 30h         |
| Create a UserTable page to show all the users in the database                                 | H        | 2h             | 2h            | 2h          |
| Create a UserInformation page to show more details about an user                              | H        | 0h             | 0h            | 0h          |
| Create a SCSS style for the frontend                                                          | H        | 3h             | 3h            | 3h          |
| Create a EditEventForm page to edit an event in the database                                  | H        | 3h             | 3h            | 3h          |
| Requerments engineering                                                                       | H        | 3h             | 3h            | 3h          |
| Testig and bug fixing                                                                         | H        | 3h             | 3h            | 3h          |
| Total work hours                                                                              | H        | 550h           | 550h          | 550h        |

## .env sample

- VITE_API_BASE_URL= base url for the backend like http://localhost:5000/api/v1

## Additional Libraries

- [React Router](https://reactrouter.com/web/guides/quick-start)
- [React Bootstrap](https://react-bootstrap.github.io/)
- [React Icons](https://react-icons.github.io/react-icons/)
- [Axios](https://www.npmjs.com/package/axios)
- [Mongoose](https://mongoosejs.com/)
- [Bcrypt](https://www.npmjs.com/package/bcrypt)
- [Jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)
- [Dotenv](https://www.npmjs.com/package/dotenv)


    

[Website]: https://kulturinblick.onrender.com/
[GitHub-frontend]: https://github.com/NAMASTECH/Kultur-Ausstellungsplattform-frontend
[GitHub-backend]: https://github.com/NAMASTECH/Kultur-Ausstellungsplattform-backend
[cyclik]: https://app.cyclic.sh/#/join/drescamarian
[Render]: https://dashboard.render.com/register?next=%2F