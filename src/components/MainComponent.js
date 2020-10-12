import React, { Component } from 'react';
import Header from './HeaderComponent';
import Menu from './MenuComponent'; 
import Dishdetail from './DishdetailComponent';
import Footer from './FooterComponent';
import { DISHES } from '../shared/dishes';

class Main extends Component {

  constructor(props) {
    super(props);

    this.state = {
      dishes: DISHES, 
      selectedDishId: null
    };
  }

  onDishSelect(dishId) {
    this.setState({ selectedDishId: dishId });
  }

  render() {

    return (
      <div>
        <Header />
        <Menu dishes = { this.state.dishes } onClick = { dishId => this.onDishSelect(dishId) } />
        <Dishdetail selectedDish = { this.state.dishes.filter(dish => dish.id === this.state.selectedDishId)[0] } />
        <Footer />
      </div>
    );
  }
  
}

export default Main;
