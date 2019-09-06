# jsx-no-react

```sh
yarn add jsx-no-react
```

## Usage

### Basic

The `jsx-no-react` package just defines a function to replace the `React.createElement`, so as well as importing the relevant function into scope where you want to use JSX:

```javascript
import jsxElem, { render } from "jsx-no-react";

function App(props) {
  return <div>Hello {props.name}</div>;
}

render(<App name="world" />, document.body);
```
or
```javascript
import jsxElem, { render } from "jsx-no-react";

function App(name) {
  return <div>Hello {name}</div>;
}

render(App('world'), document.body);
```

you'll also need to hook the `jsxElem` function into the JSX transformation, for which you should probably use [babel](https://www.npmjs.com/package/babel-plugin-transform-react-jsx), which you can install and setup fairly simply:

```sh
yarn add babel-plugin-transform-react-jsx babel-preset-env
```

and configure babel to correctly transform JSX with a `.babelrc` something like:

```json
{
  "presets": ["env"],
  "plugins": [
    [
      "transform-react-jsx",
      {
        "pragma": "jsxElem"
      }
    ]
  ]
}
```
### Component
#### Define
It's possible to define a component in different ways:
```javascript
function Hello(props) {
  return <h1>Hello {props.name}</h1>;
}

// anonymous Function
const Hello = function (props) {
  return <h1>Hello {props.name}</h1>;
}

// arrow function
const Hello = (props) => <h1>Hello {props.name}</h1>;

// simple element
const hello = <h1>Hello</h1>;
```
> **Always start component names with a capital letter.**

#### Rendering
When rendering a component, defined by user, JSX attributes will be passed as single object.
For example:
```javascript
import jsxElem, { render } from "jsx-no-react";

function Hello(props) {
  return <h1>Hello {props.name}</h1>;
}

render(<Hello name="world" />, document.body);
```


#### Composing Components
Components can be reused and combined together.
```javascript
import jsxElem, { render } from "jsx-no-react";

function Hello(props) {
  return <h1>Hello {props.name}</h1>;
}

const CustomSeparator = (props) => <i>{[...Array(props.dots)].map(idx => '.')}</i>;

function App() {
  return (
    <div>
      <Hello name="foo" />
      <CustomSeparator dots={50} />
      <Hello name="bar" />
    </div>
  );
}

render(<App />, document.body);
```

#### Event
It's possible add events listner to component using:
- camelCase (e.g. onClick)
- pass function as event handler

For example:
```javascript
function Hello(props) {
  return <h1>Hello {props.name}</h1>;
}

function App() {
  const click_handler = function (e) {
      alert('click function');
  };

  return (
    <div>
      <Hello onClick={() => alert('inline click function')} name="foo" />
      <Hello onClick={click_handler} name="bar" />
    </div>
  );
}
```

#### Embedding expressions in JSX
##### map()
```javascript
function Hello(props) {
  const names = props.names;

  return (
    <div>
      {names.map(name => <h1>Hello {name}</h1>)}
    </div>
  );
}

function App() {
  return (
    <div>
      <Hello names={['foo', 'bar']} />
    </div>
  );
}
```
##### Inline If with Logical && Operator

```javascript
function Hello(props) {
  return <h1>Hello {props.name}</h1>;
}

function App(){
  return (
    <div>
      {document.location.hostname === 'localhost' && <h1>Welcome to localhost</h1>}
      <Hello name="foo" />
      <Hello name="bar" />
    </div>
  );
}
```

#### Call a Function
```javascript
function Hello(props) {
  return <h1>Hello {props.name}</h1>;
}

const CustomSeparator = (props) => <i>{[...Array(props.dots)].map(idx => '.')}</i>;

function App() {
  return (
    <div>
      <Hello name="foo" />
      <CustomSeparator dots={50} />
      <Hello name="bar" />
      {CustomSeparator({dots: 10})}
    </div>
  );
}
```

####  Style
Object can be passed to the ```style``` attribute with keys in camelCase.
```javascript
import jsxElem, { render } from "jsx-no-react";

function Hello(props) {
  return <h1>Hello {props.name}</h1>;
}

function App() {
  return (
    <div>
      <Hello style={{backgroundColor: 'red'}} name="foo" />
      <Hello style={{backgroundColor: 'blue', color: 'white'}} name="bar" />
    </div>
  );
}

render(<App />, document.body);
```

## Acknowledgement

This package was originally developed by [Terry Kerr](https://github.com/dtkerr).
