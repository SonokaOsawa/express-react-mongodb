import React from 'react';
import { render, screen } from '@testing-library/react';
import Login from '../views/Login';
import {Provider} from 'react-redux';
import store from '../views/store';

describe('Loginコンポーネントのテスト', () => {
    beforeEach(() => {
        render(
            <Provider store={store}>
                <Login/>
            </Provider>
        )
    })

    test('メールアドレス入力欄', () => {
        expect(screen.getByRole('textbox', {name:"メールアドレス"})).toBeInTheDocument();
    })

    test('パスワード入力欄', () => {
        expect(screen.getByRole('textbox', {name:"パスワード"})).toBeInTheDocument();
    })

    test('ログインボタン', () => {
        expect(screen.getByRole('button')).toBeInTheDocument();
    })
})