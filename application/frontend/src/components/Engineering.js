import Carousel from "react-multi-carousel"
import "react-multi-carousel/lib/styles.css";

import nba_dbt from "../media/nba_dbt.png"
import klondike_sf from "../media/klondike_sf.jpeg"
import nba_ppg from "../media/nba_ppg.png"
import glmx from "../media/glmx.png"
import california from "../media/census.png"


const Portfolio = (props) => {
    const responsive = {
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 1,
            slidesToSlide: 1 // optional, default to 1.
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 1,
            slidesToSlide: 1 // optional, default to 1.
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1,
            slidesToSlide: 1 // optional, default to 1.
        }
    };

    const carousel_display = <Carousel
        swipeable={false}
        draggable={false}
        showDots={true}
        responsive={responsive}
        ssr={true} // means to render carousel on server-side.
        infinite={true}
        autoPlay={true}
        autoPlaySpeed={10000}
        keyBoardControl={true}
        customTransition="all .5"
        transitionDuration={1000}
        containerClass="carousel-container"
        dotListClass="custom-dot-list-style"
        itemClass="carousel-item-padding-40-px"
    >
        <div className="engineeringCarouselItem">
            <h3>Knicks Player Analytics</h3>
            <p>
                <a href="https://github.com/IanRFerguson/player-analytics" target="_blank">
                    View it on Github
                </a>
            </p>
            <p>
                A full-scale ELT pipeline that ingests data from the NBA API into
                BigQuery using a custom Python client. The raw data is then transformed
                using into player summary models using dbt. All of this is orchestrated in
                Prefect, and the cloud resources are managed in version control with Terraform.
            </p>
            <img src={nba_dbt} className="engineeringCarouselImage"></img>
        </div>
        <div className="engineeringCarouselItem">
            <h3>Klondike</h3>
            <p>
                <a href="https://github.com/IanRFerguson/klondike" target="_blank">
                    View it on Github
                </a>
            </p>
            <p>
                Klondike offers a suite of database connectors powered by Polars. These tools are
                optimized for efficiency using the Rust-speedups native to Polars in conjunction with
                PyArrow for serialized data loading. This is a "just for fun" exercise, but has snuck
                its way into several professional project where scale was a meaningful factor.
            </p>
            <img src={klondike_sf} className="engineeringCarouselImage"></img>
        </div>
        <div className="engineeringCarouselItem">
            <h3>GLM Express</h3>
            <p>
                <a href="https://github.com/IanRFerguson/glm-express/tree/main" target="_blank">
                    View it on Github
                </a>
            </p>
            <p>
                GLM Express is an automated solution to modeling subject- and group-level
                neuroimaging data. All you need is a valid BIDS project and you can fully customize
                your contrasts, output types, and visualizations. One of my first engineering projects!
            </p>
            <img src={glmx} className="engineeringCarouselImage"></img>
        </div>
        <div className="engineeringCarouselItem">
            <h3>NBA PPG Full-Stack Application</h3>
            <p>
                <a href="https://github.com/IanRFerguson/nba-ppg" target="_blank">
                    View it on Github
                </a>
            </p>
            <p>
                Are you picking up on a theme? This is a full-stack web application that
                extracts and loads data from the NBA API, minimally transforms it, and presents
                it to the end user in the form a D3.js interactive chart.
            </p>
            <img src={nba_ppg} className="engineeringCarouselImage"></img>
        </div>
        <div className="engineeringCarouselItem">
            <h3>US Census API</h3>
            <p>
                <a href="https://github.com/IanRFerguson/us-census-api" target="_blank">
                    View it on Github
                </a>
            </p>
            <p></p>
            <img src={california} className="engineeringCarouselImage"></img>
        </div>
    </Carousel>;

    return carousel_display
}

const Engineering = (props) => {
    return (
        <div className="sectionDisplay">
            <div className="sectionHeader">
                <h1>Engineering Portfolio</h1>
            </div>
            <div class="engineeringContent">
                <Portfolio />
            </div>
        </div>
    )
}

export default Engineering;