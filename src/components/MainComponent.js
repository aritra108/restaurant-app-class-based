import React, { Component } from 'react';
import Home from './HomeComponent';
import Header from './HeaderComponent';
import Menu from './MenuComponent'; 
import Dishdetail from './DishdetailComponent';
import Contact from './ContactComponent';
import About from './AboutComponent';
import Footer from './FooterComponent';
import { DISHES } from '../shared/dishes';
import { COMMENTS } from '../shared/comments';
import { LEADERS } from '../shared/leaders';
import { PROMOTIONS } from '../shared/promotions';
import { Switch, Route, Redirect } from 'react-router-dom';

class Main extends Component {

  constructor(props) {
    super(props);

    this.state = {
      dishes: DISHES,
      comments: COMMENTS, 
      leaders: LEADERS, 
      promotions: PROMOTIONS
    };
  }

  render() {

    const DishWithId = ({ match }) => {
      return (
        <Dishdetail 
          dish = { this.state.dishes.filter(dish => dish.id === parseInt(match.params.dishId, 10))[0] }
          comments = { this.state.comments.filter(comment => comment.dishId === parseInt(match.params.dishId, 10)) }
        />
      );
    }

    const HomePage = () => {
      return (
        <Home 
          dish = { this.state.dishes.filter(dish => dish.featured === true)[0] }
          promotion = { this.state.promotions.filter(promo => promo.featured === true)[0] }
          leader = { this.state.leaders.filter(leader => leader.featured === true)[0] } 
        />
      );
    }

    const AboutPage = () => {
      return(
        <About leaders = { this.state.leaders }/>
      );
    }

    return (
      <div>
        <Header />
        <Switch>
          <Route path = '/home' component = {HomePage} />
          <Route exact path = '/menu' component = {() => <Menu dishes = {this.state.dishes} />} />
          <Route path = '/menu/:dishId' component = {DishWithId} />
          <Route exact path = '/contactus' component = {Contact} />
          <Route exact path = '/aboutus' component = {AboutPage} />
          <Redirect to = "/home" /> 
        </Switch>
        <Footer />
      </div>
    );
  }
  
}

export default Main;
