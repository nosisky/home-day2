#!/usr/bin/env node
//@nosisky
let chalk       = require('chalk'); //require chalk
let clear       = require('clear'); //require clar
let CLI         = require('clui');
let figlet      = require('figlet');
let inquirer    = require('inquirer'); //This prompts user for questions
let Preferences = require('preferences');
let Spinner     = CLI.Spinner;
let GitHubApi   = require('github'); //this is the githup API dependency
let _           = require('lodash'); //lodash
let git         = require('simple-git')();
let touch       = require('touch');
let fs          = require('fs'); //require the node file system for reading and writing file
let files 		= require('./lib/files'); //Path to out file.js
let prefs 		= new Preferences('ginit');
let github 		= new GitHubApi({
  version: '3.0.0'
}); //A new instance of the github API

//This is our Banner text for our application
clear();
console.log(
  chalk.yellow(
    figlet.textSync('Gitrep', { horizontalLayout: 'full' })
  )
);
//Inorder to avoid error we verified if the current directory already has a .git file
if (files.directoryExists('.git')) {
  console.log(chalk.red('Already a git repository!'));
  process.exit(); //quits the application if the current directory already has .git file
}
//This gets the github credential from the user
 function getGithubCredentials(callback) {
  var questions = [
    {//This gets the github username.
      name: 'username',
      type: 'input',
      message: 'Welcome, My name is Gitrep your personal Github API client by Dealwap! \n Let the game begin! \n Enter your Github username or e-mail address:',
      validate: function( value ) {
        if (value.length) {//verify if the input field is not empty
          return true;
        } else {
          return 'Please enter your username or e-mail address';
        }
      }
    },
    {//This gets the github password.
      name: 'password',
      type: 'password',
      message: 'To Authorize you, i need your password \n Enter your password:',
      validate: function(value) {
        if (value.length) { //This verify if an input is given else a re-prompt.
          return true;
        } else {
          return 'Please enter your password';
        }
      }
    }
  ];

  inquirer.prompt(questions).then(callback);
}
//This gets the githb token for us to use in our app
function getGithubToken(callback) {
  var prefs = new Preferences('gitrep');

  if (prefs.github && prefs.github.token) {
    return callback(null, prefs.github.token);
  }

  getGithubCredentials(function(credentials) {
    var status = new Spinner('Authenticating you, please wait...');
    status.start();

    github.authenticate(
      _.extend(
        {
          type: 'basic',
        },
        credentials
      )
    );
 
    github.authorization.create({
      scopes: ['user', 'public_repo', 'repo', 'repo:status'],
      note: 'gitrep, the command-line tool for initalizing Git repos'
    }, function(err, res) {
      status.stop();
      if ( err ) {
        return callback( err );
      }
      if (res.token) {
        prefs.github = {
          token : res.token
        };
        return callback(null, res.token);
      }
      return callback();
    });
  });
}
//If the user details is correct then we go ahead and create the repository.
function createRepo(callback) {
  var argv = require('minimist')(process.argv.slice(2));

  var questions = [
    {
      type: 'input',
      name: 'name',
      message: 'Enter a name for the repository:',
      default: argv._[0] || files.getCurrentDirectoryBase(),
      validate: function( value ) {
        if (value.length) {
          return true;
        } else {
          return 'Please enter a name for the repository';
        }
      }
    },
    {
      type: 'input',
      name: 'description',
      default: argv._[1] || null,
      message: 'Optionally enter a description of the repository:'
    },
    {
      type: 'list',
      name: 'visibility',
      message: 'Public or private:',
      choices: [ 'public', 'private' ],
      default: 'public'
    }
  ];

  inquirer.prompt(questions).then(function(answers) {
    var status = new Spinner('Creating repository...');
    status.start();

    var data = {
      name : answers.name,
      description : answers.description,
      private : (answers.visibility === 'private')
    };

    github.repos.create(
      data,
      function(err, res) {
        status.stop();
        if (err) {
          return callback(err);
        }
        return callback(null, res.ssh_url);
      }
    );
  });
}
//This creates the .gitignore file for us automatically
function createGitignore(callback) {
  var filelist = _.without(fs.readdirSync('.'), '.git', '.gitignore');

  if (filelist.length) {
    inquirer.prompt(
      [
        {
          type: 'checkbox',
          name: 'ignore',
          message: 'Select the files and/or folders you wish to ignore:',
          choices: filelist,
          default: ['node_modules', 'bower_components']
        }
      ]
    ).then(function( answers ) {
        if (answers.ignore.length) {
          fs.writeFileSync( '.gitignore', answers.ignore.join( '\n' ) );
        } else {
          touch( '.gitignore' );
        }
        return callback();
      }
    );
  } else {
    touch('.gitignore');
    return callback();
  }
}
//Sets the repo URL
function setupRepo(url, callback) {
  var status = new Spinner('Setting up the repository...');
  status.start();
//This automates the git function and saves more time for us
  git
    .init()
    .add('.gitignore')
    .add('./*')
    .commit('Initial commit')
    .addRemote('origin', url)
    .push('origin', 'master')
    .then(function(){
      status.stop();
      return callback();
    });
}
//This uses the getGithubToken function within the github Auth function
function githubAuth(callback) {
  getGithubToken(function(err, token) {
    if (err) {
      return callback(err);
    }
    github.authenticate({
      type : 'oauth',
      token : token
    });
    return callback(null, token);
  });
}
//Validates users details and matches with status code
githubAuth(function(err, authed) {
  if (err) {
    switch (err.code) {
      case 401:
        console.log(chalk.red('Couldn\'t log you in. Probably you typed in wrong details.'));
        break;
      case 422:
        console.log(chalk.red('You already have an access token. :('));
        break;
    }
  }
  //If login is successful, execute this
  if (authed) {
    console.log(chalk.green('Sucessfully authenticated! :)'));
    createRepo(function(err, url){
      if (err) {
        console.log('An error has occured :(');
      }
      if (url) {
        createGitignore(function() {
          setupRepo(url, function(err) {
            if (!err) {
              console.log(chalk.green('All done! Hurray!!!'));
            }
          });
        });
      }
    });
  }
});