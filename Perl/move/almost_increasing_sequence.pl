use strict;
use warnings;

sub almostIncreasingSequence {
	my ($seq) = @_;

    my $num_non_increasing = 0;

    if($seq->[0] >= $seq->[1]){
        $num_non_increasing++;
    }

    for(my $i = 1; $i <= scalar(@$seq)-2; $i++ ){

        last if $num_non_increasing > 1;

        my $current = $seq->[$i];
        my $previous = $seq->[$i-1];
        my $next = $seq->[$i+1];

        if($next > $current){
            next;
        }

        $num_non_increasing++;

        if($previous < $next){
            #remove current
            $seq->[$i] = $previous;
        } else {
            #remove next
            $seq->[$i+1] = $current;
            $seq->[$i] = $previous;
        }
    }
    return $num_non_increasing <= 1;
}


print almostIncreasingSequence([1,2,3,99,4,5]);

