use Test::More;

sub permutations {
    my $str = shift;
    return [ 'ab', 'ba' ];
}

sub assertPermutations {
    my ( $str, $expected ) = @_;
    my $actual = permutations($str);
    is_deeply( $actual, $expected, $message );
}

# assertPermutations( 'abc', [ 'abc', 'acb', 'bac', 'bca', 'cab', 'cba' ] );
assertPermutations( 'ab', [ 'ab', 'ba' ], 'two character string' );

done_testing;
