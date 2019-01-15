# Solidity Mutation

## Description

Mutant generation for Solidity.

Mutation testing is a method for testing the effectiveness of a test suite. Mutation
testing is simply modifying the code to contain some singular change and then running
a provided test suite against the mutant version of the program. If the test suite
contains a test that is failing that was previously passing on the normal program
version, then that mutant is marked as killed. It the mutant version manages to pass
all tests same as the normal version, then the mutant is considered live.

## Setup

### Install Dependencies

npm install

## Packages Used
* solmeister
* solparse
