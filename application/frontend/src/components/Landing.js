import ian from "../media/ian.jpg";

const SummaryBox = (props) => {
    return (
        <div className="displayContainerRight">
            <h2 className="howdy">Howdy! I'm Ian</h2>
            <ul className="summaryList">
                <li className="summaryListItem">🗽 I'm a developer based in Brooklyn, New York</li>
                <li className="summaryListItem">🗳️ I develop data pipelines, tools, and applications to help progressive
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
            {/* TODO - These should be icons instead of plain text */}
            <div>
                <p className="landingSocialContact">GitHub</p>
                <p className="landingSocialContact">LinkedIn</p>
                <p className="landingSocialContact">Instagram</p>
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