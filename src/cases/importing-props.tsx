// ==================
// 1. importing props
// ==================

import { Component, ComponentProps } from 'react';

// no need to export props, just import component type
type ExampleComponentType = typeof import('./component').default;
type Props = ComponentProps<ExampleComponentType>;

class Example1 extends Component<Props> {
    render() {
        return this.props.foo;
    }
}

// lifehack
// if so, no need to name props like <%ComponenName%>Props. Just "Props" will be enough.
