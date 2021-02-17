import React from 'react';
import axios from 'axios';
import { BASE_URL, notifyError } from '../../utils/utils';
import { ToastContainer } from 'react-toastify';
import './AddForm.scss'
import 'react-toastify/dist/ReactToastify.css';

const AddForm = ({ submitBug }) => {
    
    // Handle submission of add bug form
    const handleSubmit = event => {
        event.preventDefault();
        const newBug = {
            title: event.target.title.value,
            project: event.target.project.value,
            short_description: event.target.shortDesc.value,
            long_description: event.target.longDesc.value,
            code_block: event.target.codeBlock.value,
            technology: event.target.technology.value
        }

        axios
            .post(`${BASE_URL}/api/bugs/`, newBug)
            .then(_result => {
                submitBug(newBug);
            })
            .catch(error => {
                notifyError()
                console.log(`POST API error: ${error}`)
            })

    }
    
    return (
        <>
            <h2 className='add-form__title'>Log A New Bug <span className='add-form__subtitle'>* Required Fields</span></h2>
            <form className='add-form' onSubmit={handleSubmit}>
                <div className='add-form__code-container'>
                    <label className='add-form__field-label' htmlFor='codeBlock'>Code</label>
                    <textarea className='add-form__code-editor' name='codeBlock' type='text' id='codeBlock' />
                </div>

                <div className='add-form__main-container'>
                    <div className='add-form__field-container'>
                        <label className='add-form__field-label' htmlFor='title'>Title *</label>
                        <input className='add-form__field-input' name='title' type='text' id='title' required />
                    </div>
                    <div className='add-form__field-container'>
                        <label className='add-form__field-label'  htmlFor='project'>Project *</label>
                        <input className='add-form__field-input' name='project' type='text' id='project' required />
                    </div>
                    <div className='add-form__field-container'>
                        <label className='add-form__field-label'  htmlFor='technology'>Language *</label>
                        <select className='add-form__field-select' name='technology' type='select' defaultValue={''} id='technology'>
                            <option value='' disabled>Select option</option>
                            <option value='C'>C</option>
                            <option value='C#'>C#</option>
                            <option value='C++'>C++</option>
                            <option value='CSS'>CSS</option>
                            <option value='Dart'>Dart</option>
                            <option value='Go'>Go</option>
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
                    <div className='add-form__field-container'>
                        <label className='add-form__field-label'  htmlFor='shortDesc'>Short Description *</label>
                        <input className='add-form__field-input' name='shortDesc' type='text' id='shortDesc' maxLength='120' required />
                    </div>
                    <div className='add-form__field-container'>
                        <label className='add-form__field-label'  htmlFor='longDesc'>Details/Notes *</label>
                        <textarea className='add-form__field-text' name='longDesc' type='text' id='longDesc' required />
                    </div>
                    <button className='add-form__submit-button' type='submit'>Submit</button>
                </div>
            </form>

            <ToastContainer
                    position="top-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    />
            <ToastContainer />
        </>
    );
};

export default AddForm;