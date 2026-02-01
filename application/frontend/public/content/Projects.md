## WFP 🤝 NYC
Using publicly available election data, I built an interactive Choropleth map to display the percentage of votes that Kamala Harris earned on the Working Families Party line in New York City. Flask serves the map, and Google Cloud Run hosts the web application in the cloud.
- ![wfp-nyc](../assets/projects/wfp-nyc.jpeg)
- Tags: Category 1
- Badges:
- Buttons:
  - Source Code [https://github.com/IanRFerguson/wfp-nyc]
  - See the App [https://wfp-nyc-817201868807.us-central1.run.app]

## NBA Player Analytics
This is an end-to-end ELT pipeline - player data is extracted from the NBA API, loaded into BigQuery, and transformed using dbt. The resulting models offer player- and team-specific trends, including matchup statistics and gametime conditions (home vs. away, back to backs. etc.)
- ![nba-dag](../assets/projects/nba-dag.png)
- Tags: Category 1
- Badges:
- Buttons:
  - Source Code [https://github.com/IanRFerguson/player-analytics]

## Predicting Whiskey Ratings
Built off of a single Google Sheet, this project models my preferences in whiskey based on a number of dimensions (style, ABV, flavor notes, etc). The raw input is fed into BigQuery, where dbt transforms and standardizes it before passing it off to Google Dataproc to run Spark MLlib predictive models.
- ![whiskey-ml](../assets/projects/whiskey-ml-v2.png)
- Tags: Category 1
- Badges:
- Buttons:
  - Source Code [https://github.com/IanRFerguson/whiskey-ml]