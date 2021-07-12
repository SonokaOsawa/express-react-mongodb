import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { RootState } from './store'


const Header = () => {
    const history = useHistory();
    const handleLink = (path: string) => history.push(path);
    const user = useSelector((state:RootState) => state.user)

    return (
        <nav>
            <button onClick={() => handleLink('/')}>Home</button>
            <button onClick={() => handleLink('/cart-item')}>ショッピングカート</button>
            {user.login ? 
            <>
            <button onClick={() => handleLink('/order-history')}>注文履歴</button>
            <button>ログアウト</button>
            </>
            :
            <>
            <button onClick={() => handleLink('/login')}>ログイン</button>
            <button onClick={() => handleLink('/regist')}>新規登録</button>
            </>
            }
        </nav>
    )
}

export default Header;