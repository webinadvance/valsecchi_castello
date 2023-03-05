import {Fragment, useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import Services from './Services';
import {useInView} from 'react-intersection-observer';
import {animated, useSpring} from 'react-spring';

const Home = () => {
    const {t} = useTranslation();
    const [ref, inView] = useInView({
        threshold: 0.5,
        triggerOnce: true,
    });

    useEffect(() => {
        console.log(`inView changed to ${inView}`);
    }, [inView]);

    const welcomeMessages = [...Array(100)].filter(
        (_, i) => t(`welcome${i + 1}`) !== `welcome${i + 1}`
    );

    const slideIn = useSpring({
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateX(0)' : 'translateX(-100px)',
        config: {
            duration: 800,
            easing: t => -0.5 * (Math.cos(Math.PI * t) - 1),
        },
    });


    return (
        <>
            <div className="text-center m-auto">
                <animated.section ref={ref} style={slideIn}>
                    <div id="welcome" className="ch1 uppercase mt-6 text-center m-auto pt-8">
                        «{t('home1')}»
                    </div>
                    <div className="divider"/>
                    <article>
                        {welcomeMessages.map((_, i, arr) => (
                            <Fragment key={i}>
                                <div>{t(`welcome${i + 1}`)}</div>
                                {i !== arr.length - 1 && <div className="divider"/>}
                            </Fragment>
                        ))}
                    </article>
                </animated.section>
                <Services/>
            </div>
        </>
    );
};

export default Home;
