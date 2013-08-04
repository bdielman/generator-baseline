/*global describe, beforeEach, it*/
'use strict';

var path    = require('path');
var helpers = require('yeoman-generator').test;


describe('baseline generator', function () {
  beforeEach(function (done) {
    helpers.testDirectory(path.join(__dirname, 'temp'), function (err) {
      if (err) {
        return done(err);
      }

      this.app = helpers.createGenerator('baseline:app', [
        '../../app'
      ]);
      done();
    }.bind(this));
  });

  it('creates expected files', function (done) {
    var expected = [
      // add files you expect to exist here.
      '.jshintrc',
      '.editorconfig',
      '.gitignore',
      'Gruntfile.js',
      'Gemfile',
      'package.json',
      'bower.json',
      'dev/index.html',
      'dev/sass/styles.scss',
      'dev/sass/base/_settings.scss',
      'dev/sass/base/_helpers.scss',
      'dev/sass/base/_base.scss',
      'dev/sass/base/_content.scss',
      'dev/sass/layout/_layout.scss',
      'dev/sass/modules/_buttons.scss',
      'dev/sass/modules/_media.scss',
      'dev/sass/states/_display.scss'
    ];

    helpers.mockPrompt(this.app, {
      'projectName': 'Test Project'
    });
    this.app.options['skip-install'] = true;
    this.app.run({}, function () {
      helpers.assertFiles(expected);
      done();
    });
  });
});
