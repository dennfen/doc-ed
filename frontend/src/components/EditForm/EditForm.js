import { Component } from 'react'
import axios from 'axios';
import { BASE_URL } from '../../utils/utils';
import './EditForm.scss';
import 'react-toastify/dist/ReactToastify.css';

class EditForm extends Component {
    state = {
        bugID: this.props.bug.id,
        title: this.props.bug.title,
        project: this.props.bug.project,
        shortDesc: this.props.bug.short_description,
        longDesc: this.props.bug.long_description,
        code_block: this.props.bug.code_block,
        outstanding: this.props.bug.outstanding,
        resolution: this.props.bug.resolution,
        ref_link: this.props.bug.ref_link,
        technology: this.props.bug.technology
    }

    // Handle edit form submission
    handleSubmit = event => {
        event.preventDefault();
        
        const editObject = {
            title: this.state.title,
            project: this.state.project,
            short_description: this.state.shortDesc,
            long_description: this.state.longDesc,
            code_block: this.state.code_block,
            outstanding: this.state.outstanding,
            resolution: this.state.resolution,
            ref_link: this.state.ref_link,
            technology: this.state.technology
        }

        axios
            .patch(`${BASE_URL}/api/bugs/${this.state.bugID}/`, editObject)
            .then(_result => {
                console.log('axios patch running')
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
                <h2 className='edit-form__title'>{`Edit Bug #${this.state.bugID}`}<span className='edit-form__subtitle'>* Required Fields</span></h2>
                <form className='edit-form' onSubmit={this.handleSubmit}>
                    <div className={`edit-form__code-container ${!this.state.outstanding ? 'edit-form__code-container--extended' : ''}`}>
                        <label className='edit-form__field-label' htmlFor='code_block'>Code</label>
                        <textarea className='edit-form__code-editor' name='code_block' type='text' id='code_block' value={this.state.code_block}  onChange={this.onFieldChange} />
                    </div>
                    <div className={`edit-form__main-container ${!this.state.outstanding ? 'edit-form__main-container--extended' : ''}`}>
                        <div className='edit-form__field-container'>
                            <label className='edit-form__field-label' htmlFor='title'>Title *</label>
                            <input className='edit-form__field-input' name='title' type='text' id='title' value={this.state.title} onChange={this.onFieldChange} required />
                        </div>
                        <div className='edit-form__field-container'>
                            <label className='edit-form__field-label' htmlFor='project'>Project *</label>
                            <input className='edit-form__field-input' name='project' type='text' id='project' value={this.state.project} onChange={this.onFieldChange} required />
                        </div>
                        <div className='edit-form__field-container'>
                            <label className='edit-form__field-label'  htmlFor='technology'>Language *</label>
                            <select className='edit-form__field-select' name='technology' type='select' id='technology' defaultValue={this.state.technology} onChange={this.onFieldChange} required >
                                <option value="" disabled>Select option</option>
                                <option value='C'>C</option>
                                <option value='C#'>C#</option>
                                <option value='C++'>C++</option>
                                <option value='CSS'>CSS</option>
                                <option value='Dart'>Dart</option>
                                <option value='Go Lang'>Go Lang</option>
                                <option value='Java'>Java</option>
                                <option value='JavaScript'>JavaScript</option>
                                <option value='Kotlin'>Kotlin</option>
                                <option value='HTML'>HTML</option>
                                <option value='Perl'>Perl</option>
                                <option value='PHP'>PHP</option>
                                <option value='Python'>Python</option>
                                <option value='R'>R</option>
                                <option value='Rust'>Rust</option>
                                <option value='Scala'>Scala</option>
                                <option value='Ruby'>Ruby</option>
                                <option value='Swift'>Swift</option>
                            </select>
                        </div>
                        <div className='edit-form__field-container'>
                            <label className='edit-form__field-label' htmlFor='shortDesc'>Short Description *</label>
                            <input className='edit-form__field-input' name='shortDesc' type='text' id='shortDesc' value={this.state.shortDesc}  onChange={this.onFieldChange} maxLength='120' required />
                        </div>
                        <div className='edit-form__field-container'>
                            <label className='edit-form__field-label' htmlFor='longDesc'>Details/Notes *</label>
                            <textarea className='edit-form__field-text' name='longDesc' type='text' id='longDesc' value={this.state.longDesc}  onChange={this.onFieldChange} required />
                        </div>
                    </div>
                    {!this.state.outstanding &&
                        <div className='edit-form__resolution-container'>
                            <div className='edit-form__field-container'>
                                <label className='edit-form__field-label' htmlFor='resolution'>Resolution</label>
                                <textarea className={`edit-form__field-text ${this.state.outstanding ? 'edit-form__field-text--grey' : ''}`} name='resolution' type='text' id='resolution' value={this.state.resolution}  onChange={this.onFieldChange} readOnly={this.state.outstanding} />
                            </div>
                            <div className='edit-form__field-container'>
                                <label className='edit-form__field-label' htmlFor='ref_link'>Reference Link</label>
                                <input className={`edit-form__field-input ${this.state.outstanding ? 'edit-form__field-input--grey' : ''}`} name='ref_link' type='text' id='ref_link' value={this.state.ref_link}  onChange={this.onFieldChange} readOnly={this.state.outstanding} />
                            </div>
                        </div>
                    }
                    <button className='edit-form__submit-button' type='submit'>Submit</button>
                </form>
            </>
        );
    }
};

export default EditForm;