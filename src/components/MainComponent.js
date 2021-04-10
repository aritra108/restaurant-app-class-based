import React, { Component } from 'react';
import Home from './HomeComponent';
import Header from './HeaderComponent';
import Menu from './MenuComponent'; 
import Dishdetail from './DishdetailComponent';
import Contact from './ContactComponent';
import About from './AboutComponent';
import Footer from './FooterComponent';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { postComment, fetchDishes, fetchComments, fetchPromos, fetchLeaders, postFeedback } from '../redux/ActionCreators';
import { actions } from 'react-redux-form';

const mapStateToProps = state => { // Maps the state received from the Redux Store to the props of the current Component 
  return {
    dishes: state.dishes, 
    comments: state.comments, 
    leaders: state.leaders,
    promotions: state.promotions
  };
}

const mapDispatchToProps = dispatch => ({
  postComment: (dishId, rating, author, comment) => dispatch(postComment(dishId, rating, author, comment)),
  fetchDishes: () => { dispatch(fetchDishes()) },
  fetchComments: () => { dispatch(fetchComments()) } ,
  fetchPromos: () => { dispatch(fetchPromos()) } ,
  fetchLeaders: () => { dispatch(fetchLeaders()) },
  resetFeedbackForm: () => { dispatch(actions.reset('feedback')) },
  postFeedback: (firstname, lastname, telnum, email, agree, contactType, message) => { dispatch(postFeedback(firstname, lastname, telnum, email, agree, contactType, message)) }
})

class Main extends Component {

  componentDidMount() { // Lifecycle Method - Called just after the Main Component is mounted 
    this.props.fetchDishes();
    this.props.fetchComments();
    this.props.fetchPromos();
    this.props.fetchLeaders();
  }

  render() {

    const DishWithId = ({ match }) => {
      return (
        <Dishdetail 
          dish = { this.props.dishes.dishes.filter(dish => dish.id === parseInt(match.params.dishId, 10))[0] }
          isLoading = {this.props.dishes.isLoading}
          errMess = {this.props.dishes.errMess}
          comments = { this.props.comments.comments.filter(comment => comment.dishId === parseInt(match.params.dishId, 10)) }
          commentsErrMess = { this.props.comments.errMess }
          postComment = { this.props.postComment }
        />
      );
    }

    const HomePage = () => {
      return (
        <Home 
          dish = { this.props.dishes.dishes.filter(dish => dish.featured === true)[0] }
          dishesLoading = {this.props.dishes.isLoading}
          dishesErrMess = {this.props.dishes.errMess}
          promotion = { this.props.promotions.promotions.filter(promo => promo.featured === true)[0] }
          promosLoading = {this.props.promotions.isLoading}
          promosErrMess = { this.props.promotions.errMess }
          leader = { this.props.leaders.leaders.filter(leader => leader.featured === true)[0] } 
          leadersLoading = { this.props.leaders.isLoading }
          leadersErrMess = { this.props.leaders.errMess }
        />
      );
    }

    const AboutPage = () => {
      return(
        <About 
          leaders = { this.props.leaders.leaders }
          isLoading = { this.props.leaders.isLoading }
          errMess = { this.props.leaders.errMess }
        />
      );
    }

    return (
      <div>
        <Header />
            <Switch>
              <Route path = '/home' component = {HomePage} />
              <Route exact path = '/menu' component = {() => <Menu dishes = {this.props.dishes} />} />
              <Route path = '/menu/:dishId' component = {DishWithId} />
              <Route exact path = '/contactus' component = {() => <Contact resetFeedbackForm = {this.props.resetFeedbackForm} postFeedback = {this.props.postFeedback} />} />
              <Route exact path = '/aboutus' component = {AboutPage} />
              <Redirect to = "/home" /> 
            </Switch>
        <Footer />
      </div>
    );
  }
  
}

// Connecting the Main component to the Redux store
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
