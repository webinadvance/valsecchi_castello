import {useLocation} from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faArrowDown} from '@fortawesome/free-solid-svg-icons';
import Navbar from './Navbar';

const Header = () => {
    const location = useLocation();

    return (
        <div id="headerarea" className="relative">
            <div className="absolute z-10 uppercase w-full p-4 lg:p-10">
                <Navbar/>
            </div>

            {location.pathname.startsWith('/home') || location.pathname === '/' ? (
                <video
                    className="videobg"
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="metadata"
                >
                    <source
                        src="https://s3.amazonaws.com/uploads.serenohotels.com/app/uploads/2016/08/09220547/Villa-Pliniana-Descriptivo-v3_low.mp4"
                        type="video/mp4"
                    />
                </video>
            ) : location.pathname.startsWith('/gallery') ? (
                <div
                    style={{backgroundImage: "url('https://picsum.photos/2000/2000')"}}
                    className="videobg headerbg bg-center bg-cover bg-no-repea h-100 w-100"
                />
            ) : null}

            <a href="#welcome">
                <FontAwesomeIcon
                    icon={faArrowDown}
                    className="cursor-pointer opacity-75 absolute bottom-0 mb-4 -translate-x-1/2 left-1/2 z-10"
                    color="white"
                    size="2x"
                />
            </a>
        </div>
    );
};

export default Header;
