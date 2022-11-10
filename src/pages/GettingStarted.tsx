import { Link } from 'react-router-dom'

function GettingStarted() {
    return (
        <>
            <h4>Getting Started</h4>
            <button>
                <Link to="/contacts">I'll do this later</Link>
            </button>
        </>
    )
}

export default GettingStarted
