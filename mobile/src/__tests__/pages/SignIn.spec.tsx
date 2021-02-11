import React from 'react';
import { render } from 'react-native-testing-library';
import SignIn from '../../pages/Signin';

describe('SignIn Page', () => {
  it('should contains email/password inputs', () => {
    const { getByPlaceholder } = render(<SignIn />);

    expect(getByPlaceholder('email')).toBeTruthy();
    expect(getByPlaceholder('Senha')).toBeTruthy();
  });
});
