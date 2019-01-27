---
layout: post
title: Refactor TodoMVC with Redux Starter Kit
date: '2019-01-26'
spoiler: How to make redux related code more readable.
draft: false
tags:
  - react
  - redux
---

I've been working with [React](https://reactjs.org/) more than two years now. I
started in a quite big project with a lot of work already done that was using
[Redux](https://redux.js.org/). I was a bit overwhelming start directly with so
much stuff done, especially with a framework I didn't know much about. But after
some time I got more comfortable and experienced.

Recently I discovered the project [Redux Starter Kit](https://redux-starter-kit.js.org/)
from the same team that works on Redux. It's a simple toolset that provides
utilities that can make really simple and easy work with Redux. In fact, one of
the tools it provides, `createReducer`, is a patter I've been using for a while
and it helps me a lot on reducing boilerplate code and speeding up my development
(especially in new projects).

So in order to learn more about and get comfortable using it, I decided to
migrate an already existing codebase with Redux, using this toolset. Obviously,
as an example project for a frontend framework, I picked the omnipresent
[TodoMVC](http://todomvc.com/), in concrete the version that Redux provides as
example in [his repository](https://github.com/reduxjs/redux/tree/master/examples/todomvc).

## Starting point

For whoever doesn't know how this app looks like in Redux, it has two main
reducers `visibilityFilter` and `todos`; both with his respective actions,
action creators and selectors.

## Visibility Filter

I started with the most "simple" reducer, to start small and then move to a more
complex state.

### Reducer

The reducer, as it came from the Redux example, it's already quite simple and
easy to understand.

```jsx
// reducers/visibilityFilter.js
import { SET_VISIBILITY_FILTER } from '../constants/ActionTypes';
import { SHOW_ALL } from '../constants/TodoFilters';

export default (state = SHOW_ALL, action) => {
  switch (action.type) {
    case SET_VISIBILITY_FILTER:
      return action.filter;
    default:
      return state;
  }
};
```

In order to create reducers Redux Starter Kit provides a function `createReducer`,
as I mentioned before it's a pattern I already used and I'm quite happy with it.

The idea is simple, instead of having to create a reducer function with a
`switch case` statement inside, this function expects the initial state as a
first parameter and an object where the keys are the action types and the value
are the reducers (`(state, action) => { /* reducer code */`) for this action.

It reduces some boilerplate and will set always the `default` statement as
`return state`. But to me, the biggest benefit is the readability that provides.

This is how the visibility filter reducer looks like using `createReducer`:

```jsx
// reducers/visibilityFilter.js
import { createReducer } from 'redux-starter-kit';
import { SET_VISIBILITY_FILTER } from '../constants/ActionTypes';
import { SHOW_ALL } from '../constants/TodoFilters';

export default createReducer(SHOW_ALL, {
  [SET_VISIBILITY_FILTER]: (state, action) => action.filter
});
```

### Actions creators

Now is time for the actions. The visibility filter only has one action
`SET_VISIBILITY_FILTER` and the creator is very simple:

```jsx
// actions/index.js
import * as types from '../constants/ActionTypes';

/* ... Other actions ...*/
export const setVisibilityFilter = filter => ({
  type: types.SET_VISIBILITY_FILTER,
  filter
});
```

For the actions, this toolset can be quite opinionated. It provides the function
`createAction` that only expects the action type as a parameter. As a result,
we get an action creator.

```jsx
// actions/index.js
import * as types from '../constants/ActionTypes';

/* ... Other actions ...*/
export const setVisibilityFilter = createAction(types.SET_VISIBILITY_FILTER);
```

This action creator can be run with or without parameters. In the case that we
send a parameter, this will be set as the payload of the action. These are some
examples of how will work:

```jsx
const setVisibilityFilter = createAction('SET_VISIBILITY_FILTER');

let action = setVisibilityFilter();
// { type: 'SET_VISIBILITY_FILTER' }

action = setVisibilityFilter('SHOW_COMPLETED');
// returns { type: 'SET_VISIBILITY_FILTER', payload: 'SHOW_COMPLETED' }

setVisibilityFilter.toString();
// 'SET_VISIBILITY_FILTER'
```

So now the filter is set into the `payload` key of the action, this implies a
refactor on the reducer since we were using the key filter, but luckily is
very simple to change.

```jsx
// reducers/visibilityFilter.js
import { createReducer } from 'redux-starter-kit';
import { SET_VISIBILITY_FILTER } from '../constants/ActionTypes';
import { SHOW_ALL } from '../constants/TodoFilters';

export default createReducer(SHOW_ALL, {
  [SET_VISIBILITY_FILTER]: (state, action) => action.payload
});
```

### Selectors

For me using selectors is one of the best choices that anyone can take when
working with React, because it makes really simple refactor how the state looks
like without having to change all the components that are consuming this part
of the state.

The selector of the visibility filter is one of the easiest ones:

```jsx
// selectors/index.js
const getVisibilityFilter = state => state.visibilityFilter;

/* ... Other selectors ...*/
```

And it doesn't change too much using the function `createSelector`. Actually,
we have more code now than with the previous version, but trust me it's going
to be simpler. Just keep reading.

```jsx
// selectors/index.js
import { createSelector } from 'redux-starter-kit';

const getVisibilityFilter = createSelector(['visibilityFilter']);

/* ... Other selectors ...*/
```

### Slices

Until now the only thing that we did is changing some simple functions to more
simple functions using different _creators_. But now is where I discovered the
real power of the toolset: `createSlice`.

`createSlice` is a function that accepts an initial state, an object full of
reducer functions, and optionally a "slice name", and automatically generates
action creators, action types, and selectors ready to be used.

Now we can throw all the code that we did.

Creating a slice for the visibility filter is very clean and easy to understand,
and since we can throw all the previous code that we refactor the final result
it's removing a lot of boilerplate.

```jsx
// ducks/visibilityFilter.js
import { createSlice } from 'redux-starter-kit';

export default createSlice({
  slice: 'visibilityFilter',
  initialState: SHOW_ALL,
  reducers: {
    setVisibilityFilter: (state, action) => action.payload
  }
});
```

Now we have a single object as a result containing all that we need to work
properly with Redux. This is how it can be used:

```jsx
const reducer = combineReducers({
  visibilityFilter: visibilityFilter.reducer
});

const store = createStore(reducer);

store.dispatch(visibilityFilter.actions.setVisibilityFilter(SHOW_COMPLETED));
// -> { visibilityFilter: 'SHOW_COMPLETED' }

const state = store.getState();
console.log(visibilityFilter.selectors.getVisibilityFilter(state));
// -> SHOW_COMPLETED
```

All the changes did until now are in [this commit](https://github.com/magarcia/todomvc-redux-starter-kit/commit/ae78e0aacd4827786a63f29db4d6f4e0a2079422).

## Todos

The todos reducer is more complex so I'm not going to show the refactor step by
step. Instead, I'm going to explain how the final result looks like, but if you
are interested in see directly the final result is [here](https://github.com/magarcia/todomvc-redux-starter-kit/blob/ba531a2ea7c2c5ee8148e2a1ab491e7e0a31e819/src/ducks/todos.js).

The first part is defining the initial state:

```jsx
// ducks/todos.js
const initialState = [
  {
    text: 'Use Redux',
    completed: false,
    id: 0
  }
];
```

In order to make the slice creation more readable, I extracted the different
reducer actions in different functions:

```jsx
// ducks/todos.js
const addTodo = (state, action) => [
  ...state,
  {
    id: state.reduce((maxId, todo) => Math.max(todo.id, maxId), -1) + 1,
    completed: false,
    text: action.payload.text
  }
];

const deleteTodo = (state, action) => state.filter(todo => todo.id !== action.payload.id);

const editTodo = (state, action) =>
  state.map(todo =>
    todo.id === action.payload.id ? { ...todo, text: action.payload.text } : todo
  );

const completeTodo = (state, action) =>
  state.map(todo =>
    todo.id === action.payload.id ? { ...todo, completed: !todo.completed } : todo
  );
const completeAllTodos = state => {
  const areAllMarked = state.every(todo => todo.completed);
  return state.map(todo => ({
    ...todo,
    completed: !areAllMarked
  }));
};

const clearCompleted = state => state.filter(todo => todo.completed === false);
```

And now we can put all together in a new slice:

```jsx
// ducks/todos.js
const todos = createSlice({
  slice: 'todos',
  initialState,
  reducers: {
    add: addTodo,
    delete: deleteTodo,
    edit: editTodo,
    complete: completeTodo,
    completeAll: completeAllTodos,
    clearCompleted: clearCompleted
  }
});
```

By default the selectors returned by `createSlice` are very simple, they just
return the value from the state (eg: `todos.selectors.getTodos`). But in this
application, we need to define more complex selectors.

For example, `getVisibleTodos` needs two know about the current visibility filter
and also the todos. `createSelector` gets as a first parameter an array with
strings (the path to select from the state) or other selectors and as a second
parameter the function that's going to implement the logic that we want to
select the todos based on the selected filter.

```jsx
// ducks/todos.js
const { getVisibilityFilter } = visibilityFilter.selectors;

todos.selectors.getVisibleTodos = createSelector(
  [getVisibilityFilter, todos.selectors.getTodos],
  (visibilityFilter, todos) => {
    switch (visibilityFilter) {
      case SHOW_ALL:
        return todos;
      case SHOW_COMPLETED:
        return todos.filter(t => t.completed);
      case SHOW_ACTIVE:
        return todos.filter(t => !t.completed);
      default:
        throw new Error('Unknown filter: ' + visibilityFilter);
    }
  }
);

todos.selectors.getCompletedTodoCount = createSelector(
  [todos.selectors.getTodos],
  todos => todos.reduce((count, todo) => (todo.completed ? count + 1 : count), 0)
);
```

As you can notice in the previous code, I created the new selectors in the
`selectors` object in the `todos` slice so now we have all the selectors
accessible in the same place.

## Create Store

The last two functions provided by the library are `configureStore` and
`getDefaultMiddleware`.

`configureStore` is an abstraction over the standard Redux `createStore`
function. Doesn't provide more functionalities than `createStore` but it makes
things easier to read, like enable developer tools that is just a boolean.

`getDefaultMiddleware` returns a list of middlewares
`[immutableStateInvariant, thunk, serializableStateInvariant]` in development
and `[thunk]` in production.

- `redux-immutable-state-invariant`: It can detect mutations in reducers during
  a dispatch, and also mutations that occur between dispatches (eg: in selectors
  or components).
- `serializable-state-invariant-middleware`: It deeply checks your state tree
  and your actions for non-serializable values such as functions, Promises, etc.

```jsx
// store.js
import { configureStore, getDefaultMiddleware } from 'redux-starter-kit';
import { combineReducers } from 'redux';
import { visibilityFilter, todos } from './ducks';

const preloadedState = {
  todos: [
    {
      text: 'Use Redux',
      completed: false,
      id: 0
    }
  ]
};

const reducer = combineReducers({
  todos: todos.reducer,
  visibilityFilter: visibilityFilter.reducer
});

const middleware = [...getDefaultMiddleware()];

export const store = configureStore({
  reducer,
  middleware,
  devTools: process.env.NODE_ENV !== 'production',
  preloadedState
});
```

## Final thoughts

Redux Starter Kit looks interesting, it reduces boilerplate code making the code
cleaner and easy to understand. But also it makes really fast to develop new
code.

Source Code: https://github.com/magarcia/todomvc-redux-starter-kit
