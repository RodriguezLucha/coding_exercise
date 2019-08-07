#!/usr/bin/env perl
use strict;
use warnings;
use version; our $VERSION = qv('1.0.0');

use Test::More::Behaviour;

sub fib {
    my $n = shift;
    if ( $n == 2 ) { return ( 1, 1 ) }
    my @prev = fib( $n - 1 );
    return ( @prev, $prev[-2] + $prev[-1] );
}

sub assert_fib {
    my ( $num, $expected, $message ) = @_;
    it $message => sub {
        my @got = fib($num);
        is_deeply( \@got, $expected );
    };
    return;
}

describe 'Fibonacci' => sub {
    assert_fib( 10, [ 1, 1, 2, 3, 5, 8, 13, 21, 34, 55 ], "First 10" );
    assert_fib( 5, [ 1, 1, 2, 3, 5 ], "First 5" );
};

done_testing;
1;
