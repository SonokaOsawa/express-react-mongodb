import React from 'react';
import { render, screen } from '@testing-library/react';
import Home from '../views/Home';
import {Provider} from 'react-redux';
import store from '../views/store'
import userEvent from '@testing-library/user-event';

describe('Homeのテスト', () => {
    beforeEach(() => {
        render(
            <Provider store={store}>
                <Home/>
            </Provider>
        )
    })

    test('検索textfield', () => {
        expect(screen.getByRole('textbox')).toBeInTheDocument();
    })
    test('検索アイコンボタン', () => {
        expect(screen.getByRole('button')).toBeInTheDocument();
    })
    test('検索フィールドに入力する', () => {
        userEvent.type(screen.getByRole('textbox'), 'サンド');
        expect(screen.getByRole('textbox')).toHaveDisplayValue('サンド');
    })
})