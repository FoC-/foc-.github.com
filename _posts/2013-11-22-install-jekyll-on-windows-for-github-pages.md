---
layout: post
title: "Install Jekyll on Windows for GitHub pages"
date: 2013-11-22
tags: Jekyll Github Ruby
is:
    commentsEnabled: true
---

# {{ page.title }}

This is short guide or how to install GitHub pages on local environment. In result we will get almost same packages and infrustructure as on the GitHub servers. Why "almost"? Because "pygments" - package for code colorising in versions after 0.5.0 is required Python 3.3. Python 3.3 have strange behavior on windows or bug(but it is still not fixed) with pathes to folders. So **EXACT** Versions should been used.

<!-- more -->

### Setup Ruby
First of all we need to [Download](http://dl.bintray.com/oneclick/rubyinstaller/rubyinstaller-1.9.3-p448.exe?direct) and install Ruby. During instalation be sure to check the box to **add ruby to your path**

### Setup Ruby DevKit
Now we need to install [Ruby Development Kit](https://github.com/downloads/oneclick/rubyinstaller/DevKit-tdm-32-4.5.2-20111229-1559-sfx.exe). Unpack it to any folder for exapmle to ```C:\RubyDevKit``` then execute commands in console.

``` bat
cd C:\RubyDevKit
ruby dk.rb init
ruby dk.rb install
```
> If something went wrong, validate your Ruby installation, most likely you don't have configure PATH variable to Ruby folder.

### Install Bundler
Next step is install bundler so we will be able to download all packages for GitHub Pages at once.

``` bat
gem install bundler
```

### Create bundler's reference file.
Create file with name "Gemfile" in the root of the project folder. Content of the "Gemfile" should be:

``` text
source 'https://rubygems.org'
gem 'github-pages'
```

### Bundle install
In the root of the project folder, run command in console

``` bat
bundle install
```

### Pygments installation - Downgrade pygments
This two steps are only for windows users who would like to use pygments as code colorizer. Package pygments 0.5.4 is required Python 3.3 which working incorrectly on windows systems. So lets downgrade version of pygments which was compatible with Python 2.7.

``` bat
gem uninstall pygments.rb
gem install pygments.rb --version "=0.5.0"
```
> Note that if you want to update packages by bundler, then you will need to fix this after each update.

### Pygments installation - Install Python
This step is only required, if you want to use code colorizer pygments. You need to [download](http://www.python.org/ftp/python/2.7.6/python-2.7.6.msi) Python 2.7 and install it. After installation add path to folder with Python into your system PATH variable.

1. Hold Win and press Pause.
2. Click Advanced System Settings.
3. Click Environment Variables.
4. Append ```;C:\python27``` to the Path variable. There is NO tarailing backslash. ```;``` - is separator and required before new path.

> After modifing PATH variable, restart all console windows.

### Run Jekyll

``` bat
jekyll serve
```
> If some generating errors is occurs, try to restart console window or validate your Pygments installation.

### Congratulations!

When everything is fine and Jekyll is serve for you, your site is availible by address <a href="http://localhost:4000/" target="_blank">http://localhost:4000/</a>
