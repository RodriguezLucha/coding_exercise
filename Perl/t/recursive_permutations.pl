use Test::More;

sub permutations {
    my $str = shift;
    if ( length($str) <= 1 ) { return [$str] }

    my @results = ();
    my @arr     = split //sm, $str;
    for ( my $i = 0 ; $i <= $#arr ; $i++ ) {
        my $char      = $arr[$i];
        my @remaining = ( @arr[ 0 .. $i - 1 ], @arr[ $i + 1 .. $#arr ] );

        my $perms = permutations( join '', @remaining );

        for my $p ( @{$perms} ) {
            push @results, $char . $p;
        }
    }

    return \@results;
}

sub assertPermutations {
    my ( $str, $expected, $message ) = @_;
    my $got = permutations($str);
    is_deeply( $got, $expected, $message );
}

assertPermutations( '',  [''],  'empty string' );
assertPermutations( 'a', ['a'], 'one character' );
assertPermutations( 'ab', [ 'ab', 'ba' ], 'two characters' );
assertPermutations(
    'abc',
    [ 'abc', 'acb', 'bac', 'bca', 'cab', 'cba' ],
    'three characters'
);

done_testing;
