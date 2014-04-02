Afra
====
> Crowdsourcing platform for gene annotation

Install and Run using Docker
----------------------------

```sh
docker build -t afra .
docker run -i -t -p 9292:9292 afra
```

Install and Run without Docker
------------------------------
### Ruby 2.0

`ruby-install`, `chruby` and `chgems` is prescribed so as to facilitate troubleshooting potential issue with Ruby setup. You can use `rbenv`, etc. as well.

Ruby 2.x ships with RubyGems 2.x and Rake 10.x which are required to setup and run Afra. If you install Ruby from your package manager, you may have to install RubyGems and Rake separately.

```
# install ruby-install (https://github.com/postmodern/ruby-install).
$ cd
$ wget -O ruby-install-0.3.0.tar.gz https://github.com/postmodern/ruby-install/archive/v0.3.0.tar.gz
$ tar xvf ruby-install-0.3.0.tar.gz
$ cd ruby-install-0.3.0/
$ sudo make install

# install Ruby 2.0
$ sudo ruby-install ruby

# install chruby (https://github.com/postmodern/chruby)
$ cd
$ wget -O chruby-0.3.7.tar.gz https://github.com/postmodern/chruby/archive/v0.3.7.tar.gz
$ tar xvf chruby-0.3.7.tar.gz
$ cd chruby-0.3.7/
$ sudo make install

# install chgems (https://github.com/postmodern/chgems)
$ cd
$ wget -O chgems-0.3.2.tar.gz https://github.com/postmodern/chgems/archive/v0.3.2.tar.gz
$ tar xvf chgems-0.3.2.tar.gz
$ cd chgems-0.3.2/
$ sudo make install
```

### Perl 5

Should be pre-installed on your system.

### Node 0.11.11

`n` is prescribed to facilitate troubleshooting possible issues with Node setup. You can use `nvm`, etc.

Recent releases of Node ships with npm which is required to setup and run Afra. If you install Node from your package manager, you may have to install npm separately.

```
$ wget -c https://github.com/visionmedia/n/archive/1.2.1.tar.gz
$ tar xvf 1.2.1.tar.gz
$ cd n-1.2.1
$ sudo make install
$ sudo n latest
```

### Postgres 9.3

#### Mac

    $ brew install postgresql

You may have to separately install `libpqxx`.

    $ brew install libpqxx

Then,

    $ createdb `whoami`

#### Linux (Debian)

    $ sudo aptitude install postgresql-9.3
    $ sudo -u postgres createuser --interactive # when asked, make role superuser
    $ sudo -u postgres createdb <name of the role used in previous step>


### Afra

    $ git clone https://github.com/yeban/afra.git
    $ cd afra
    $ rake
    $ ruby -r ./app.rb -e 'App.migrate'
    $ ruby -r ./app.rb -e 'App.gff2jbrowse'
    $ ruby -r ./app.rb -e 'App.register_features'
    $ ruby -r ./app.rb -e 'App.create_tasks'

Copy `env.yml.example` and set `facebook_app_id` and `facebook_app_secret` and `session_secret` (this can be any string).

    $ ruby -r ./app.rb -e 'App.serve'

Contacts
--------
Anurag Priyam <[anurag08priyam@gmail.com]>(mailto:anurag08priyam@gmail.com) [@yeban](//twitter.com/yeban)  
Yannick Wurm ([yannick.poulet.org](http://yannick.poulet.org)) [@yannick__](//twitter.com/yannick__)  
Bruno Vieira <[mail@bmpvieira.com](mailto:mail@bmpvieira.com)> [@bmpvieira](//twitter.com/bmpvieira)

License
-------
Afra is licensed under the [Apache 2.0](https://raw.github.com/yeban/afra/master/LICENSE.txt) license.
