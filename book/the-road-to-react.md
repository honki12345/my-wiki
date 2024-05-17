# the road to react

## react-pass-prosp-to-component

- <https://www.robinwieruch.de/react-pass-props-to-component/>
- props
  - It's also important to note that React's props are read only (immutable)
  - As a developer, you should never mutate props but only read them in your components
  - props are only used to pass data from a parent to a child component
  - props are just the vehicle to transport data down the component tree

## state

- <https://github.com/the-road-to-learn-react/the-road-to-react/blob/master/manuscript/react-modern/state.md>
- props vs state
  - props are used to pass information down the component hierarchy
  - state is used to modify information over time
- state
  - By using `useState`, we are telling React that we want to have a stateful value which changes over time
  - whenever this stateful value changes, the affected components will re-render to use it
- Q. What triggers a re-render in React?
  - A. State changes or prop udates can trigger a re-render in React.

## lifting-state

- The state should always be there where all components which depend on the state can read (via props) and update (via callback handler) it
- Q. Why would you lift state in React?
  - A. To share and manage state at a higher level, making it accessible to multiple child components
- Q. Is it necessary to lift all state to the top-level parent component?
  - A. No, only lift state to a level where it needs to be shared among multiple components

## controlled-components

- Q. What is controlled component in React
  - A. A controlled comonent is a component whose form elements are controlled by React state

## etc

- mount: first render of the component
- update: every re-render of the component

## react-ref

- <https://www.robinwieruch.de/react-ref/>
- Ref means just reference, so it can be a reference to anything (DOM node, JavaScript value, ...)
- The useRef Hook returns us a mutable object which stays intact over the lifetime of a React Component
  - Specifically, the returned object has a `current` property which can hold any modifiable value for us
  - The ref's `current` property gets initialized with the argument we provide for the useRef hook
  - it doesn't trigger a re-render whenever we change it
- ref's usage
  - **instance variable** for a function component
    - whenever you need to track state in your React component which shouldn't trigger a re-render of your component, you can use React's useRef Hooks to create an instance variable for it
  - DOM
    - interacting with the DOM with an imperative and not declarative approach
    - 1. we provide the ref object to the HTML element to the ref object
    - 2. DOM node is now assigned to the ref's current property
