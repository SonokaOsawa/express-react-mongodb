import React from 'react';
import { render, screen } from '@testing-library/react';
import Regist from '../views/Regist';
import {Provider} from 'react-redux';
import store from '../views/store';

describe('Registコンポーネントのテスト', () => {
    beforeEach(() => {
        render(
            <Provider store={store}>
                <Regist/>
            </Provider>
        )
    })

    test('メールアドレス入力欄', () => {
        expect(screen.getByRole("textbox", {name:"メールアドレス"})).toBeInTheDocument();
    })
    test('パスワード入力欄', () => {
        expect(screen.getByRole("textbox", {name:"パスワード"})).toBeInTheDocument();
    })
    test('新規登録ボタン', () => {
        expect(screen.getByRole('button')).toBeInTheDocument();
    })
})