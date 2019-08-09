#!/usr/bin/env perl

use strict;
use warnings;
use version; our $VERSION = qv('1.0.0');

use Test::More::Behaviour;
use Data::Dumper;

sub flood_fill {
    my ( $image_ref, $start_row, $start_col, $new_color ) = @_;
    my @image       = @{$image_ref};
    my $start_color = $image[$start_row][$start_col];

    my @queue = ();
    push @queue, [ $start_row, $start_col ];

    my %seen = ();

    my $in_bounds = sub {
        my ( $r, $c ) = @{ shift; };

        my $result =
             $r >= 0
          && $c >= 0
          && $r < @{$image_ref}
          && $c < @{ @{$image_ref}[0] } ? 1 : 0;

        return $result;
    };

    while (@queue) {
        my $current = pop @queue;
        if ( exists $seen{ Dumper($current) } ) { next; }
        $seen{ Dumper($current) } = 1;
        my ( $row, $col ) = @{$current};
        if ( $image[$row][$col] != $start_color ) { next; }
        $image[$row][$col] = $new_color;
        my @children = (
            [ $row + 1, $col ],
            [ $row - 1, $col ],
            [ $row,     $col + 1 ],
            [ $row,     $col - 1 ],
        );
        @children = grep { $in_bounds->($_) } @children;

        foreach my $child (@children) {
            push @queue, $child;
        }
    }

    return @image;
}

describe 'Flood fill' => sub {
    it 'Basic flood fill' => sub {
        my @image = ( [ 1, 1, 1 ], [ 1, 1, 0 ], [ 1, 0, 1 ] );

        my ( $row, $col ) = ( 1, 1 );
        my $new_color = 2;
        my @expected  = ( [ 2, 2, 2 ], [ 2, 2, 0 ], [ 2, 0, 1 ] );
        my @got       = flood_fill( \@image, $row, $col, $new_color );
        is_deeply( \@got, \@expected );
    }

};

done_testing;
1;
