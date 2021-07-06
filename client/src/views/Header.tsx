import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

const Header = () => {
    const history = useHistory();
    const handleLink = (path: string) => history.push(path);
    return (
        <nav>
            <button onClick={() => handleLink('/')}>Home</button>
            <button onClick={() => handleLink('/cart-item')}>ショッピングカート</button>
            <button onClick={() => handleLink('/order-history')}>注文履歴</button>
        </nav>
    )
}

export default Header;