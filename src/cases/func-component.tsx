import React, { FC } from "react";

// ==================
// 1. typing React.FC
// ==================

type Example1Props = {
  foo: string;
};

const Example1: FC<Example1Props> = props => {
  const { foo } = props;

  return <div>{foo}</div>;
};

const renderExample1 = () => <Example1 foo="foo" />;

// ===============
// 2. defaultProps
// ===============

type Example2Props = {
  foo: string;
  deflt?: string; // not required
};

// bad – default isnt validated
const Example2_1: FC<Example2Props> = ({ foo, deflt = 123 }) => {
  return (
    <div>
      {foo}
      {deflt}
    </div>
  );
};

// good – default is validated
const Example2_2: FC<Example2Props> = ({ foo, deflt = '123' }: Example2Props) => {
    return (
        <div>
            {foo}
            {deflt}
        </div>
    );
};

const renderExample2_2 = () => <Example2_2 foo="foo">Example2_2</Example2_2>;

// ===============
// 3. no FC generic
// ===============

type Example3Props = {
    foo: string;
    deflt?: string;
};

const Example3 = ({ foo, deflt = '123' }: Example3Props) => {
    return (
        <div>
            {foo}
            {deflt}
        </div>
    );
};

// error – children not mentioned
// const renderExample3 = () => <Example3 foo="foo">Example3</Example3>;
const renderExample3Fixed = () => <Example3 foo="foo"></Example3>;
