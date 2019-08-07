#!/usr/bin/env perl
use strict;
use warnings;
use version; our $VERSION = qv('1.0.0');

use Test::More;

sub my_reverse {
    my @str  = split //sm, shift;
    my $low  = 0;
    my $high = scalar(@str) - 1;

    while ( $low < $high ) {
        ( $str[$low], $str[$high] ) = ( $str[$high], $str[$low] );
        $low++;
        $high--;
    }

    return join q{}, @str;
}

sub assert_string_reversed {
    my ( $str, $expected, $message ) = @_;
    my $actual = my_reverse($str);
    is( $actual, $expected, $message );
    return;
}

assert_string_reversed( 'ab',   'ba',   'two character string' );
assert_string_reversed( 'abc',  'cba',  'three character string' );
assert_string_reversed( q{},    q{},    'No character string' );
assert_string_reversed( 'ABCD', 'DCBA', 'Four character string' );

done_testing;
