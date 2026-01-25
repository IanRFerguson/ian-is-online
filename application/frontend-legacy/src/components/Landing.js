import ian from "../media/ian.jpg";
import github from "../media/social/github.png"
import linkedin from "../media/social/linkedin.png"
import instagram from "../media/social/instagram.png"

const SummaryBox = (props) => {
    return (
        <div className="displayContainerRight">
            <h2 className="howdy">Howdy! I'm Ian</h2>
            <ul className="summaryList">
                <li className="summaryListItem">🗽 I'm a developer based in Brooklyn, New York</li>
                <li className="summaryListItem">🗳️ I engineer data pipelines, tools, and applications to help progressive
                    political organizations build power</li>
                <li className="summaryListItem">🧠 I'm a former academic and love learning about novel ways to model the
                    social brain!</li>
            </ul>
        </div>
    )
}

const Socials = (props) => {
    return (
        <div className="displayContainerLeft">
            <div><img src={ian} className="ian-landed"></img></div>
            <div className="socialMediaLinks">
                <a href="https://github.com/IanRFerguson" target="_blank">
                    <img src={github}></img>
                </a>
                <a href="https://www.linkedin.com/in/ianrferguson/" target="_blank">
                    <img src={linkedin}></img>
                </a>
                <a href="https://www.instagram.com/human_cactus/" target="_blank">
                    <img src={instagram}></img>
                </a>
            </div>
        </div>
    )
}

const Landing = (props) => {
    return (
        <div className="sectionDisplay">
            <div className="landingDisplayContainer">
                <Socials />
                <SummaryBox />
            </div>
        </div>
    )
}

export default Landing;