import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faCoffee,
    faUtensils,
    faSwimmingPool,
    faWifi,
    faUserTie,
} from "@fortawesome/free-solid-svg-icons";
import {faConciergeBell} from "@fortawesome/free-solid-svg-icons/faConciergeBell";

export default function App() {
    return (
        <section className="bg-gray-100 py-16">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">
                    Our Services
                </h2>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                    <div className="bg-white border border-gray-300 rounded-md">
                        <div className="p-6 flex justify-center items-center">
                            <FontAwesomeIcon
                                icon={faUtensils}
                                className="text-gray-400 h-12 w-12"
                            />
                        </div>
                        <div className="p-6">
                            <h3 className="text-lg md:text-xl font-medium text-gray-900">
                                Daily Breakfast / Cuisine
                            </h3>
                            <p className="mt-2 text-gray-600">
                                Enjoy a delicious breakfast every morning or indulge in our
                                cuisine throughout the day.
                            </p>
                        </div>
                    </div>
                    <div className="bg-white border border-gray-300 rounded-md">
                        <div className="p-6 flex justify-center items-center">
                            <FontAwesomeIcon
                                icon={faSwimmingPool}
                                className="text-gray-400 h-12 w-12"
                            />
                        </div>
                        <div className="p-6">
                            <h3 className="text-lg md:text-xl font-medium text-gray-900">
                                Spa and Swimming Pool
                            </h3>
                            <p className="mt-2 text-gray-600">
                                Relax and rejuvenate with our spa treatments or take a refreshing
                                dip in our swimming pool.
                            </p>
                        </div>
                    </div>
                    <div className="bg-white border border-gray-300 rounded-md">
                        <div className="p-6 flex justify-center items-center">
                            <FontAwesomeIcon
                                icon={faWifi}
                                className="text-gray-400 h-12 w-12"
                            />
                        </div>
                        <div className="p-6">
                            <h3 className="text-lg md:text-xl font-medium text-gray-900">
                                Wi-Fi
                            </h3>
                            <p className="mt-2 text-gray-600">
                                Stay connected with our high-speed Wi-Fi available throughout the
                                villa.
                            </p>
                        </div>
                    </div>
                    <div className="bg-white border border-gray-300 rounded-md">
                        <div className="p-6 flex justify-center items-center">
                            <FontAwesomeIcon
                                icon={faConciergeBell}
                                className="text-gray-400 h-12 w-12"
                            />
                        </div>
                        <div className="p-6">
                            <h3 className="text-lg md:text-xl font-medium text-gray-900">
                                Wi-Fi
                            </h3>
                            <p className="mt-2 text-gray-600">
                                Stay connected with our high-speed Wi-Fi available throughout the
                                villa.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
           
