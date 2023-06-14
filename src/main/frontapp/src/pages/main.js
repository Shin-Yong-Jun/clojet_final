import "../styles/main.scss";
import Slider from "../components/mainSlider/Slider";
import Carousel1 from "../components/mainCarousol/Carousel1/Carousel1";
import Carousel2 from "../components/mainCarousol/Carousel2/Carousel2";
import Carousel3 from "../components/mainCarousol/Carousel3/Carousel3";

const Main = () => {
    return (
        <main>
            <div className="inner">
                <Slider />
                <div className="empty"></div>
                <Carousel1 />
                <div className="main_banner_box2">
                    <a href="/">
                        <img
                            src={require("../image/clojet-mainfw-middle_banner.png")}
                            alt="middle_banner"
                        />
                    </a>
                </div>
                <div className="empty"></div>
                <Carousel2 />
                <div className="main_banner_box3">
                    <a href="/">
                        <img
                            src={require("../image/clojet-mainfw-foot_banner.png")}
                            alt="foot_banner"
                        />
                    </a>
                </div>
                <div className="empty"></div>
                <Carousel3 />

                <div className="empty"></div>
            </div>
        </main>
    );
};

export default Main;
