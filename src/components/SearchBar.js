import React from 'react';
import {FormGroup, FormControl, ControlLabel, HelpBlock } from 'react-bootstrap';

export default class SearchBar extends React.Component {
    state = { 
        value: '',
        showHelp: false,    
    };

    handleChange = (e) => {
        e.preventDefault();
        if (e.target.value.length === 1) this.setState({ showHelp: true}); else this.setState({ showHelp: false});
        this.setState( { value: e.target.value }, () => {
            console.log(this.state);
        });
    }

    onSubmit = (e) => {
        e.preventDefault();
        console.log('onSubmit handler called in SearchBar');
        this.props.onSubmit(this.state.value);
    }

    getValidationState = () => {
        const length = this.state.value.length;
        if (length >= 2) {
            return 'success';
        } else if (length === 1) {
            return 'warning';
        } else if (length === 0) {
            return 'error';
        }
        return null;
    }

    render() {
        return (
            <form onSubmit={this.onSubmit}>
                <FormGroup style={{marginTop: 130}}
                    controlId="formBasicText"
                    validationState={this.getValidationState()}
                    >
                    <ControlLabel>Feel like chilaxing? Let us find the perfect video for your viewing pleasure.</ControlLabel>
                    <FormControl
                        type="text"
                        value={this.state.value}
                        placeholder="Enter text"
                        onChange={this.handleChange}
                        bsSize="lg"
                        autoComplete="off"
                    />
                    <FormControl.Feedback />
                    <div  className="push-down">
                    { this.state.showHelp ? <HelpBlock>Search terms should be at least two characters</HelpBlock> : null }
                    </div>
                </FormGroup>
            </form>
    
        )
    }
}