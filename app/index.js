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

  this.indexFile = this.readFileAsString(path.join(this.sourceRoot(), 'index.html'));
};

util.inherits(BaselineGenerator, yeoman.generators.Base);

BaselineGenerator.prototype.askFor = function askFor() {
  var cb = this.async();

  // have Yeoman greet the user.
  console.log(this.yeoman);

  var prompts = [{
    name: 'projectName',
    message: 'Would you like name to this project?'
  }];

  this.prompt(prompts, function (props) {
    this.projectName = props.projectName;

    cb();
  }.bind(this));
};

BaselineGenerator.prototype.createDirLayout = function createDirLayout() {
  this.mkdir('dev');
  this.mkdir('dev/scripts');
  this.mkdir('dev/sass');
  this.mkdir('dev/sass/base');
  this.mkdir('dev/sass/layout');
  this.mkdir('dev/sass/modules');
  this.mkdir('dev/sass/states');
  this.mkdir('dev/assets');
  this.mkdir('dev/assets/images');
  this.mkdir('dev/assets/js');
  this.mkdir('dev/assets/css');
  this.write('dev/index.html', this.indexFile);
};

BaselineGenerator.prototype.sassFiles = function sassFiles() {
  // Main style sheet
  this.copy('styles.scss', 'dev/sass/styles.scss');

  // Base files
  this.copy('_settings.scss', 'dev/sass/base/_settings.scss');
  this.copy('_helpers.scss', 'dev/sass/base/_helpers.scss');
  this.copy('_base.scss', 'dev/sass/base/_base.scss');
  this.copy('_content.scss', 'dev/sass/base/_content.scss');

  // Layout files
  this.copy('_layout.scss', 'dev/sass/layout/_layout.scss');

  // Module files
  this.copy('_buttons.scss', 'dev/sass/modules/_buttons.scss');
  this.copy('_media.scss', 'dev/sass/modules/_media.scss');

  // State files
  this.copy('_display.scss', 'dev/sass/states/_display.scss');
};

BaselineGenerator.prototype.packageFile = function packageFile() {
  this.template('_package.json', 'package.json');
};

BaselineGenerator.prototype.bower = function bower() {
  this.copy('_bower.json', 'bower.json');
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
