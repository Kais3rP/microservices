# Simple Microservices

A simple Server built on Node.js + Express.js using MongoDB and Mongoose.js to manage database.


## How to use

### URL shortener

The first service is a URL minifier, it records the url on a database, creates a redirect, and returns
the redirect URL when you hit the generated endpoint and it has a match on the database. 

### IP Address Revealer

A simple service that retrieves the IP address of the visitor and shows it.

### Get the size of a file

A simple service that let you upload a file on the server, and retrieve its size.

## How to customize

On the front-end,

- Edit `views/index.html` to change the content of the webpage
- `public/script.js` is the javacript that runs when you load the webpage
- `public/style.css` is the styles for `views/index.html`
- Drag in `assets`, like images or music, to add them to your project

On the back-end,

- the app starts at `server.js`


## Built and deployed on [Glitch](https://glitch.com/)

**Glitch** is the friendly community where you'll build the app of your dreams. Glitch lets you instantly create, remix, edit, and host an app, bot or site, and you can invite collaborators or helpers to simultaneously edit code with you.

Find out more [about Glitch](https://glitch.com/about).

( ᵔ ᴥ ᵔ )