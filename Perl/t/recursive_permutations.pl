#!/usr/bin/env perl
use strict;
use warnings;
use version; our $VERSION = qv('1.0.0');

use Test::More::Behaviour;

sub permutations {
    my $str = shift;
    if ( length($str) <= 1 ) { return ($str) }

    my @results = ();
    my @arr     = split //sm, $str;
    for my $i ( 0 .. $#arr ) {
        my $char      = $arr[$i];
        my @remaining = ( @arr[ 0 .. $i - 1 ], @arr[ $i + 1 .. $#arr ] );

        my @perms = permutations( join q{}, @remaining );

        for my $p (@perms) {
            push @results, $char . $p;
        }
    }

    return @results;
}

sub assert_permutations {
    my ( $str, $expected, $message ) = @_;
    it $message => sub {
        my @got = permutations($str);
        is_deeply( \@got, $expected );
    };
}

describe 'Permutations' => sub {
    assert_permutations( q{}, [q{}], 'empty string' );
    assert_permutations( 'a', ['a'], 'one character' );
    assert_permutations( 'ab', [ 'ab', 'ba' ], 'two characters' );
    assert_permutations(
        'abc',
        [ 'abc', 'acb', 'bac', 'bca', 'cab', 'cba' ],
        'three characters'
    );
};

done_testing;
1;
