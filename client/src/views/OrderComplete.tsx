import React, {useEffect} from "react";
import {useHistory, BrowserRouter as Router, Switch, Route, Redirect, Link} from 'react-router-dom';

const OrderComplete = () => {
    const history = useHistory();
    const handleLink = (path: string) => history.push(path);
    return (
        <React.Fragment>
            <h2>決済が完了しました！</h2>
            <p>この度はご注文ありがとうございます。</p>
            <p>ご入力いただいたメールアドレス宛に注文完了メールを送信しました。</p>
            <p>メールが届かない場合は「注文履歴」からご確認ください。</p>
            <button onClick={() => handleLink('/')}>ホーム画面へ戻る</button>
        </React.Fragment>
    )
}

export default OrderComplete