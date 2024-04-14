import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

const Alert = ({ type, message }) => {
    let title = 'Info';
    if (type === 'success') title = 'Success!';
    else if (type === 'error') title = 'Error!';
    else if (type === 'warning') title = 'Warning!';

    MySwal.fire({
        title,
        html: message,
        icon: type
    });

    return null; 
};

export default Alert;
