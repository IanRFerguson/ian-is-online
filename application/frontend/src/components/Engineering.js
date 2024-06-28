const Engineering = (props) => {
    return (
        <div className="sectionDisplay">
            <div className="sectionHeader">
                <h1>Engineering Portfolio</h1>
            </div>
            <div className="engineeringContent">
                {/* Player Analytics */}
                <div className="engineeringBlock">
                    <h3>Knicks Player Analytics</h3>
                    <ul>
                        <li>Raw player data is extracted from the NBA API and loaded into BigQuery using a custom Python connector</li>
                        <li>Using dbt, data is quality tested and modeled into useful summary metrics</li>
                        <li>The source code is hosted in a Docker image, managed in the cloud with Terraform, and orchestrated with Prefect</li>
                    </ul>
                    <p>
                        <a href="https://github.com/IanRFerguson/player-analytics" target="_blank">
                            View it on Github
                        </a>
                    </p>
                </div>

                {/* Klondike */}
                <div className="engineeringBlock">
                    <h3>Klondike</h3>
                    <p>
                        Klondike offers a suite of database connectors powered by Polars. These tools are
                        optimized for efficiency using the Rust-speedups native to Polars in conjunction with
                        PyArrow for serialized data loading. This is a "just for fun" exercise, but has snuck
                        its way into several professional project where scale was a meaningful factor.
                    </p>
                    <p>
                        <a href="https://github.com/IanRFerguson/klondike" target="_blank">
                            View it on Github
                        </a>
                    </p>
                </div>

                {/* NBA PPG */}
                <div className="engineeringBlock">
                    <h3>NBA PPG Full-Stack Application</h3>
                    <p>
                        Are you picking up on a theme? This is a full-stack web application that
                        extracts and loads data from the NBA API, minimally transforms it, and presents
                        it to the end user in the form a D3.js interactive chart.
                    </p>
                    <p>
                        <a href="https://github.com/IanRFerguson/nba-ppg" target="_blank">
                            View it on Github
                        </a>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Engineering;