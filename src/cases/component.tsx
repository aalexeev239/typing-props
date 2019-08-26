import React, { Component } from "react";

// ======================
// 1. Props vs interface?
// ======================
// @link https://github.com/typescript-cheatsheets/react-typescript-cheatsheet#types-or-interfaces
interface FooInterface {
  foo: string;
}

interface FooBarInterface extends FooInterface {
  bar: string;
}

type FooProps = {
  foo: string;
};

type FooBarProps = FooProps & {
  bar: string;
};

type BazProps = Pick<FooBarInterface, "foo"> & FooBarProps;

// =========================
// 2. typing React.Component
// =========================

type Example2Props = {
  foo: string;
};

type Example2State = {
  bar: string;
};

class Example2 extends Component<Example2Props, Example2State> {
  state = {
    bar: "bar"
  };

  // props - any
  // componentWillReceiveProps(props) {
  //   const { wat } = this.props;
  // }

  // good
  componentWillReceiveProps(props: Example2Props) {
    const { foo } = this.props;
  }

  render() {
    return "";
  }
}

const renderExample2 = () => <Example2 foo="123">Example2</Example2>;

// ===========
// 3. children
// ===========

type Example3Props = {
  foo: string;
  children?: never;
};

class Example3 extends Component<Example3Props> {
  render() {
    return this.props.foo;
  }
}

// error
// const renderExample3 = () => <Example3 foo='123'>Example2</Example3>
const renderExample3Fixed = () => <Example3 foo="123"></Example3>;

// ===============
// 4. defaultProps
// ===============

type Example4Props = {
  foo: { bar: string };
  default: string;
};

// 4_1 no types
class Example4_1 extends Component<Example4Props> {
  // bad, bad
  static defaultProps = {
    default: 123,
    lalala: ""
  };
}

// 4_2 use partial
class Example4_2 extends Component<Example4Props> {
  // also bad
  static defaultProps: Partial<Example4Props> = {
    default: "default"
  };

  render() {
    const {
      foo: { bar }
    } = this.props;

    return bar;
  }
}

// oops, foo is omitted – falls in runtime
const renderExample4_2 = () => <Example4_2></Example4_2>;

// 4_3 use combination with props
const defaultProps = {
  default: "default"
};

type Example4_3Props = typeof defaultProps & {
  foo: { bar: string };
};

class Example4_3 extends Component<Example4_3Props> {
  static defaultProps = defaultProps;

  render() {
    const {
      foo: { bar }
    } = this.props;

    return bar;
  }
}

// good, foo is required, default is optional
const renderExample4_3 = () => <Example4_3 foo={{ bar: "bar" }}></Example4_3>;

export default Example2;
