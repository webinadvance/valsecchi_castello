import {Fragment} from 'react';
import {useTranslation} from 'react-i18next';
import Services from './Services';
import {AnimatedSection} from "./AnimatedSection";

const Home = () => {
    const {t} = useTranslation();

    const welcomeMessages = [...Array(100)].filter(
        (_, i) => t(`welcome${i + 1}`) !== `welcome${i + 1}`,
    );

    return (
        <div className="text-center m-auto">
            <AnimatedSection>
                <div
                    id="welcome"
                    className="ch1 uppercase mt-6 text-center m-auto pt-8"
                >
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
            </AnimatedSection>
            <AnimatedSection>
                <Services/>
            </AnimatedSection>
        </div>
    );
};

export default Home;
