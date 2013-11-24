---
layout: post
title: "Install local Jekyll (GitHub pages) on Windows"
date: 2013-11-22
tags: Jekyll Github Ruby
---

## {{ page.title }}

B.S. **EXACT** Versions should been used

1.  Setup Ruby
    - Download: http://dl.bintray.com/oneclick/rubyinstaller/rubyinstaller-1.9.3-p448.exe?direct
    - Install: sure to check the box for adding ruby to your path

2. Setup Ruby DevKit
    - Download: https://github.com/downloads/oneclick/rubyinstaller/DevKit-tdm-32-4.5.2-20111229-1559-sfx.exe
    - Install:
    - cd C:\RubyDevKit
        - ruby dk.rb init
        - ruby dk.rb install`

3. Install Bundler
    - Install:
      - gem install bundler

4. Create file "Gemfile" in the root of the project folder, with content
source 'https://rubygems.org'
gem 'github-pages'

5. In the root of the project folder, run command in console
    - bundle install

6. Downgrade version of pygments gem
    - gem uninstall pygments.rb
    - gem install pygments.rb --version "=0.5.0"

7. Download and install Python 2.7 
    - Download: http://www.python.org/ftp/python/2.7.6/python-2.7.6.msi

8. Run Jekyll
    - jekyll serve