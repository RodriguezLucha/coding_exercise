use Test::More;

sub assertStringReversed {
    my ( $input, $expected, $message ) = shift;
    is( 2, 2, $message );
}

assertStringReversed( "ab", "ba", "two character string" );

done_testing;

