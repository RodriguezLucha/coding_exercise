#!/usr/bin/env perl
use strict;
use warnings;
use version; our $VERSION = qv('1.0.0');

use Test::More::Behaviour;
use lib "t";
use BTreeNode;

use feature 'current_sub';

sub range_sum_bst {
    my ( $node, $L, $R ) = @_;
    my $total = 0;

    my $traverse = sub {

        my ( $node, $L, $R ) = @_;

        if ( !$node ) { return; }
        if ( $node->{val} >= $L && $node->{val} <= $R ) {
            $total += $node->{val};
        }
        if ( $node->{left} )  { __SUB__->( $node->{left},  $L, $R ) }
        if ( $node->{right} ) { __SUB__->( $node->{right}, $L, $R ) }
    };

    $traverse->( $node, $L, $R );
    return $total;
}

sub assert_range_sum_bst {
    my ( $tree_ref, $left, $right, $expected, $message ) = @_;

    it $message => sub {
        my $root = BTreeNode->deserialize( @{$tree_ref} );
        my $got  = range_sum_bst( $root, $left, $right );
        is( $got, $expected );
    }
}

describe 'Range sum of binary search tree' => sub {
    assert_range_sum_bst( [ 10, 5, 15, 3, 7, undef, 18 ],
        7, 15, 32, "Example 1" );
    assert_range_sum_bst( [ 10, 5, 15, 3, 7, 13, 18, 1, undef, 6 ],
        6, 10, 23, "Example 2" );
};

done_testing;
1;
