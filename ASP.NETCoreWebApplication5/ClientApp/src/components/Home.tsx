import {Fragment} from 'react';
import {useTranslation} from 'react-i18next';
import Services from './Services';

const Home = () => {
    const {t} = useTranslation();

    const welcomeMessages = [...Array(100)].filter(
        (_, i) => t(`welcome${i + 1}`) !== `welcome${i + 1}`
    );

    return (
        <>
            <div className="text-center m-auto">
                <section>
                    <div id="welcome" className="ch1 uppercase mt-6 text-center m-auto pt-8">
                        "the most luxurious villa on lake como"
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
                </section>
                <Services/>
            </div>
        </>
    );
};

export default Home;
