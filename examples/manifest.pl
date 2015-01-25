# create app-cache manifest from local dir
# reflects optional version# argument

use strict;
use File::Find;
use Perl::Version;
use Data::Dumper;

my $manifest_file = q~manifest.php~;
my ($vstring, $version, $cache);
my $syntax = qq~\nSYNTAX:\n\t$0 [123]\noptional digit modifies column of version #.#.#\ndefault is 3rd column\n\n~;
my @cache;
my $extras = q~

NETWORK:
sse.php

FALLBACK:
*.mp3 media/Violin.mp3
/ error.htm

~;

my @exclude = qw(~$ ^\. .pl$ ^_ TAGS \.appcache$ \.php$ \.mp[34]$);
my $re_str = '(' . join('|', @exclude) . ')';
my $re = qr($re_str);

##############################

# ARGS VALID?
if (@ARGV) {
    if ($ARGV[0] =~ m~^[1-3]$~) {
        $ARGV[0]--;
    } else {
        die $syntax;
    }
}

# MANIFEST EXISTS?
if (-s $manifest_file) {
    open F, $manifest_file;
    $cache = join('', <F>);
    # MANIFEST IS VERSIONED?
    if ($cache =~ m~^#.+version ([\d.]+)~mi) {
        $version = Perl::Version->new($1);
        $version->increment($ARGV[0] || 2);
        $vstring = $version->stringify;
    }
} else {
    $vstring = '1.0.0';
}

find(\&consider_file, qw(.));

open F, ">$manifest_file";

print F 
    "<?php header('Content-type: text/cache-manifest'); ?>\n",
    "CACHE MANIFEST\n", 
    "# application version $vstring\n\n",
    "CACHE:\n",
    @cache,
    $extras;

sub consider_file {
    /$re/ && return; # ignore certain files
    -d && return; # ignore directories
    $File::Find::name =~ s~^\./~~;
    push @cache, $File::Find::name . "\n";
}
