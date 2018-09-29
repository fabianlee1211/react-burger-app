import React, { Component } from 'react';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import classes from './Auth.css';

class Auth extends Component {
  state = {
    controls: {
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Email Address'
        },
        value: '',
        validation: {
          required: true,
          isEmail: true
        },
        valid: false,
        touched: false
      },
      password: {
        elementType: 'input',
        elementConfig: {
          type: 'password',
          placeholder: 'Password'
        },
        value: '',
        validation: {
          required: true,
          minLength: 6
        },
        valid: false,
        touched: false
      }
    }
  }

  render() {
    const inputElements = [];
    for (let key in this.state.controls) {
      inputElements.push({
        id: key,
        config: this.state.controls[key]
      });
    }

    const form = inputElements.map(el => (
      <Input 
        key={el.id}
        elementType={el.config.elementType} 
        elementConfig={el.config.elementConfig} 
        value={el.config.value}
        invalid={!el.config.valid}
        shouldValidate={el.config.validation}
        touched={el.config.touched} 
        changed={(event) => this.inputChangedHandler(event, el.id)}
      />
    ));

    return (
      <div className={classes.Auth}>
        <form>
          { form }
          <Button btnType="Success">Submit</Button>
        </form>
      </div>
    );
  }
}

export default Auth;