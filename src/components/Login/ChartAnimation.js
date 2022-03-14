import { useEffect, useRef } from 'react';
import lottie from 'lottie-web';

import chartAnimation from "../../lotties/chart.json";

//  Making the animation responsive
const y = window.matchMedia("(max-width: 992px)");


const ChartAnimation = () => {
    const anime = useRef(null);
    useEffect(() => {
        lottie.loadAnimation({
            container: anime.current,
            renderer: "svg",
            loop: true,
            autoplay: true,
            animationData: chartAnimation,
        });
        return () => lottie.stop();
    }, []);
    return <div style={{ height: 280, width: `${y.matches ? 300 : 500}` }} ref={anime}></div>;
};

export default ChartAnimation;