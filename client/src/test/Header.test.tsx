import React from 'react';
import { render, screen } from '@testing-library/react';
import Header from '../views/Header';
import {Provider} from 'react-redux';
import store from '../views/store'


describe('ヘッダーコンポーネントのテスト',() => {
    beforeEach(() => {
        render(
            <Provider store={store}>
                <Header />
            </Provider>
        )
    })

    test('Home', () => {
        expect(screen.getByText('Home')).toBeInTheDocument();
    })

    test('ログイン', () => {
        expect(screen.getByText('ログイン')).toBeInTheDocument()
    })

    test('新規登録', () => {
        expect(screen.getByText('新規登録')).toBeInTheDocument()
    })
})