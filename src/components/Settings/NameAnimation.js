import { useEffect, useRef } from 'react';
import lottie from 'lottie-web';

import nameAnimation from '../../lotties/name.json';

const NameAnimation = () => {
    const anime = useRef(null);
    useEffect(() => {
        lottie.loadAnimation({
            container: anime.current,
            renderer: "svg",
            loop: true,
            autoplay: true,
            animationData: nameAnimation,
        });
        return () => lottie.stop();
    }, []);
    return <div style={{ height: 100, width: 200 }} ref={anime}></div>;
};

export default NameAnimation;