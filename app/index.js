'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');


var BaselineGenerator = module.exports = function BaselineGenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);

  this.on('end', function () {
    this.installDependencies({ skipInstall: options['skip-install'] });
  });

  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(BaselineGenerator, yeoman.generators.Base);

BaselineGenerator.prototype.askFor = function askFor() {
  var cb = this.async();

  // have Yeoman greet the user.
  console.log(this.yeoman);

  var prompts = [
    {
      name: 'projectName',
      message: 'What would you like to name this project?'
    },
    {
      type: 'confirm',
      name: 'includeBourbon',
      message: 'Would you like to include Bourbon Sass mixins?',
      default: true
    }
  ];

  this.prompt(prompts, function (props) {
    this.projectName = props.projectName;
    this.includeBourbon = props.includeBourbon;

    cb();
  }.bind(this));
};

BaselineGenerator.prototype.createDirLayout = function createDirLayout() {
  this.mkdir('app');
  this.mkdir('app/scripts');
  this.mkdir('app/sass');
  this.mkdir('app/sass/base');
  this.mkdir('app/sass/layout');
  this.mkdir('app/sass/modules');
  this.mkdir('app/sass/states');
  this.mkdir('app/assets');
  this.mkdir('app/assets/images');
  this.mkdir('app/assets/js');
  this.mkdir('app/assets/css');
};

BaselineGenerator.prototype.sassFiles = function sassFiles() {
  // Main style sheet
  this.copy('styles.scss', 'app/sass/styles.scss');

  // Base files
  this.copy('_settings.scss', 'app/sass/base/_settings.scss');
  this.copy('_helpers.scss', 'app/sass/base/_helpers.scss');
  this.copy('_base.scss', 'app/sass/base/_base.scss');
  this.copy('_content.scss', 'app/sass/base/_content.scss');

  // Layout files
  this.copy('_layout.scss', 'app/sass/layout/_layout.scss');

  // Module files
  this.copy('_buttons.scss', 'app/sass/modules/_buttons.scss');
  this.copy('_media.scss', 'app/sass/modules/_media.scss');

  // State files
  this.copy('_display.scss', 'app/sass/states/_display.scss');
};

BaselineGenerator.prototype.indexFile = function indexFile() {
  this.template('_index.html', 'app/index.html');
};

BaselineGenerator.prototype.packageFile = function packageFile() {
  this.template('_package.json', 'package.json');
};

BaselineGenerator.prototype.bower = function bower() {
  this.template('_bower.json', 'bower.json');
};

BaselineGenerator.prototype.git = function git() {
  this.copy('gitignore', '.gitignore');
};

BaselineGenerator.prototype.jshint = function jshint() {
  this.copy('jshintrc', '.jshintrc');
};

BaselineGenerator.prototype.editorConfig = function editorConfig() {
  this.copy('editorconfig', '.editorconfig');
};

BaselineGenerator.prototype.gruntfile = function gruntfile() {
  this.template('Gruntfile.js');
};

BaselineGenerator.prototype.gemFile = function gemFile() {
  this.template('Gemfile');
};
