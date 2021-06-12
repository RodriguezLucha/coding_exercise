def duplicate_zeros(arr):

    # Loop through each element in the array, skipping the last
    # since that's a special case where if its a zero that needs
    # to be duplicated then nothing would happen anyway.
    # There is also a O(n) solution where iterate from the end instead
    # This approach is O(n^2)
    second_to_last_index = len(arr) - 2
    i = 0
    while i <= second_to_last_index:  # O(n)

        current_element = arr[i]

        if current_element == 0:
            # Make space for the new zero by right shifting
            # everything by 1 until getting to to current index
            right_shift_until(i, arr)  # O(n)
            # Set next element to zero
            arr[i + 1] = 0
            # Go to next element (now shifted over)
            i = i + 2
        else:
            # Nothing was shift on non zero element, standard array iteration
            i = i + 1


def right_shift_until(i, arr):
    # Right shift by 1, until getting to i but not including i
    last_index = len(arr) - 1
    while last_index > i:
        arr[last_index] = arr[last_index - 1]
        last_index = last_index - 1


def test_multiple_zeros():
    input = [1, 0, 2, 3, 0, 4, 5, 0]
    expected = [1, 0, 0, 2, 3, 0, 0, 4]
    duplicate_zeros(input)
    assert input == expected


def test_no_zeros():
    input = [1, 2, 3]
    expected = [1, 2, 3]
    duplicate_zeros(input)
    assert input == expected
