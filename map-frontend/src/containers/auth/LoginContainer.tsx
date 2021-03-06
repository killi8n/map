import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import { authActions, Input } from 'store/modules/auth';
import { State } from 'store/modules';
import { withRouter } from 'react-router-dom';
import LoginForm from 'components/auth/LoginForm';

export interface RegisterContainerProps {
  AuthActions: typeof authActions;
  input: Input;
  history: any;
}

class RegisterContainer extends React.Component<RegisterContainerProps> {
  public handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { AuthActions } = this.props;
    AuthActions.changeInput({ name: e.target.name, value: e.target.value });
  };
  public render() {
    const { username, email, password, name } = this.props.input;

    return (
      <LoginForm
        version={'login'}
        username={username}
        email={email}
        password={password}
        name={name}
        onChangeInput={this.handleChangeInput}
      />
    );
  }
}

export default compose(
  withRouter,
  connect(
    ({ auth }: State) => ({
      input: auth.input,
    }),
    dispatch => ({
      AuthActions: bindActionCreators(authActions, dispatch),
    })
  )
)(RegisterContainer);
