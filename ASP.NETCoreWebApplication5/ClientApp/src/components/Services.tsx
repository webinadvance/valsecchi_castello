import {useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCoffee, faUtensils, faSwimmingPool, faWifi, faUserTie} from "@fortawesome/free-solid-svg-icons";

interface Service {
    title: string;
    icon: any; // FontAwesomeIcon requires any as the type for its icon prop
    description: string;
}

const SERVICES: Service[] = [
    {
        title: "Daily Breakfast / Cuisine",
        icon: faUtensils,
        description: "Enjoy a delicious breakfast every morning or indulge in our cuisine throughout the day.",
    },
    {
        title: "Spa and Swimming Pool",
        icon: faSwimmingPool,
        description: "Relax and rejuvenate with our spa treatments or take a refreshing dip in our swimming pool.",
    },
    {
        title: "High-speed Wi-Fi",
        icon: faWifi,
        description: "Stay connected with our high-speed Wi-Fi available throughout the villa.",
    },
    {
        title: "Concierge Service",
        icon: faUserTie,
        description: "Our friendly staff are available 24/7 to assist you with any needs or requests.",
    },
];

interface ServiceCardProps extends Service {
}

const ServiceCard = ({title, icon, description}: ServiceCardProps) => {
    const [isHovering, setIsHovering] = useState<boolean>(false);

    return (
        <div
            className="p-4 md:p-6 lg:border-2 transition-shadow duration-300 ease-in-out hover:shadow-md"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
        >
            <div className="flex justify-center items-center">
                <FontAwesomeIcon
                    icon={icon}
                    className={`h-12 w-12 text-gray-400 ${
                        isHovering ? "animate-bounce" : ""
                    }`}
                />
            </div>
            <h3 className="mt-4 md:mt-6 text-lg md:text-xl font-medium text-gray-900">
                {title}
            </h3>
            <p className="mt-2 text-gray-600">{description}</p>
        </div>
    );
};

export default function Services() {
    return (
        <div className="pb-8 md:pb-16">
            <div className="max-w-7xl mx-auto">
                <h2>
                    Our Services
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                    {SERVICES.map((service: Service, index: number) => (
                        <ServiceCard
                            key={index}
                            title={service.title}
                            icon={service.icon}
                            description={service.description}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
