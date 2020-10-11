import React, { Component } from 'react';
import { Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle } from 'reactstrap';

class Dishdetail extends Component {

    constructor(props) {
        super(props);

        this.state = {

        };
    }

    renderDish(dish) {
        if (dish != null) {
            return (
                <Card>
                    <CardImg width = "100%" src = {dish.image}/>
                    <CardBody>
                        <CardTitle><strong>{dish.name}</strong></CardTitle>
                        <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>
            );
        } 
        else {
            return( <div></div> );
        }
    }

    renderComments(comments) {
        if (comments != null) {

            // Form an array of JSX comments 
            let count = 0;
            const dishComments = comments.map(dishComment => {
                return (
                    <ul key = {count++} className = "list-unstyled">
                        <li>{dishComment.comment}</li>
                        <li>--{dishComment.author}, {dishComment.date}</li>
                    </ul>
                );
            })
            return (
                <div>
                    <h4>Comments</h4>
                    {dishComments}
                </div>
            );
        } else {
            return <div></div>;
        }
    }

    render() {

        return (
            <div className = "row">
                {/* Details */}
                <div className = "col-12 col-md-5 m-1">
                    { this.renderDish(this.props.selectedDish) }
                </div>
                {/* Comments */}
                <div className = "col-12 col-md-5 m-1">
                    {
                        this.props.selectedDish !== null ? this.renderComments(this.props.selectedDish.comments) : <div></div>
                    }
                </div>
            </div>
        );
    }

}

export default Dishdetail;