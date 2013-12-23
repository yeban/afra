desc 'Setup'
task 'setup' do
  puts 'installing gems ...'
  system("gem install --file Gemfile")

  puts
  puts 'installing perl modules ...'
  %x{
done_message () {
    if [ $? == 0 ]; then
        echo " done."
        if [ "x$1" != "x" ]; then
            echo $1;
        fi
    else
        echo " failed." $2
    fi
}

# log information about this system
(
    echo '============== System information ====';
    set -x;
    lsb_release -a;
    uname -a;
    sw_vers;
    system_profiler;
    grep MemTotal /proc/meminfo;
    echo; echo;
);

echo -n "Installing Perl prerequisites ..."
if ! ( perl -MExtUtils::MakeMaker -e 1 >/dev/null 2>&1); then
    echo;
    echo "WARNING: Your Perl installation does not seem to include a complete set of core modules.  Attempting to cope with this, but if installation fails please make sure that at least ExtUtils::MakeMaker is installed.  For most users, the best way to do this is to use your system's package manager: apt, yum, fink, homebrew, or similar.";
fi;
( set -x;
  bin/cpanm -v --notest -l $PWD/.extlib/ --installdeps . < /dev/null;
  bin/cpanm -v --notest -l $PWD/.extlib/ --installdeps . < /dev/null;
  set -e;
  bin/cpanm -v --notest -l $PWD/.extlib/ --installdeps . < /dev/null;
);
done_message "" "As a first troubleshooting step, make sure development libraries and header files for Zlib are installed and try again.";
  }

  puts
  puts 'installing bower packages ...'
  system("which bower > /dev/null 2>&1") or system ("npm install -g bower")
  system("bower install")

  puts
  puts 'AMDfying jquery.ui ...'
  system("which jqueryui-amd > /dev/null 2>&1") or system ("npm install -g jqueryui-amd")
  system("jqueryui-amd www/lib/jquery.ui")
end

task default: :setup
