package BTreeNode;

use strict;
use warnings;
use version; our $VERSION = qv('1.0.0');

use Test::More::Behaviour;
use Data::Dumper;

sub new {
    my $class = shift;
    my $self  = {@_};
    bless $self, $class;
    return $self;
}

sub serialize {
    my $self = shift;
    my @data = ();

    my @node_queue = ($self);
    my $start      = 0;

    while ( $start < @node_queue ) {
        my $node = $node_queue[$start];
        $start += 1;
        if ($node) {
            push @data,       $node->{val};
            push @node_queue, $node->{left};
            push @node_queue, $node->{right};
        }
        else {
            push @data, undef;
        }
    }

    while ( @data && !defined $data[-1] ) {
        pop @data;
    }

    return @data;
}

sub deserialize {
    my $class = shift;
    my @data  = @_;
    if ( !@data ) {
        return undef;
    }

    my @node_list = map { $_ ? BTreeNode->new( val => $_ ) : undef } @data;

    my $offset      = 1;
    my $current_pos = 0;

    while ( $offset < scalar(@data) ) {
        if ( $node_list[$current_pos] ) {
            $node_list[$current_pos]->{left} = $node_list[$offset];
            $offset += 1;
            if ( $offset < scalar(@data) ) {
                $node_list[$current_pos]->{right} = $node_list[$offset];
                $offset += 1;
            }
            else {
                last;
            }
        }
        else {
            next;
        }
        $current_pos += 1;
    }

    return $node_list[0];
}

describe 'BTreeNode' => sub {
    it 'can be created' => sub {
        my $node = BTreeNode->new( val => 1 );
        isa_ok( $node, 'BTreeNode' );
        is( $node->{left},  undef );
        is( $node->{right}, undef );
        is( $node->{val},   1 );
    };
    it 'serializes basic test' => sub {
        my $node_1 = BTreeNode->new( val => 1 );
        my $node_2 = BTreeNode->new( val => 2 );
        my $node_3 = BTreeNode->new( val => 3 );

        $node_1->{left}  = $node_2;
        $node_1->{right} = $node_3;

        my @serialized = $node_1->serialize();
        is_deeply( \@serialized, [ 1, 2, 3 ] );
    };
    it 'serializes with empty spots' => sub {
        my $node_1 = BTreeNode->new( val => 1 );
        my $node_2 = BTreeNode->new( val => 2 );
        my $node_3 = BTreeNode->new( val => 3 );
        my $node_4 = BTreeNode->new( val => 4 );
        my $node_5 = BTreeNode->new( val => 5 );

        $node_1->{left}  = $node_2;
        $node_1->{right} = $node_3;
        $node_3->{left}  = $node_4;
        $node_3->{right} = $node_5;

        my @serialized = $node_1->serialize();
        is_deeply( \@serialized, [ 1, 2, 3, undef, undef, 4, 5 ] );
    };
    it 'deserializes' => sub {
        my @serialized = ( 1, 2, 3, undef, undef, 4, 5 );
        my $root       = BTreeNode->deserialize(@serialized);

        my @serialized_back = $root->serialize();
        is_deeply( \@serialized_back, [ 1, 2, 3, undef, undef, 4, 5 ] );
    }
};

done_testing;
1;
