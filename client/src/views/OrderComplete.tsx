import React from "react";
import {useHistory} from 'react-router-dom';
import { Box, Button } from '@material-ui/core';

const OrderComplete = () => {
    const history = useHistory();
    const handleLink = (path: string) => history.push(path);
    return (
        <Box mt={10} textAlign="center">
            <h2>決済が完了しました！</h2>
            <p>この度はご注文ありがとうございます。</p>
            <p>「注文履歴」からご確認ください。</p>
            <Button onClick={() => handleLink('/')} variant="outlined">ホーム画面へ戻る</Button>
        </Box>
    )
}

export default OrderComplete