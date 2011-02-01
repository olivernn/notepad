# NotePad

This is a Rails 3 application using html5 pushState with [Davis.js](http://github.com/olivernn/davis.js)
and [Mustache](http://mustache.github.com/) templates
via Poirot, take a look at it running [here](http://davis-example.heroku.com/notes).

The same partials are used client and server side to render the list of notes and the
note display area of the screen, mustache makes this possible.

All links are bound to by a Davis.js application which handles the requests from clicking
links and submitting forms client side.

The app should work equally well with or without JavaScript disabled, the JavaScript version
doesn't do any fancy animation so it might be hard to tell, but when enabled it is the Davis.js
application that it is taking care of rendering notes.

## Code

The interesting code is in the JavaScripts folder, start by looking at `app.js` which is
where the [Davis.js](http://github.com/olivernn/davis.js) app and its routes are defined.
A very simple view factory handles the client side templating using [Handlebars.js](https://github.com/wycats/handlebars.js)
and the Note model uses the excellent [js-model](http://benpickles.github.com/js-model/).

## Running Locally

To get the app running locally do the following

    bundle
    rake db:schema:load
    rails s
    open http://localhost:3000/notes
