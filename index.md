---
permalink: '/'
---

<div class="brand">
  <img src="/icon/vormulir-min.png" class="logo" alt="Vormulir logo">
  <h1>Vormulir</h1>

  A simple Vue Form helper to make form validation more easier.

  <div class="tag">v1.0.0</div>

</div>


## Installation

``` bash
npm i vormulir
# or
yarn add vormulir
```

----

## Usage

Import **Vormulir** in somewhere inside your Vue Component that contain the form.

``` js
import Vormulir from 'vormulir/core'
```

Make instance of **Vormulir** with array of form fields as the value.

``` js
const vormulir = new Vormulir([
  'name',
  'age'
])
```

----

## Features
### State Helper

Inject the state helper from **Vormulir** instance that you've already declared before to your Vue Component `data()` section using spread operator like so.

``` js
data () {
  return {
    // ...
    ...vormulir.state
    // ...
  }
}
```

this will give a structur of your vue state to something like this.

``` json
{
  "form": {
    "success": "",
    "loading": false,
    "field": {
      "name": "",
      "age": ""
    }
  },
  "errors": {
    "name": {
      "state": null,
      "message": ""
    },
    "age": {
      "state": null,
      "message": ""
    }
  }
}
```

----

### Validation

Let's move to the fun part, first before make a validation you must make an rules object about how your validator's work, this will be look like this.

``` js
const rules = {
  name: {
    required: "Name is required"
  },
  age: {
    required: "Age is required"
  }
}
```

In rules example above the `name` and `age` field is marked as required and followed with error message as it value.

After that, to start validating the `rules` you've created you can use `validate()` function from **vormulir**, it have 2 arguments, first is _input_ and the second is _rules object_, in real world may look like this;

``` js
const result = vormulir.validate(this.form.field, rules)
console.log(result)
```

The value of input is an object so you can use the current state (`this.form.field`) as input, and the return of `result` variable will be an object that have **passes** property contain _boolean value_ and **errors** property contain _errors object_ (same with errors object in vue state).

----

## Demo

Here are some live demo (source code of these example are located on <a href="https://github.com/bramaudi/vormulir/tree/master/docs/example" target="_blank">example folder</a> in repository.)

- <a href="basic.html" title="Basic Usage">Basic</a>