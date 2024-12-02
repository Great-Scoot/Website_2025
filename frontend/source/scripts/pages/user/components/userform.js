import {toCapitalCase} from '../../../components/helpers.js';

import React, {useEffect, useRef, useState} from 'react';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

const FirstAndLastName = (props) => {
    const firstAndLastName = {};

    // Props
    const {mode, userForm} = props;

    return (
        <div className='row'>
            <div className='col-sm-12 col-md-6'>
                <label htmlFor={`${mode}FirstName`} className='form-label'>First Name</label>
                <div className='input-group'>
                    <input 
                        id={`${mode}FirstName`} 
                        name={`${mode}FirstName`} 
                        className='form-control' 
                        onFocus={userForm.methods.updateActiveInput}
                        onBlur={userForm.methods.updateActiveInput}
                        type='text' 
                        placeholder='Your first name' 
                        maxLength='255' 
                        required={true}
                        disabled={userForm.state.phase !== 'initial' ? true : false}
                    />
                </div>
            </div>
            <div className='col-sm-12 col-md-6'>
                <label htmlFor={`${mode}LastName`} className='form-label'>Last Name</label>
                <div className='input-group'>
                    <input 
                        id={`${mode}LastName`} 
                        name={`${mode}LastName`} 
                        className='form-control' 
                        onFocus={userForm.methods.updateActiveInput}
                        onBlur={userForm.methods.updateActiveInput}
                        type='text' 
                        placeholder='Your last name' 
                        maxLength='255' 
                        required={true}
                        disabled={userForm.state.phase !== 'initial' ? true : false}
                    />
                </div>
            </div>
        </div>
    );
}

