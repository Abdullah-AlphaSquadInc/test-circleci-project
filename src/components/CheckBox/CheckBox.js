import React, { useState } from 'react';
import { Form } from 'react-bootstrap';

const CheckBox = (props) => {
    
    const { label, readOnly, checked, onChange, value } = props;

    const [ check, setCheck ] = useState(false);

    const checkBox = (flag, val) => {
        setCheck(!flag);
        onChange({ flag, val });
    }


    return (

        <Form.Group controlId="formBasicCheckbox" className="mx-3 my-0 pb-1">
            <Form.Check type="checkbox" label={label} style={{ fontSize: '13px' }} 
                readOnly={readOnly} defaultChecked={checked ? checked : check} value={value}
                onChange={(e) => checkBox(!e.target.checked, value)} checked={checked ? checked : check}
            />
        </Form.Group>

    );

}
 
export default CheckBox;