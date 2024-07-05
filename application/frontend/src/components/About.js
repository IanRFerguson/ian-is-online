const About = (props) => {
    return (
        <div className="sectionDisplay">
            <div className="sectionHeader">
                <h1>About Me</h1>
            </div>
            <div className="AIATT">
                {/* Brief autobiography */}
                <div className="aboutMeBox">
                    <p></p>
                </div>

                {/* Nonprofit tech */}
                <div className="aboutMeBox">
                    <p>
                        I transitioned into nonprofit tech in the summer of 2022 with the goal of
                        leveraging my skill set to progress social causes I care about. Since then,
                        I have worked as an engineer at organizations such as The Movement Cooperative and
                        Movement Labs where I develop automated software and data solutions to supercharge
                        the tech infrastructure of the progressive left. For a broad overview of my job experience
                        and technical expertise, please <a href="https://drive.google.com/file/d/1z3EP3uJBIPxLH6DTsqZgpmlKmkYLP-CO/view?usp=sharing">see my resume</a>.
                    </p>
                </div>

                {/* Outside of tech */}
                <div className="aboutMeBox">
                    <p></p>
                </div>
            </div>
        </div>
    )
}

export default About;