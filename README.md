# HumanaPlanPredict

## Inspiration
For most people, selecting the right insurance plan today is still a very confusing as well as daunting task. Most people have no idea what their out of pocket cost will be after picking a plan. Moreover, most people make no changes to their insurance plan for years after their initial selection even though their medical condition might have changed and a new plan might be less expensive for them.

## What it does
PlanPredict allows a person to select the cheapest insurance plan based on their out of pocket cost. It does this by predicting a person’s future medical usage based on their previous claim history and calculating the associated out of pocket cost for each insurance plan.

## How we built it
Initially, we ingested the data into an AWS S3 instance and we then queried it with Aws Athena and Tableau (to visualize and make sense of the data). Then we built a Jupyter notebook and did our machine learning manipulations and predictions there. We are outputting the model predictions in a MongoDB store and querying them from there. For the UI we built an angularjs app.

## Challenges we ran into
Healthcare data is incredibly complex to navigate, clean and extract useful information out of. Lack of medical expertise slowed us down in understanding the various correlations of the data. On the technical side, the main challenge was working with a dataset of this size.

## Accomplishments that we're proud of
The main accomplishment is being able to finish a working prototype in such a short amount of time and in such a complicated space.

## What we learned
We learned many new insights related to medical data, terminology, how insurance plans calculate their costs. On the technical side, we learned how to manipulate large datasets, to prepare data for running a machine learning model on and then presenting the results back to an end-user.

## What's next for Plan Predict
The next step for Plan Predict is doing more problem analysis and understanding if this is a real business need for Humana and if we would be able to solve this complicated problem if this would produce meaningful results for the insurance company. Our product should work when people are switching plans between insurance companies as well.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

