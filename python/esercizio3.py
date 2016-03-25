#!/usr/bin/python

import sys
import glob
import os
import csv


def vowelsNum(elem):
    count = 0
    vowels = 'aeiou'
    for row in elem:
        row.lower()
        for letter in row:
            if letter in vowels:
                count += 1

    return count


def symbolsNum(elem):
    count = 0

    vowels = '?!'
    for row in elem:
        row.lower()

        for letter in row:
            if letter in vowels:
                count += 1

    return count


with open('results.csv', 'w') as csvfile:
    fieldnames = ['linee', 'vocali', 'simboli']
    writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
    writer.writeheader()

    try:
        for filename in glob.glob(os.path.join(sys.argv[1], '*.txt')):
            try:
                with open(filename) as f:
                    elem = f.readlines()
                    writer.writerow({
                        'linee': len(elem),
                        'vocali': vowelsNum(elem),
                        'simboli': symbolsNum(elem)
                    })

            except Exception as e:
                print(e)

    except Exception as e:
        print('Argument not found')
