#!/usr/bin/python

import time


class Storico:

    def __init__(self):
        self.lista = []
        self.minStorico = 1000
        self.maxStorico = -1000

    def memorizza(self, rilevazione):
        self.lista.append(rilevazione)

        self.maxStorico = max(self.maxStorico, rilevazione.maxValue)
        self.minStorico = min(self.minStorico, rilevazione.minValue)

    def printLista(self):
        for e in self.lista:
            print(e)

    "doc string"
    def minimoStorico(self):
        return self.minStorico

    "doc string"
    def massimoStorico(self):
        return self.maxStorico


class RilevazioneTemperatura:

    def __init__(self, minValue, maxValue):

        self.data = time.strftime("%d/%m/%Y")
        self.minValue = minValue
        self.maxValue = maxValue

    def __str__(self):

        msg = self.data + ': min: '
        msg += str(self.minValue) + ' max: ' + str(self.maxValue)

        return msg

storico = Storico()

storico.memorizza(RilevazioneTemperatura(6, 12))
storico.memorizza(RilevazioneTemperatura(11, 14))
storico.memorizza(RilevazioneTemperatura(9, 12))
storico.memorizza(RilevazioneTemperatura(3, 5))
storico.memorizza(RilevazioneTemperatura(2, 4))

storico.printLista()
print(storico.massimoStorico())
print(storico.minimoStorico())