const Username = (props) => {
    const username = {};

    // Props
    const {mode, userForm} = props;

    // Vars
    const enabledUserFormPhases = ['initial', 'fetchError'];
    const enabledUsernamePhases = ['initial', 'fetchComplete', 'fetchError'];

    // Functions
    const getIndicator = () => {
        let iconClass = ['fas', 'fa-user'];
        let inputGroupTextClasses = '';
        let spin = false;

        // Override Font Awesome classes and related...
        switch(userForm.state.username.phase) {
            case 'fetching': case 'fetchedData': 
                iconClass = ['fas', 'fa-circle-notch']; spin = true; 
            break;
            case 'fetchComplete': 
                if (userForm.state.username.unique === true) {
                    iconClass = ['fas', 'fa-check']; inputGroupTextClasses = 'text-white bg-success'; 
                } else if (userForm.state.username.unique === false) {
                    iconClass = ['fas', 'fa-xmark']; inputGroupTextClasses = 'text-white bg-danger';
                }
            break;
            case 'fetchError': 
                iconClass = ['fas', 'triangle-exclamation']; inputGroupTextClasses = 'text-white bg-danger'; 
            break;
        }

        // Return
        return (
            <div className={`uniquenessIndicator input-group-text ${inputGroupTextClasses}`}>
                <FontAwesomeIcon icon={iconClass} className={`noMarginRight ${spin ? 'spin-fast' : ''}`} spin={spin} />
            </div>
        );
    }

    const handleChange = (props) => {
        // Props
        const {target} = props;

        if (mode === 'create') {
            // Locals
            const locals = {
                isValid: false
            };

            // Reset validity to its native behavior.
            target.setCustomValidity('');
            locals.isValid = target.checkValidity();
    
            // Update unique and valid in <UserForm />
            userForm.methods.username.updateState({unique: null, valid: locals.isValid});
    
            // Wait until user is done making changes...
            clearTimeout(userForm.refs.username.timeout.current);
    
            userForm.refs.username.timeout.current = setTimeout(() => {
                // If valid, check if username is unique.
                if (userForm.refs.username.input.current && locals.isValid) {
                    // Add to locals vars needed below...
                    locals.fetchController = new AbortController();
                    locals.phase = 'fetching';

                    userForm.methods.username.updateState({phase: locals.phase});
    
                    // Abort if taking too long...
                    setTimeout(() => {
                        if (locals.phase === 'fetching') {
                            locals.fetchController.abort();
                        }
                    }, userForm.globals.intervals.fetch.max);
    
                    // Fetch
                    fetch('/api/user/is_unique', {
                        method: 'POST',
                        headers: {'Content-Type': 'application/json'},
                        cache: 'no-cache',
                        body: JSON.stringify({
                            createUsername: userForm.refs.username.input.current.value
                        }),
                        signal: locals.fetchController.signal
                    }).then(res => res.json()).then(data => {
                        // Store the response in state.username.response
                        userForm.methods.username.updateResponse(data);

                        locals.phase = 'fetchedData';
                        userForm.methods.username.updateState({phase: locals.phase});
    
                        // Wait...
                        setTimeout(() => {
                            // Set custom validity...
                            target.setCustomValidity(data.isUnique === true ? '' : 'Username already exists.');
    
                            // Update refs and state again.
                            locals.phase = 'fetchComplete';
                            userForm.methods.username.updateState({unique: data.isUnique === true, valid: data.isUnique === true, phase: locals.phase});
                        }, userForm.globals.intervals.animations.min);
                    }).catch((error) => {
                        // Error
                        console.error(error);
    
                        // Clear response data and update phase
                        userForm.methods.username.updateResponse(null);
                        
                        locals.phase = 'fetchError';
                        userForm.methods.username.updateState({phase: locals.phase});
                    });
                }
            }, userForm.globals.intervals.changes.doneChanging);
        }
    };

    return (
        <>
            <label htmlFor={`${mode}Username`} className='form-label'>Username</label>
            <div className='input-group'>
                <input 
                    id={`${mode}Username`} 
                    ref={userForm.refs.username.input}
                    name={`${mode}Username`} 
                    className='form-control' 
                    onChange={handleChange}
                    onFocus={userForm.methods.updateActiveInput}
                    onBlur={userForm.methods.updateActiveInput}
                    type='text' 
                    placeholder='Your username' 
                    pattern='^[a-zA-Z0-9_]{8,64}$'
                    required={true}
                    disabled={enabledUserFormPhases.indexOf(userForm.state.phase) === -1 || enabledUsernamePhases.indexOf(userForm.state.username.phase) === -1}
                />
                {getIndicator()}
            </div>
            {(() => {
                if (mode === 'create') {
                    return (
                        <div id={'usernameState'}>
                            Username is valid:&nbsp;
                            {userForm.state.username.valid === true ? 'true' : 'false'}
                            <br />
                            Username is unique:&nbsp;
                            {`${userForm.state.username.unique}`}
                            <br />
                        </div>
                    );
                }
            })()}
        </>
    );
}

