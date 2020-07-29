# Citrus Systems Test

Everything written purely for the needs of the test

## About

Part of the task about actual form submit isn't delivered. Reason for this is that I've improvised in order to show the loading animation.
Requests as the task was given would be finished before any animation could be displayed, so I made it lats 3 seconds before a modal pops in with information of the "request's" success. This notification modal has a button that leads to the same(but changed) modal displaying information about failure.

Simply deleting a line in code that stops submit ("event.preventDefault()") would result in form delivery.
