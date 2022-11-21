import { Link } from 'react-router-dom'
import { useStore } from './../Store'

function Onboarding() {
    return (
        <>
            <h4>Getting Started</h4>
            <button>
                <Link to="/contacts">I'll do this later</Link>
            </button>
        </>
    )
}

export default Onboarding