const Email = (props) => {
    const email = {};

    // Props
    const {mode, userForm} = props;

    // Vars
    const enabledUserFormPhases = ['initial', 'fetchError'];
    const enabledEmailPhases    = ['initial', 'fetchComplete', 'fetchError'];

    // Functions
    const getIndicator = () => {
        let iconClass = ['fas', 'fa-at'];
        let inputGroupTextClasses = '';
        let spin = false;

        // Font Awesome classes and related...
        switch(userForm.state.email.phase) {
            case 'fetching': case 'fetchedData': 
                iconClass = ['fas', 'fa-circle-notch']; spin = true; 
            break;
            case 'fetchComplete': 
                if (userForm.state.email.unique === true) {
                    iconClass = ['fas', 'fa-check']; inputGroupTextClasses = 'text-white bg-success'; 
                } else if (userForm.state.email.unique === false) {
                    iconClass = ['fas', 'fa-xmark']; inputGroupTextClasses = 'text-white bg-danger';
                }
            break;
            case 'fetchError': 
                iconClass = ['fas', 'triangle-exclamation']; inputGroupTextClasses = 'text-white bg-danger'; 
            break;
        }

        // Return
        return (
            <div className={`uniquenessIndicator input-group-text ${inputGroupTextClasses}`}>
                <FontAwesomeIcon icon={iconClass} className={spin ? 'spin-fast' : ''} spin={spin} />
            </div>
        );
    }

    const handleChange = (props) => {
        // Props
        const {target} = props;

        if (mode === 'create') {
            // Locals
            const locals = {
                isValid: false
            };

            // Reset validity to its native behavior.
            target.setCustomValidity('');
            locals.isValid = target.checkValidity();
    
            // Update unique and valid in <UserForm />
            userForm.methods.email.updateState({unique: null, valid: locals.isValid});
    
            // Wait until user is done making changes...
            clearTimeout(userForm.refs.email.timeout.current);
    
            userForm.refs.email.timeout.current = setTimeout(() => {
                // If valid, check if email is unique.
                if (userForm.refs.email.input.current && locals.isValid) {
                    // Add to locals vars needed below...
                    locals.fetchController = new AbortController();
                    locals.phase = 'fetching';

                    userForm.methods.email.updateState({phase: locals.phase});
    
                    // Abort if taking too long...
                    setTimeout(() => {
                        if (locals.phase === 'fetching') {
                            locals.fetchController.abort();
                        }
                    }, userForm.globals.intervals.fetch.max);
    
                    // Fetch
                    fetch('/api/user/is_unique', {
                        method: 'POST',
                        headers: {'Content-Type': 'application/json'},
                        cache: 'no-cache',
                        body: JSON.stringify({
                            createEmail: userForm.refs.email.input.current.value
                        }),
                        signal: locals.fetchController.signal
                    }).then(res => res.json()).then(data => {
                        // Store the response in state.email.response
                        userForm.methods.email.updateResponse(data);

                        locals.phase = 'fetchedData';
                        userForm.methods.email.updateState({phase: locals.phase});
    
                        // Wait...
                        setTimeout(() => {
                            // Set custom validity...
                            target.setCustomValidity(data.isUnique === true ? '' : 'Email already exists.');
    
                            // Update refs and state again.
                            locals.phase = 'fetchComplete';
                            userForm.methods.email.updateState({unique: data.isUnique === true, valid: data.isUnique === true, phase: locals.phase});
                        }, userForm.globals.intervals.animations.min);
                    }).catch((error) => {
                        // Error
                        console.error(error);
    
                        // Clear response data and update phase
                        userForm.methods.email.updateResponse(null);

                        locals.phase = 'fetchError';
                        userForm.methods.email.updateState({phase: locals.fetchError});
                    });
                }
            }, userForm.globals.intervals.changes.doneChanging);
        }
    };

    return (
        <>
            <label htmlFor={`${mode}Email`} className='form-label'>Email</label>
            <div className='input-group'>
                <input 
                    id={`${mode}Email`} 
                    ref={userForm.refs.email.input}
                    name={`${mode}Email`} 
                    className='form-control' 
                    onChange={handleChange}
                    onFocus={userForm.methods.updateActiveInput}
                    onBlur={userForm.methods.updateActiveInput}
                    type='email' 
                    placeholder='Your email address' 
                    maxLength='255' 
                    required={true}
                    disabled={enabledUserFormPhases.indexOf(userForm.state.phase) === -1 || enabledEmailPhases.indexOf(userForm.state.email.phase) === -1}
                />
                {getIndicator()}
            </div>
            <div id={'emailState'}>
                Email is valid:&nbsp;
                {userForm.state.email.valid === true ? 'true' : 'false'}
                <br />
                Email is unique:&nbsp;
                {`${userForm.state.email.unique}`}
                <br />
            </div>
        </>
    );
}

const Phone = (props) => {
    const phone = {};

    // Props
    const {mode, userForm} = props;

    return (
        <>
            <label htmlFor={`${mode}Phone`} className='form-label'>Phone</label>
            <div className='input-group'>
                <input 
                    id={`${mode}Phone`} 
                    name={`${mode}Phone`} 
                    className='form-control' 
                    onFocus={userForm.methods.updateActiveInput}
                    onBlur={userForm.methods.updateActiveInput}
                    type='text' 
                    placeholder='Your phone' 
                    maxLength='255' 
                    disabled={userForm.state.phase !== 'initial' ? true : false}
                />
            </div>
        </>
    );
}

