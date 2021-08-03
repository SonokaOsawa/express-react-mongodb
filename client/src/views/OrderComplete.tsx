import React from "react";
import {useHistory} from 'react-router-dom';
import { Box } from '@material-ui/core';

const OrderComplete = () => {
    const history = useHistory();
    const handleLink = (path: string) => history.push(path);
    return (
        <Box mt={10}>
            <h2>決済が完了しました！</h2>
            <p>この度はご注文ありがとうございます。</p>
            <p>ご入力いただいたメールアドレス宛に注文完了メールを送信しました。</p>
            <p>メールが届かない場合は「注文履歴」からご確認ください。</p>
            <button onClick={() => handleLink('/')}>ホーム画面へ戻る</button>
        </Box>
    )
}

export default OrderComplete