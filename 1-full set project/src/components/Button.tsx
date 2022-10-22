import React from 'react';

type ButtonPropsType = {
    name: string
    callBack: () => void
}
const Button = (props: ButtonPropsType) => {
    return (
        <>
            <button onClick={props.callBack}>{props.name}</button>
        </>
    );
};

export default Button;