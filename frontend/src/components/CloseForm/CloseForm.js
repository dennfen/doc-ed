import './CloseForm.scss';
import axios from 'axios';
import { BASE_URL } from '../../utils/utils';
import 'react-toastify/dist/ReactToastify.css';
import { Component } from 'react';

class CloseForm extends Component {
    state = {
        bugID: this.props.bug.id,
        title: this.props.bug.title,
        project: this.props.bug.project,
        shortDesc: this.props.bug.short_description,
        code_block: this.props.bug.code_block,
        resolution: this.props.bug.resolution,
        ref_link: this.props.bug.ref_link
    }

    // Handling submission of close form
    handleSubmit = event => {
        event.preventDefault();
        const closeObject = {
            close_date: new Date(),
            outstanding: false,
            code_block: this.state.code_block,
            resolution: this.state.resolution,
            ref_link: this.state.ref_link
        }

        axios
            .patch(`${BASE_URL}/api/bugs/${this.state.bugID}/`, closeObject)
            .then(_result => {
                this.props.handleSubmit()
            })
            .catch( error => {
                console.log(`PUT API error: ${error}`)
            })
    }

    // Form field change handler
    onFieldChange = event => {
        event.preventDefault()
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    render() {
        return (
            <>
                <h2 className='close-form__title'>{`Close Bug #${this.state.bugID} - ${this.state.title}`}<span className='add-form__subtitle'>* Required Fields</span></h2>
                <form className='close-form' onSubmit={this.handleSubmit}>
                    <div className='close-form__code-container'>
                        <label className='close-form__field-label' htmlFor='code_block'>Code</label>
                        <textarea className='close-form__code-editor' name='code_block' type='text' id='code_block' value={this.state.code_block}  onChange={this.onFieldChange} />
                    </div>
                    <div className='close-form__resolution-container'>
                        <div className='close-form__field-container'>
                            <label className='close-form__field-label' htmlFor='project'>Project</label>
                            <input className='close-form__field-input close-form__field-input--grey' name='project' type='text' id='project' value={this.state.project} onChange={this.onFieldChange} readOnly />
                        </div>
                        <div className='close-form__field-container'>
                            <label className='close-form__field-label' htmlFor='shortDesc'>Short Description</label>
                            <input className='close-form__field-input close-form__field-input--grey' name='shortDesc' type='text' id='shortDesc' value={this.state.shortDesc}  onChange={this.onFieldChange} maxLength='120' readOnly />
                        </div>
                        <div className='close-form__field-container'>
                            <label className='close-form__field-label' htmlFor='resolution'>Resolution *</label>
                            <textarea className='close-form__field-text' name='resolution' type='text' id='resolution' value={this.state.resolution}  onChange={this.onFieldChange} required />
                        </div>
                        <div className='close-form__field-container'>
                            <label className='close-form__field-label' htmlFor='ref_link'>External Reference Link</label>
                            <input className='close-form__field-input' name='ref_link' type='text' id='ref_link' value={this.state.ref_link}  onChange={this.onFieldChange} maxLength='255' />
                        </div>
                    </div>
                    <button className='close-form__submit-button' type='submit'>Submit</button>
                </form>
            </>
        );
    }
};

export default CloseForm;