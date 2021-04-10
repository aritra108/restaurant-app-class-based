import * as ActionTypes from './ActionTypes';
import { baseUrl } from '../shared/baseUrl';

export const addComment = (comment) => ({
    type: ActionTypes.ADD_COMMENT,
    payload: comment
});

export const postComment = (dishId, rating, author, comment) => dispatch => {
    const newComment = {
        dishId: dishId,
        rating: rating,
        author: author,
        comment: comment,
    }
    newComment.date = new Date().toISOString();

    return fetch(baseUrl + 'comments', {
        method: 'POST',
        body: JSON.stringify(newComment),
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'same-origin'
    })
        .then(response => {
            if (response.ok) 
                return response; 
            else { 
                let error = new Error('Error ' + response.status + ": " + response.statusText);
                error.response = response;
                throw error;
            }
        }, error => { 
            let errmess = new Error(error.message);
            throw errmess;
        })
        .then(response => response.json())
        .then(updated_comment => dispatch(addComment(updated_comment)))
        .catch(error => { alert(`Your error could not be posted Error: ${error.message}`) });
}

// Dishes 
export const fetchDishes = () => dispatch => { // REACT MIDDLEWARE - Thunk's inner function has access to the Store's dispatch() and getState() methods 
    dispatch(dishesLoading(true));

    return fetch(baseUrl + 'dishes')
        .then(response => {
            if (response.ok) // If a correct response is returned from the server 
                return response; 
            else { // If an incorrect response is returned from the server 
                let error = new Error('Error ' + response.status + ": " + response.statusText);
                error.response = response;
                throw error;
            }
        }, error => { // If no response is received from the server 
            let errmess = new Error(error.message);
            throw errmess;
        })
        .then(response => response.json())
        .then(dishes => dispatch(addDishes(dishes)))
        .catch(error => dispatch(dishesFailed(error.message)));
}

export const dishesLoading = () => ({
    type: ActionTypes.DISHES_LOADING
});

export const dishesFailed = errMess => ({
    type: ActionTypes.DISHES_FAILED,
    payload: errMess
});

export const addDishes = dishes => ({
    type: ActionTypes.ADD_DISHES,
    payload: dishes
});

// Comments 
export const fetchComments = () => dispatch => { 
    return fetch(baseUrl + 'comments')
        .then(response => {
            if (response.ok) // If a correct response is returned from the server 
                return response; 
            else { // If an incorrect response is returned from the server 
                let error = new Error('Error ' + response.status + ": " + response.statusText);
                error.response = response;
                throw error;
            }
        }, error => { // If no response is received from the server 
            let errmess = new Error(error.message);
            throw errmess;
        })
        .then(response => response.json())
        .then(comments => dispatch(addComments(comments)))
        .catch(error => dispatch(commentsFailed(error.message)));
}

export const commentsFailed = errMess => ({
    type: ActionTypes.COMMENTS_FAILED,
    payload: errMess
});

export const addComments = comments => ({
    type: ActionTypes.ADD_COMMENTS,
    payload: comments
});

// Promos 
export const fetchPromos = () => dispatch => { 
    dispatch(promosLoading(true));

    return fetch(baseUrl + 'promotions')
        .then(response => {
            if (response.ok) 
                return response; 
            else { 
                let error = new Error('Error ' + response.status + ": " + response.statusText);
                error.response = response;
                throw error;
            }
        }, error => { 
            let errmess = new Error(error.message);
            throw errmess;
        })
        .then(response => response.json())
        .then(promos => dispatch(addPromos(promos)))
        .catch(error => dispatch(promosFailed(error.message)));
}

export const promosLoading = () => ({
    type: ActionTypes.PROMOS_LOADING
});

export const promosFailed = errMess => ({
    type: ActionTypes.PROMOS_FAILED,
    payload: errMess
});

export const addPromos = promos => ({
    type: ActionTypes.ADD_PROMOS,
    payload: promos
});

// Leaders 
export const fetchLeaders = () => dispatch => {
    dispatch(leadersLoading(true));

    return fetch(baseUrl + 'leaders')
        .then(response => {
            if (response.ok) 
                return response; 
            else { 
                let error = new Error('Error ' + response.status + ": " + response.statusText);
                error.response = response;
                throw error;
            }
        }, error => { 
            let errmess = new Error(error.message);
            throw errmess;
        })
        .then(response => response.json())
        .then(leaders => dispatch(addLeaders(leaders)))
        .catch(error => dispatch(leadersFailed(error.message)));
}

export const leadersLoading = () => ({
    type: ActionTypes.LEADERS_LOADING
});

export const leadersFailed = errMess => ({
    type: ActionTypes.LEADERS_FAILED,
    payload: errMess
});

export const addLeaders = leaders => ({
    type: ActionTypes.ADD_LEADERS,
    payload: leaders
});

// Post Feedback
export const postFeedback = (firstname, lastname, telnum, email, agree, contactType, message) => dispatch => {
    const newFeedback = {
        firstname: firstname,
        lastname: lastname,
        telnum: telnum,
        email: email,
        agree: agree, 
        contactType: contactType,
        message: message
    }
    newFeedback.date = new Date().toISOString();

    return fetch(baseUrl + 'feedback', {
        method: 'POST',
        body: JSON.stringify(newFeedback),
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'same-origin'
    })
        .then(response => {
            if (response.ok) 
                return response; 
            else { 
                let error = new Error('Error ' + response.status + ": " + response.statusText);
                error.response = response;
                throw error;
            }
        }, error => { 
            let errmess = new Error(error.message);
            throw errmess;
        })
        .then(response => response.json())
        .then(updated_feedback => {
            alert(`Thank you for your feedback!\n${JSON.stringify(updated_feedback)}`)
        })
        .catch(error => { alert(`Your feedback could not be submitted Error: ${error.message}`) });
}