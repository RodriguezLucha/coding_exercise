package my_step_functions_for_feature_fibonacci;

use strict;
use warnings;

use Test::More;    # 'use Test2::V0;' is also supported
use Test::BDD::Cucumber::StepFile;

Given "a fibonacci function", sub {
    return;
};

When qr/asking for the first (\d+) numbers/, sub {
    S->{'count'} = $1;
};

Then qr/the result is "(.+)"/, sub {
    my $expected = $1;
    is( 1, 1 );
};
