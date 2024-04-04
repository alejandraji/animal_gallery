
## Context

> We’d like you to improve a small application that shows a gallery view of items and allows users to add new items. We’ve provided a starting point for this application that has several problems with it, both from a usability and a coding standards standpoint. We expect you’ll need to change both client and server code to accomplish this exercise.
>
> The finished application must:
> - Allow users to add and delete items (Name & description are required fields)
> - Have item changes appear right away
> - Notify users upon a successful action
> - Alert users to errors
> - Indicate to users when data is loading or processing
>
> It would be nice if the finished application (ie: if you have time):
> - Allows users to edit items
> - Is mobile responsive

## Description

This PR adds support for new use cases including deleting and editing animal information.

Components were reorganized in the frontend so that logic was better scoped to related components. For example, the logic around HTTP calls was encapsulated in api.tsx. Another example is how what was once `addAnimal` in app.tsx, became `onSubmit` in `AnimalFormModal` (formerly `AddAnimal`). Since a lot of the frontend actions involved manipulating the state of the list of animals, I created a custom hook that initializes the list from the backend and exposes state functions for manipulating that state. The form was refactored to use React state variables so that new animals would show up immediately. In order to make the app responsive, I used flexbox. For "alerting", I iterated on `successfullyAdded` to instead be two kinds of state variables representing error and success messages themselves instead of whether something got successfully added.

Much of the changes in the backend mirror what was done on the frontend. Logic implemented in datastore.tsx is similar to that of `useAnimals` except instead of manipulating a react state variable, a file of JSON-encoded animal data is being manipulated. To avoid collisions based on name, I added a naive identifier on the backend of `id` which gets incremented at create time based on the maximum ID at the time.

## Did you add tests?

If I had more time, I would have created tests.

## Not Yet Implemented

- Use an actual database for the backend
- More fluid cards that expand with content
- More UI polish on the modal
- Better controller (route handler) error responses in app.ts. All caught errors are considered 400 when that's not true. eg. using 404s, etc
  - It might make sense to break up some datastore logic so that calls are more granular
- Apply a pattern similar to `useAnimals` where HTTP calls intersect with react state variables to make pending states more readily available
