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
      'app/index.html',
      'app/sass/styles.scss',
      'app/sass/base/_settings.scss',
      'app/sass/base/_helpers.scss',
      'app/sass/base/_base.scss',
      'app/sass/base/_content.scss',
      'app/sass/layout/_layout.scss',
      'app/sass/modules/_buttons.scss',
      'app/sass/modules/_media.scss',
      'app/sass/states/_display.scss'
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
