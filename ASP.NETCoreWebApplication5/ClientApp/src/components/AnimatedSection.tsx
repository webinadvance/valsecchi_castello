import {useInView} from "react-intersection-observer";
import {animated, useSpring} from "react-spring";
import {ReactNode, useEffect} from "react";
import {useMediaQuery} from "@mui/material";

export interface AnimatedSectionProps {
    children: ReactNode;
}

export const AnimatedSection = ({children}: AnimatedSectionProps) => {
    const [ref, inView] = useInView({
        threshold: 0.2,
        triggerOnce: true
    });
    const isMobile = useMediaQuery('(max-width:1024px)');
    const slideIn = useSpring({
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateX(0)' : 'translateX(-100px)',
        config: {
            duration: 800,
            easing: t => -0.5 * (Math.cos(Math.PI * t) - 1),
        },
    });

    useEffect(() => {
        if (inView) {
            console.log('In view!');
        }
    }, [inView]);

    if (isMobile) {
        return <>{children}</>;
    }

    return (
        <animated.section ref={ref} style={slideIn}>
            {children}
        </animated.section>
    );
};
