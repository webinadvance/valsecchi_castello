import {animated, useInView} from '@react-spring/web'
import {ReactNode, useEffect} from "react";
import {useMediaQuery} from "@mui/material";

export interface AnimatedSectionProps {
    children: ReactNode;
}

export const AnimatedSection = ({children}: AnimatedSectionProps) => {
    // @ts-ignore
    const [ref, inView] = useInView(
        // @ts-ignore
        () => ({
            from: {
                opacity: 0,
                y: 100,
            },
            to: {
                opacity: 1,
                y: 0,
            },
            once: true,
            threshold: 0.2,
        })
    )
    const isMobile = useMediaQuery('(max-width:1024px)');
    /*    const slideIn = useSpring({
            /!*        opacity: inView ? 1 : 0,
                    transform: inView ? 'translateX(0)' : 'translateX(-100px)',*!/
            config: {
                duration: 800,
                easing: t => -0.5 * (Math.cos(Math.PI * t) - 1),
            },
        });*/

    useEffect(() => {
        if (inView) {
            console.log('In view!');
        }
    }, [inView]);

    if (isMobile) {
        return <>{children}</>;
    }

    return (
        <animated.section ref={ref} style={inView}>
            {children}
        </animated.section>
    );
};
