import React, { useContext } from 'react'
import { Context } from '../contextProvider/Context'

function Error() {
    const { errorMessage } = useContext(Context)

    return (
        <h3 className="error">{errorMessage}</h3>
    )
}

export default Error