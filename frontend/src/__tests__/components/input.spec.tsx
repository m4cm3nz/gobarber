import { fireEvent, render, waitFor } from '@testing-library/react';
import React from 'react';
import Input from '../../components/Input';

jest.mock('@unform/core', () => {
  return {
    useField() {
      return {
        fieldName: 'email',
        defaultValue: '',
        error: '',
        registerField: jest.fn(),
      };
    },
  };
});

describe('Input Component', () => {
  it('should be able to render an input', () => {
    const { getByPlaceholderText } = render(
      <Input name="email" placeholder="email" />,
    );
    expect(getByPlaceholderText('email')).toBeTruthy();
  });

  it('should highlight when focused', async () => {
    const { getByPlaceholderText, getByTestId } = render(
      <Input name="email" placeholder="email" />,
    );

    const inputElement = getByPlaceholderText('email');
    const containerElement = getByTestId('input-container');

    fireEvent.focus(inputElement);

    await waitFor(() => {
      expect(containerElement).toHaveStyle('border-color: #ff9000;');
      expect(containerElement).toHaveStyle('color: #ff9000;');
    });
  });

  it('should keep highlighted on blur when filled-up', async () => {
    const { getByPlaceholderText, getByTestId } = render(
      <Input name="email" placeholder="email" />,
    );

    const inputElement = getByPlaceholderText('email');
    const containerElement = getByTestId('input-container');

    fireEvent.change(inputElement, {
      target: { value: 'jhondoe@exemple.com' },
    });

    fireEvent.blur(inputElement);

    await waitFor(() => {
      expect(containerElement).toHaveStyle('color: #ff9000;');
    });
  });

  it('should remove highlight on blur when empty', () => {});

  it('should be able to display optional default values', () => {});

  it('should be able to display an error alert when errored', () => {});

  it('should be able to display an optional icon', () => {});
});
