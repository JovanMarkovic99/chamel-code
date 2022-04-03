import React from 'react'

const FormError = ({ errors }) => {
    return (
        <div className="form-errors">
            {errors.length > 1 ? (
                <ul>
                    {
                        errors.map((error, index) => (
                            <li key={index}>{ error }</li>    
                        ))
                    }
                </ul>
            ) : (
                <span>{ errors[0] }</span>
            )}
        </div>
    )
}

export default FormError
