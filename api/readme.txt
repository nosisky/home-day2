This is a simple command line application that uses github API to create a github repository for you automatically.
So what gitrep will do is create a Git repository in the current folder, create a remote repository—we’ll be using Github for this—and then add it as a remote. Then it will provide a simple interactive “wizard” for creating a .gitignore file, add the contents of the folder and push it up to the remote repository. It might not save you hours, but it’ll remove some of the initial friction when starting a new project.

Installation Steps

    Clone this repo
    cd api
    Run npm install
    run gitrep <repo-name> <your repo description>


Included  Automated Tasks
   it automatically Runs git init
    it automatically Runs Add the .gitignore file
    it automatically Runs Add the remaining contents of the working directory
    it automatically Runs Perform an initial commit
    it automatically Runs Add the newly-created remote repository
    it automatically Runs Push the working directory up to the remote

