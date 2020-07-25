import React, { Component } from 'react';
import { Container, ListGroup, ListGroupItem, Button } from 'reactstrap'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import { connect } from 'react-redux';
import { getData, deleteData, addData } from '../actions/dataActions';
import Loader from './loader/loader'
import PropTypes from 'prop-types';
import ItemModal from '../components/itemModal'

class ShoppingList extends Component {

    componentWillMount() {
        this.props.getData();
    }
    render() {
        let element;
        if (this.props.loading) {
            element = <Loader />;
        }
        else {
            element = <ListGroup>
                <TransitionGroup>
                    {this.props.data.map(({ id, name }) => (
                        <CSSTransition key={id} timeout={300} classNames="fade">
                            <div>
                                <ListGroupItem className="d-flex justify-content-between align-items-center">
                                    {name}
                                    <Button outline color="danger" onClick={() => { this.props.deleteData(id) }}>&times;
                                    </Button>
                                </ListGroupItem>
                                <br />
                            </div>
                        </CSSTransition>
                    ))}
                </TransitionGroup>
            </ListGroup>
        }
        return (
            <Container>
                <ItemModal />
                {element}
            </Container>
        );
    }
    static propTypes = {};
}

ShoppingList.propTypes = {
    getData: PropTypes.func.isRequired,
    data: PropTypes.array.isRequired,
}
const mapStateToProps = state => {
    return {
        data: state.data.items,
        loading: state.data.loading,
    }
}

export default connect(mapStateToProps, { getData, deleteData, addData })(ShoppingList);