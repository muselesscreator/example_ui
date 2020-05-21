import React from 'react';

import Component from '../Component';
import { Button  } from 'components';

import FormErrors from './FormErrors';

export class Demo extends Component {
  state = {
    showErrors: true,
    errors: [
      "Problem: a THING happened!",
      "Dilema: Did you SEE that?!?!",
    ]
  }
  toggleShow = () => this.setState({ showErrors: !this.state.showErrors });
  render() {
    const { showErrors, errors } = this.state;
    return (
      <div>
        <FormErrors
          className="gallery-errors"
          show={showErrors}
          errors={errors}
        />
        <Button onClick={this.toggleShow}>
          Toggle Errors
        </Button>
      </div>
    );
  }
}

export default Demo;
