import React from 'react';
import { Card, CardImg, CardImgOverlay, CardTitle } from 'reactstrap';

function RenderMenuItem({dish, onClick}) { // dish and onClick are properties of the props - Functional Component 
    return (
        <Card onClick = { () => onClick(dish.id) }>
            <CardImg width = "100%" src = {dish.image} alt = {dish.name} />
            <CardImgOverlay>
                <CardTitle>{dish.name}</CardTitle>
            </CardImgOverlay>
        </Card>
    );
}

const Menu = props => { // ES6 Functional Component 
    const menu = props.dishes.map(dish => {
        return (
            <div key = {dish.id} className = "col-12 col-md-5 m-1">
                <RenderMenuItem dish = {dish} onClick = {props.onClick} />
            </div>
        );
    });

    return (
        <div className = "container">
            <div className = "row">
                {menu}
            </div>
        </div>
    );
}

export default Menu;