# Getting Started with GitHubSearcher

This is my own visualization for the task required.

## What to expect from this application

it's a github searcher that has a simple form, the user types in the text field and specifies the target `users/repositories`, after `3 letters` the application makes a request for the desired data.
The user can then visit the repository's page or the user's profile.

the data will be `cached` and the user will access it whenever he types the same query.

if an `error occured` there will be an `error screen` with a `retry action` in order to not force the user to type his desired query again.

if the request returns `zero items`, there will be an `empty screen` informing the user of that.

## Technologies used

- React
- React-Router
- React-Redux
- React-Redux-toolkit
- Redux-Persist
- axios
- lodash
- React-Testing-library

## Explaining the solutions

# Caching

I used the value of the text field and the value of the select and concatenated them into one `unique` key for eatch search result, example `repository-value`, `user-value`.

With that key we could now persist the data and fetch it again if existed.

Used `session storage` for cached data to be deleted after session is done, if we used `localstorage` it will excceed the `quota` at some point

`hint`: I believe we could have used [axios-cache-adapter](https://www.npmjs.com/package/axios-cache-adapter) for caching, this would have made the whole use for redux and redux-persist redundant in our case.

# Debouncing

used `_.debounce`, and made sure the debounce is after the `loading state` is fired for better ux.

# Retry for error

implemented a custom-hook for retrying when a request fails

# redux-toolkit

I perferred using redux-toolkit as it provids a `boilerplate` out of the box for all redux utilities, helps keeping our code clean and simple.

# react-testing-liberary

used it to test some cases instead of enzyme as it only cares for what the user is supposed to see as apposing to how he interacts with the application, also enzyme is not compatible with react 17 :D.

# scss-modules

I had a choice between scss-modules and css-in-js and there was no huge edge case that would make me use css-in-js
