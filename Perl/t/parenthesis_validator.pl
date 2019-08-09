#!/usr/bin/env perl
use strict;
use warnings;
use version; our $VERSION = qv('1.0.0');

use Test::More::Behaviour;

use charnames ':full';

sub is_opener {
    my $str = shift;
    return $str =~
      /[\N{LEFT PARENTHESIS}|\N{LEFT SQUARE BRACKET}|\N{LEFT CURLY BRACKET}]/sxm
      ? 1
      : 0;
}

sub is_closer {
    my $str = shift;
    return $str =~
/[\N{RIGHT PARENTHESIS}|\N{RIGHT SQUARE BRACKET}|\N{RIGHT CURLY BRACKET}]/sxm
      ? 1
      : 0;
}

my %closer_to_opener = (
    ')' => '(',
    ']' => '[',
    '}' => '{',
);

sub is_valid {
    my $str   = shift;
    my @stack = ();

    for my $char ( split //sm, $str ) {
        if ( is_opener($char) ) {
            push @stack, $char;
        }
        else {
            if ( is_closer($char) ) {
                my $last_opener = pop @stack;
                if ( $last_opener ne $closer_to_opener{$char} ) {
                    return 0;
                }
            }
        }
    }
    return scalar(@stack) ? 0 : 1;
}

sub assert_parenthesis {
    my ( $str, $expected, $message ) = @_;
    it $message => sub {
        my $got = is_valid($str);
        is( $got, $expected );
    };
    return;
}

describe 'Parenthesis Validator' => sub {
    assert_parenthesis( '(abcd)', 1, 'valid short' );
    assert_parenthesis( '([]{[dssdfa]adf})[asdfa]{{adf}()}', 1,
        'valid longer' );
    assert_parenthesis( '([sdfs][]}', 0, 'mismatched opener and closer' );
    assert_parenthesis( '[[]()',      0, 'missing closer' );
    assert_parenthesis( '[[]]())',    0, 'extra closer' );
    assert_parenthesis( q{},          1, 'empty string' );
};

done_testing;
1;
