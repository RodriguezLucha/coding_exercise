use strict;
use warnings;
use Test::More;

sub myReverse {
    my @str  = split( //, shift );
    my $low  = 0;
    my $high = scalar(@str) - 1;

    while ( $low < $high ) {

        ( $str[$low], $str[$high] ) = ( $str[$high], $str[$low] );

        $low++;
        $high--;
    }

    return join( '', @str );
}

sub assertStringReversed {
    my ( $str, $expected, $message ) = @_;
    my $actual = myReverse($str);
    is( $actual, $expected, $message );
}

assertStringReversed( "ab",   "ba",   "two character string" );
assertStringReversed( "abc",  "cba",  "three character string" );
assertStringReversed( "",     "",     "No character string" );
assertStringReversed( "ABCD", "DCBA", "No character string" );

done_testing;
