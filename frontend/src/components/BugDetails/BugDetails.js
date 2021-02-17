import React from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import './BugDetails.scss'

const BugDetails = ({ bug }) => {

    return (
        <div>
            <h2 className='bug-details__title'>{`Bug #${bug.id} Details`}</h2>
            <div className='bug-details'>
                <div className='bug-details__code-container'>
                    <h3 className='bug-details__field-label'>Code</h3>
                    {/* <textarea className='bug-details__code-editor' defaultValue={bug.code_block} readOnly></textarea> */}
                    <SyntaxHighlighter
                        className='bug-details__code-editor'
                        language={bug.technology.toLowerCase()}
                        style={docco}
                        showLineNumbers={true}
                    >
                        {bug.code_block}
                    </SyntaxHighlighter>
                </div>
                <div className='bug-details__main-container'>
                    <div className='bug-details__field-container'>
                        <h3 className='bug-details__field-label'>Title</h3>
                        <p className='bug-details__field-input'>{bug.title}</p>
                    </div>
                    <div className='bug-details__field-container'>
                        <h3 className='bug-details__field-label'>Project</h3>
                        <p className='bug-details__field-input'>{bug.project}</p>
                    </div>
                    <div className='bug-details__field-container'>
                        <h3 className='bug-details__field-label'>Language</h3>
                        <p className='bug-details__field-input'>{bug.technology}</p>
                    </div>
                    <div className='bug-details__field-container'>
                        <h3 className='bug-details__field-label'>Short Description</h3>
                        <p className='bug-details__field-input bug-details__field-input--extended'>{bug.short_description}</p>
                    </div>
                    <div className='bug-details__field-container'>
                        <h3 className='bug-details__field-label'>Details/Notes</h3>
                        <pre className='bug-details__field-text' >{bug.long_description}</pre>
                    </div>
                </div>
                <div className='bug-details__resolution-container'>
                    <div className='bug-details__field-container'>
                        <h3 className='bug-details__field-label'>Status</h3>
                        <p className={`bug-details__field-status ${bug.outstanding ? 'bug-details__field-status--outstanding' : 'bug-details__field-status--closed'}`}>{bug.outstanding ? 'Outstanding' : 'Closed'}</p>
                    </div>
                    <div className='bug-details__field-container'>
                        <h3 className='bug-details__field-label'>Resolution</h3>
                        <pre className='bug-details__field-text'>{bug.resolution}</pre>
                    </div>
                    <div className='bug-details__field-container'>
                        <h3 className='bug-details__field-label'>Reference Link</h3>
                        <a className='bug-details__field-link' href={bug.ref_link}>{bug.ref_link}</a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BugDetails;