// =======================
// 1. not hoc, but wrapper
// =======================

import React, { ComponentType, FC } from "react";
import { Subtract } from "utility-types/dist/mapped-types";

type WrappedProps = {
  wrapped: string;
};

const Wrapped: FC<WrappedProps> = ({ wrapped }) => <div>{wrapped}</div>;

type ExtendedProps = WrappedProps & {
  extend: string;
};

const Wrapper: FC<ExtendedProps> = ({ extend, ...otherProps }) => (
  <div>
    {extend}: <Wrapped {...otherProps} />
  </div>
);

// ======
// 2. hoc
// ======

type AdditionalProps = {
  additional: string;
};

type InjectedProps = {
  injected: string;
};

type AllProps = AdditionalProps & InjectedProps;

const hoc = <P extends AllProps>(WrappedComponent: ComponentType<P>) => {
  // class WithLoading extends React.Component<P & AdditionalProps> {
  class WithLoading extends React.Component<Subtract<P, InjectedProps>> {
    render() {
      const { additional, ...otherProps } = this.props;
      return (
        <WrappedComponent
          {...(otherProps as P)}
          injected="injected"
          additional="additional"
        />
      );
    }
  }

  return WithLoading;
};

type InnerProps = {
  inner: string;
  additional: string;
  injected: string;
};

const Inner: FC<InnerProps> = () => <div />;

const WithHoc = hoc(Inner);

const renderWithHoc = () => (
  <WithHoc inner="inner" additional="additional"></WithHoc>
);
