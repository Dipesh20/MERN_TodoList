import React, { Component } from 'react';
import {
    Button,
    Modal,
    ModalBody,
    ModalHeader,
    Form,
    FormGroup,
    Label,
    Input,
} from 'reactstrap';
import { connect } from 'react-redux'
import { addData } from '../actions/dataActions';

class ItemModal extends Component {
    state = {
        modal: false,
        item:'',
    }

    toggle = ()=>{
        this.setState(state => ({
            modal: !state.modal,
        }));
    }
    onSubmit = (e)=>{
        e.preventDefault();
        this.props.addData(this.state.item);
        this.toggle();
    }
    onChange = (e)=>{
        this.setState({
            [e.target.name]:e.target.value,
        });
    }

    render() {
        return (
            <div>
                <Button
                    outline
                    color="dark"
                    style={{ marginBottom: '2rem' }}
                    onClick={() =>this.toggle()}
                >Add Item</Button>
                <Modal
                    isOpen={this.state.modal}
                    toggle={this.state.toggle}>
                    <ModalHeader toggle={()=>this.toggle()}>Add to Shopping List</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.onSubmit}>
                            <FormGroup>
                                <Label for="item">Item</Label>
                                <Input
                                    type="text" 
                                    name="item" 
                                    id="item" 
                                    placeholder="Add Shopping Item" 
                                    onChange={(event)=>this.onChange(event)}/>
                            </FormGroup>
                            <Button color="dark" style={{marginTop:'10px'}}>Add Item</Button>
                        </Form>
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}

export default connect(null,{addData})(ItemModal);