const Password = (props) => {
    /* Notes:
        - Child of <Passwords />.
        - Props:
            - mode: 'default' or 'confirm'.
            - matchRequired...
    */

    const password = {};

    // Props
    const {mode, matchRequired, userForm} = props;

    // Functions
    const handleChange = (props) => {
        // Props
        const {target} = props;

        // Reset validity to its native behavior.
        userForm.refs.passwords.password.input.current.setCustomValidity('');

        if (matchRequired) {
            userForm.refs.passwords.passwordConfirm.input.current.setCustomValidity('');
        }

        // Locals
        const locals = {
            passwordValid: userForm.refs.passwords.password.input.current.checkValidity(),
            targetValid: target.checkValidity()
        };

        // If password matching is required...
        if (locals.targetValid && matchRequired) {
            // Add to locals vars needed below...
            locals.passwordConfirmValid = userForm.refs.passwords.passwordConfirm.input.current.checkValidity();

            locals.passwordsValid = locals.passwordValid && locals.passwordConfirmValid;
            locals.passwordsMatch = userForm.refs.passwords.password.input.current.value === userForm.refs.passwords.passwordConfirm.input.current.value;
            
            // Set custom validity...
            if (locals.passwordsValid && locals.passwordsMatch) {
                locals.passwordValid = true; locals.passwordConfirmValid = true;

                userForm.refs.passwords.password.input.current.setCustomValidity('');
                userForm.refs.passwords.passwordConfirm.input.current.setCustomValidity('');
            } else if (locals.passwordsValid && !locals.passwordsMatch) {
                locals.passwordValid = false; locals.passwordConfirmValid = false;

                userForm.refs.passwords.password.input.current.setCustomValidity('Passwords must match.');
                userForm.refs.passwords.passwordConfirm.input.current.setCustomValidity('Passwords must match.');
            } else { // target is valid but the other field is not.
                if (mode === 'default') {
                    locals.passwordValid = true; locals.passwordConfirmValid = false;
                } else if (mode === 'confirm') {
                    locals.passwordValid = false; locals.passwordConfirmValid = true;
                }

                userForm.refs.passwords.password.input.current.setCustomValidity(locals.passwordValid ? '' : 'Please match the requested format.');
                userForm.refs.passwords.passwordConfirm.input.current.setCustomValidity(locals.passwordConfirmValid ? '' : 'Please match the requested format.');
            }

            locals.passwordsValid = locals.passwordValid && locals.passwordConfirmValid;
        }

        // Update state in <UserForm />
        userForm.methods.passwords.password.updateValid(locals.passwordValid);
     
        if (matchRequired) {
            userForm.methods.passwords.passwordConfirm.updateValid(locals.passwordConfirmValid);
            userForm.methods.passwords.updateValid(locals.passwordsValid);
            userForm.methods.passwords.updateMatch(locals.passwordsMatch);
        }
    }

    return (
        <>
            <label 
                htmlFor={`${mode}Password`} 
                className='form-label'
            >
                {(() => {
                    if (mode === 'default') {return 'Password';} 
                    else if (mode === 'confirm') {return 'Confirm Password';}
                })()}
            </label>
            <div className='input-group'>
                <input 
                    id={`${mode}Password`} 
                    name={`${mode}Password`}
                    ref={(() => {
                        if (mode === 'default') {return userForm.refs.passwords.password.input;}
                        else if (mode === 'confirm') {return userForm.refs.passwords.passwordConfirm.input;}
                    })()} 
                    className='form-control' 
                    onChange={handleChange} 
                    onFocus={userForm.methods.updateActiveInput}
                    onBlur={userForm.methods.updateActiveInput}
                    type={(() => {
                        if (userForm.state.phase === 'initial') {
                            if (mode === 'default') {return userForm.state.passwords.password.type;}
                            else if (mode === 'confirm') {return userForm.state.passwords.passwordConfirm.type;}
                        } else {
                            return 'password';
                        }
                    })()} 
                    placeholder={(() => {
                        if (mode === 'default') {return 'Your password';}
                        else if (mode === 'confirm') {return 'Confirm your password';}
                    })()} 
                    pattern='^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*#?&])[a-zA-Z\d@$!%*#?&]{8,64}$'
                    required={true}
                    disabled={userForm.state.phase !== 'initial'}
                />
                <button 
                    className='passwordDisplayButton btn btn-outline-secondary' 
                    onClick={(() => {
                        if (mode === 'default') {return userForm.methods.passwords.password.updateType;}
                        else if (mode === 'confirm') {return userForm.methods.passwords.passwordConfirm.updateType;}
                    })()} 
                    type='button'
                    disabled={userForm.state.phase !== 'initial'}
                >
                    <FontAwesomeIcon icon='eye' />
                    {(() => {
                        if (mode === 'default') {return userForm.state.passwords.password.type === 'password' || userForm.state.phase !== 'initial' ? 'Show' : 'Hide';}
                        else if (mode === 'confirm') {return userForm.state.passwords.passwordConfirm.type === 'password' || userForm.state.phase !== 'initial' ? 'Show' : 'Hide';}
                    })()}
                </button>
                <div className='input-group-text'>
                    <FontAwesomeIcon icon='lock' />
                </div>
            </div>
            <div id={`password${toCapitalCase(mode)}State`}>
                Password is valid:&nbsp;
                {(() => {
                    if (mode === 'default') {return userForm.state.passwords.password.valid ? 'true' : 'false';}
                    else if (mode === 'confirm') {return userForm.state.passwords.passwordConfirm.valid ? 'true' : 'false';}
                })()}
                <br />
            </div>
        </>
    );
}

