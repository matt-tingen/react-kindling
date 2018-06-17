# React Kindling

This is an elaboration on `create-react-app` that makes bootstrapping my side projects much simpler.

## Goals

- Abstract basic CRUD functionality
  - Helpers for common use cases

## Non-Goals

Because this project optimizes for DX as much as possible, some concerns are foregone to be addressed if any projects built from this mature.

- Bundle size
- Design

## Features

- Auth with Firebase
- CRUD with Firestore
- Routing with `react-router`
- Styling with `emotion`

## Setup

1.  `git clone git@github.com:matt-tingen/react-kindling.git project-name`
1.  Create firebase project
1.  [Setup firebase project](./SETUP.md) to match `react-starter`
1.  `cd project-name`
1.  `rm -rf .git && git init && git add . && git commit -m"Run built-react-kindling"`
