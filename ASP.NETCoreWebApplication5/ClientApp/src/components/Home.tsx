import React, {Fragment} from 'react'
import {useTranslation} from 'react-i18next'
import Services from './Services'
import {AnimatedSection} from './AnimatedSection'
import Box from "@mui/material/Box";
import useMediaQuery from "@mui/material/useMediaQuery";

const Home = () => {
    const {t} = useTranslation()
    const isMobile = useMediaQuery('(max-width:1024px)')

    const welcomeMessages = [...Array(100)].filter(
        (_, i) => t(`welcome${i + 1}`) !== `welcome${i + 1}`
    );

    return (
        <Box className="text-center m-auto" id={'welcome'} sx={{maxWidth: isMobile ? "99vw" : "60vw"}}>
            <AnimatedSection>
                <div className="ch1 uppercase mt-6 text-center m-auto pt-8">
                    «{t('home1')}»
                </div>
                {/*             <div className="divider"/>*/}
                <div className={"h2"}>
                    UNO SPAZIO STORICO UNICO IN CENTRO A COMO
                </div>
                <article>
                    {welcomeMessages.map((_, i, arr) => (
                        <Fragment key={i}>
                            <Box sx={{textAlign: isMobile ? "center" : "left"}}>{t(`welcome${i + 1}`)}</Box>
                            {i !== arr.length - 1 && <div className="divider"/>}
                        </Fragment>
                    ))}
                </article>
            </AnimatedSection>
            <AnimatedSection>
                <Services/>
            </AnimatedSection>
        </Box>
    );
}

export default Home
