#!/usr/bin/env python

import sys


def vowelsNum(elem):

    count = 0

    vowels = 'aeiou'
    for row in elem:
        row.lower()
        for letter in row:
            if letter in vowels:
                count += 1

    return count


def pointNum(elem):
    count = 0

    vowels = '?!'
    for row in elem:

        row.lower()
        for letter in row:
            if letter in vowels:
                count += 1

    return count

try:
    with open(sys.argv[1]) as f:

        elem = f.readlines()

        print("row count = " + str(len(elem)))
        print("vowel count = " + str(vowelsNum(elem)))
        print("point count = " + str(pointNum(elem)))

except Exception:
    print('Errore il file richiesto non esiste')