const Passwords = (props) => {
    /* Notes:
        - Child of <UserForm />.
        - Parent of <Password />.
        - Props:
            - mode: 'create', 'login', 'reset', or 'delete'.
    */

    const passwords = {};

    // Props
    const {mode, userForm} = props;

    // Vars
    const matchRequired = mode === 'create' || mode === 'delete';

    return (
        <>
            <Password mode='default' matchRequired={matchRequired} userForm={userForm} />
            {(() => {
                if (matchRequired) {
                    return (
                        <>
                            <Password mode='confirm' matchRequired={matchRequired} userForm={userForm} />
                            <div id='passwordsState'>
                                Both passwords are valid: {userForm.state.passwords.valid ? 'true' : 'false'}<br />
                                Both passwords match: {userForm.state.passwords.match ? 'true' : 'false'}
                            </div>
                        </>
                    );
                }
            })()}
        </>
    ); 
}

const UserForm = (props) => {
    /* Notes:
        - Parent of many inputs...
        - Props:
            - mode: 'create', 'login', 'reset', or 'delete'.
    */

    const userForm = {};

    // Props
    const {mode} = props;

    // Globals
    userForm.globals = {
        intervals: {
            animations: {
                min: 1000,
                max: 4000
            },
            changes: {
                doneChanging: 2000
            },
            fetch: {
                max: 8000
            }
        }
    };

    // Refs
    userForm.refs = {
        // <UserForm />
        activeInput:  useRef(null),
        form:         useRef(null),
        submitButton: useRef(null),
        // Children
        username: {
            input:   useRef(null),
            timeout: useRef(undefined)
        },
        email: {
            input:   useRef(null),
            timeout: useRef(undefined)
        },
        passwords: {
            password: {
                input: useRef(null),
            },
            passwordConfirm : {
                input: useRef(null)
            }
        }
    };

    // State (<UserForm />)
    const [phase,    setPhase]    = useState('initial');
    const [response, setResponse] = useState(null);

    // Username
    const [usernamePhase,    setUsernamePhase]    = useState('initial');
    const [usernameResponse, setUsernameResponse] = useState(null);
    const [usernameUnique,   setUsernameUnique]   = useState(null);
    const [usernameValid,    setUsernameValid]    = useState(false);

    // Email
    const [emailPhase,    setEmailPhase]    = useState('initial');
    const [emailResponse, setEmailResponse] = useState(null);
    const [emailUnique,   setEmailUnique]   = useState(null);
    const [emailValid,    setEmailValid]    = useState(false);

    // Passwords
    const [passwordsMatch, setPasswordsMatch] = useState(true);
    const [passwordsValid, setPasswordsValid] = useState(false);
    
    // Password
    const [passwordType,  setPasswordType]  = useState('password');
    const [passwordValid, setPasswordValid] = useState(false);
    
    // Password Confirm
    const [passwordConfirmType,  setPasswordConfirmType]  = useState('password');
    const [passwordConfirmValid, setPasswordConfirmValid] = useState(false);

    // State object (for organization and passing to children).
    userForm.state = {
        // <UserForm />
        phase, setPhase,
        response, setResponse,
        // Children
        username: {
            phase:    usernamePhase,    setPhase:    setUsernamePhase,
            response: usernameResponse, setResponse: setUsernameResponse,
            unique:   usernameUnique,   setUnique:   setUsernameUnique,
            valid:    usernameValid,    setValid:    setUsernameValid
        },
        email: {
            phase:    emailPhase,    setPhase:    setEmailPhase,
            response: emailResponse, setResponse: setEmailResponse,
            unique:   emailUnique,   setUnique:   setEmailUnique,
            valid:    emailValid,    setValid:    setEmailValid
        },
        passwords: {
            match: passwordsMatch, setMatch: setPasswordsMatch,
            valid: passwordsValid, setValid: setPasswordsValid,
            password: {
                type:  passwordType,  setType:  setPasswordType,
                valid: passwordValid, setValid: setPasswordValid
            },
            passwordConfirm: {
                type:  passwordConfirmType,  setType:  setPasswordConfirmType,
                valid: passwordConfirmValid, setValid: setPasswordConfirmValid
            }
        }
    };

    // Methods (for organization and passing to children).
    userForm.methods = {
        // <UserForm />
        updateActiveInput: (props) => {
            // Props
            const {target} = props;

            // Update activeInput in refs so it can be refocused within useEffect().
            if (target.id === document.activeElement.id) {
                userForm.refs.activeInput.current = target.id;
            } else {
                userForm.refs.activeInput.current = null;
            }
        },
        updateResponse: (response) => {
            setResponse(response || null);
        },
        updateState: (stateObj) => {
            if (stateObj.hasOwnProperty('phase')) {
                setPhase(stateObj.phase || 'initial');
            }
        },
        // Children
        username: {
            updateResponse: (response) => {
                setUsernameResponse(response || null);
            },
            updateState: (stateObj) => {
                if (stateObj.hasOwnProperty('phase')) {
                    setUsernamePhase(stateObj.phase || 'initial');
                }
    
                if (stateObj.hasOwnProperty('unique')) {
                    setUsernameUnique(stateObj.unique); // No fallback
                }
    
                if (stateObj.hasOwnProperty('valid')) {
                    setUsernameValid(stateObj.valid || false);
                }
            }
        },
        email: {
            updateResponse: (response) => {
                setEmailResponse(response || null);
            },
            updateState: (stateObj) => {
                if (stateObj.hasOwnProperty('phase')) {
                    setEmailPhase(stateObj.phase || 'initial');
                }
    
                if (stateObj.hasOwnProperty('unique')) {
                    setEmailUnique(stateObj.unique); // No fallback
                }
    
                if (stateObj.hasOwnProperty('valid')) {
                    setEmailValid(stateObj.valid || false);
                }
            }
        },
        passwords: {
            updateMatch: (match) => {
                setPasswordsMatch(match || false);
            },
            updateValid: (valid) => {
                setPasswordsValid(valid || false);
            },
            password: {
                updateType: () => {
                    setPasswordType(passwordType === 'password' ? 'text' : 'password');
                },
                updateValid: (validity) => {
                    setPasswordValid(validity);
                }
            },
            passwordConfirm: {
                updateType: () => {
                    setPasswordConfirmType(passwordConfirmType === 'password' ? 'text' : 'password');
                },
                updateValid: (validity) => {
                    setPasswordConfirmValid(validity);
                }
            }
        }
    };

    // Functions
    const getSubmitButton = () => {
        const enabledUserFormPhases = ['initial', 'fetchError'];
        const enabledUsernamePhases = ['initial', 'fetchComplete', 'fetchError'];
        const enabledEmailPhases    = ['initial', 'fetchComplete', 'fetchError'];

        const getClasses = () => {
            let classes = 'btn btn-primary';
    
            // Override the default classes when needed...
            switch(phase) {
                case 'fetching': case 'fetchedData': 
                    classes = 'btn btn-secondary'; 
                break;
                case 'fetchComplete': 
                    switch(response.codeType) {
                        case '2xx': classes = 'btn btn-success'; break;
                        case '5xx': classes = 'btn btn-danger'; break;
                    }
                break;
                case 'fetchError':
                    classes = 'btn btn-danger';
                break;
            }
    
            return classes;
        };

        const getContent = () => {
            let iconClass = [];
            let label = '';
            let spin = false;
    
            // Initial iconClass and label...
            switch(mode) {
                case 'create': iconClass = ['fas', 'user-plus'];    label = 'Create';         break;
                case 'login':  iconClass = ['fas', 'user'];         label = 'Login';          break;
                case 'reset':  iconClass = ['fas', 'rotate-right']; label = 'Reset Password'; break;
                case 'delete': iconClass = ['fas', 'user-minus'];   label = 'Delete';         break;
            }
    
            // Override iconClass, label, and spin. If not overridden, the above will be used.
            switch(phase) {
                case 'fetching': case 'fetchedData': 
                    iconClass = ['fas', 'circle-notch']; label = 'Working...'; spin = true; 
                break;
                case 'fetchComplete': 
                    // Factor in fetch response code... 
                    switch(response.codeType) {
                        case '2xx': 
                            iconClass = ['fas', 'check'];
    
                            if (mode === 'reset' || mode === 'delete') {
                                label = 'Complete'; 
                            }
                        break;
                        case '5xx':
                            iconClass = ['fas', 'triangle-exclamation']; label = 'Error';
                        break;
                    }
                break;
                case 'fetchError':
                    iconClass = ['fas', 'triangle-exclamation']; label = 'Error';
                break;
            }
    
            return (
                <>
                    <FontAwesomeIcon icon={iconClass} className={spin ? 'spin-fast' : ''} spin={spin} />{label}
                </>
            );
        }

        return (
            <button 
                id={`${mode}FormSubmitButton`} 
                ref={userForm.refs.submitButton} 
                className={getClasses()} 
                onClick={handleSubmit} 
                type='submit'
                disabled={enabledUserFormPhases.indexOf(phase) === -1 || enabledUsernamePhases.indexOf(usernamePhase) === -1 || enabledEmailPhases.indexOf(emailPhase) === -1}
            >
                {getContent()}
            </button>
        );
    };

    const getSubmitHint = () => {
        // Return this only if fetch failed due to 4xx error.
        if (phase === 'initial' && response && response.codeType === '4xx') {
            let warning = '';

            switch(mode) {
                case 'login':  warning = 'Username or password may not be correct.';    break;
                case 'delete': warning = 'Unable to delete account. Please try again.'; break;
            }

            return (
                <div id={`${mode}FormSubmitHint`} className='text-warning'>
                    {warning}
                </div>
            );
        }
    };

    const getTryAgainButton = () => {
        // Return this only if fetch failed due to 5xx error or was aborted.
        if (phase === 'fetchComplete' && response && response.codeType === '5xx' || phase === 'fetchError') {
            return (
                <>
                    <button id={`${mode}FormResetButton`} className='btn btn-secondary' onClick={handleReset} type='button'>
                        <FontAwesomeIcon icon='rotate-left' />Try Again
                    </button>
                </>
            );
        }
    };

    const handleReset = () => {
        // Easiest way to reset the page...
        location.reload();
    };

    const handleSubmit = (e) => {
        // Shorthand
        const form = userForm.refs.form.current;

        // If form is valid
        if (form.checkValidity()) {
            // Prevent default/page reload.
            e.preventDefault();

            if (phase === 'initial' && (mode === 'create' ? usernameUnique && emailUnique : true)) {
                // Locals
                const locals = {
                    fetchController: new AbortController(),
                    phase: 'fetching'
                };

                userForm.methods.updateState({phase: locals.phase});

                // Prepare API request
                const fetchBody = {};

                // Push form inputs into fetchBody
                for (let i = 0, l = form.elements.length; i < l; i++) {
                    const element = form.elements[i];
    
                    // If has [name] and value (even after trim)
                    if (element.name) {
                        if (typeof element.value === 'string') {
                            element.value = element.value.trim();
                        }
    
                        if (element.value) {
                            fetchBody[element.name] = element.value;
                        }
                    }
                }

                // Make API request
                
                // Abort if taking too long...
                setTimeout(() => {
                    if (locals.phase === 'fetching') {
                        locals.fetchController.abort();
                    }
                }, userForm.globals.intervals.fetch.max);

                // Fetch
                fetch(form.action, {
                    method: form.method.toUpperCase(),
                    headers: {'Content-Type': 'application/json'},
                    cache: 'no-cache',
                    body: JSON.stringify(fetchBody),
                    signal: locals.fetchController.signal
                }).then(res => res.json()).then(data => {
                    // Store the response in userForm.state.response
                    userForm.methods.updateResponse(data);

                    locals.phase = 'fetchedData';
                    userForm.methods.updateState({phase: locals.phase});

                    // After min duration...
                    setTimeout(() => {
                        // Update phase
                        if (data.codeType === '4xx') {
                            locals.phase = 'initial';
                        } else {
                            locals.phase = 'fetchComplete';
                        }

                        userForm.methods.updateState({phase: locals.phase});
                    }, userForm.globals.intervals.animations.min);
                }).catch((error) => {
                    console.error(error);

                    // Clear response data and update phase
                    userForm.methods.updateResponse(null);

                    locals.phase = 'fetchError';
                    userForm.methods.updateState({phase: locals.phase});
                });
            }
        } else { // Form is not valid (default behavior allowed to trigger browser validation messages)
            console.log(`${mode}Form is not valid.`);
        }
    }

    useEffect(() => {
        // Maintain input focus through state changes
        if (userForm.refs.activeInput.current && userForm.refs.activeInput.current !== document.activeElement.id ) {
            document.getElementById(userForm.refs.activeInput.current).focus();
        }
    });

    return (
        <form id={`${mode}Form`} ref={userForm.refs.form} className='userForm' method='post' action={'/api/user/${mode}'} autoComplete='off'>
            {mode === 'create' ?                                   <FirstAndLastName userForm={userForm} {...props} /> : ''}
            {mode === 'create' || mode === 'login' ?                       <Username userForm={userForm} {...props} /> : ''}
            {mode === 'create' || mode === 'reset' ?                          <Email userForm={userForm} {...props} /> : ''}
            {mode === 'create' ?                                              <Phone userForm={userForm} {...props} /> : ''}
            {mode === 'create' || mode === 'login' || mode === 'delete' ? <Passwords userForm={userForm} {...props} /> : ''}
            <div id={`${mode}FormButtonsBottom`}>
                {getSubmitHint()}
                {getSubmitButton()}
                {getTryAgainButton()}
            </div>
        </form>
    );
};

export default UserForm;