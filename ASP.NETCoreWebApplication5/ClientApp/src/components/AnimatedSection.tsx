import {useInView} from "react-intersection-observer";
import {animated, useSpring} from "react-spring";
import {ReactNode} from "react";

export interface AnimatedSectionProps {
    children: ReactNode;
}

export const AnimatedSection = ({children}: AnimatedSectionProps) => {
    const [ref, inView] = useInView({
        threshold: 0.5,
        triggerOnce: true,
    });

    const slideIn = useSpring({
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateX(0)' : 'translateX(-100px)',
        config: {
            duration: 800,
            easing: t => -0.5 * (Math.cos(Math.PI * t) - 1),
        },
    });

    return (
        <animated.section ref={ref} style={slideIn}>
            {children}
        </animated.section>
    );
};