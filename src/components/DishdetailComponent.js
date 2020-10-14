import React from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';

const Dishdetail = props => {
    if (props.dish != null) {
        return (
            <div className = "container">
                <Breadcrumb>
                    <BreadcrumbItem><Link to = '/menu'>Menu</Link></BreadcrumbItem>
                    <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                </Breadcrumb>

                <div className = "col-12">
                    <h3>{props.dish.name}</h3>
                    <hr />
                </div>

                <div className = "row">
                    <div className = "col-12 col-md-5 m-1">
                        <RenderDish dish = {props.dish} />
                    </div>
                    <div className = "col-12 col-md-5 m-1"> 
                        <RenderComments comments = {props.comments}/>
                    </div>
                </div>
            </div>
            
        );
    }
    else {
        return <div></div>;
    }
}

function RenderDish( {dish} ) {
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

function RenderComments( {comments} ) {
    if (comments != null) {
        let count = 0;
        const dishComments = comments.map(dishComment => {
            return (
                <ul key = {count++} className = "list-unstyled">
                    <li><p>{dishComment.comment}</p></li>
                    <li> <p>--{dishComment.author}, { new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day : '2-digit'}).format(new Date(Date.parse(dishComment.date))) } </p></li>
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

export default Dishdetail;