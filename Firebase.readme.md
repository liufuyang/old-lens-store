# Firebase

## Command used:
```
firebase login
firebase init hosting
firebase init emulators
firebase init hosting:github

# too add multiple project/environments
firebase use --add

firebase emulators:start

firebase deploy --only hosting

firebase hosting:channel:deploy test1 --expires 1h
firebase hosting:channel:list
firebase hosting:channel:delete test1
```