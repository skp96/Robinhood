import { connect } from 'react-redux';
import { login } from '../../actions/session_actions';
import LoginForm from './login_form';


const mapStateToProps = (state) => {
    const clearErrors = () => {
        state.errors.session = [] 
    };
    
    return {
        errors: state.errors.session,
        formType: 'login',
        clearErrors: clearErrors()
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        login: (user) => dispatch(login(user))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
