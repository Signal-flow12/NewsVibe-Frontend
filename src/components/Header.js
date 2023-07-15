import { Link } from 'react-router-dom'

const Header = () => {
    return (
        <div className="Navigation">
            <nav>
                <Link to ='/'>Feed</Link>
            </nav>
        </div>
    )
}

export default Header
