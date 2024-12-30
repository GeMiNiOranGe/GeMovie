<!-- ```
%%{init: {"flowchart": {"defaultRenderer": "elk"}} }%%
classDef ActivityStyle fill:#fff,stroke:#000
class Activity ActivityStyle
``` -->

## Login
```mermaid
flowchart LR
    Start@{ shape: circle }
    End@{ shape: double-circle }
    Fork@{ shape: fork, label: "Fork or Join" }
    EndFork@{ shape: join, label: "Fork or Join" }
    LoginScreenButton(User presses<br/>the login feature)
    LoginScreen(System displays<br/>the login screen)
    BackButton(User presses<br/>back button)
    EnterAccount(User enters<br/>account information)
    LoginButton(User presses<br/>the login button)
    Validate{System<br/>validates<br/>account}
    ValidCase(System displays<br/>the home screen)
    InvalidCase(System displays<br/>an error message)

    Start --> LoginScreenButton
    LoginScreenButton --> LoginScreen
    LoginScreen --> Fork
    Fork --> BackButton
        BackButton --> EndFork
    Fork --> EnterAccount
        EnterAccount --> LoginButton
        LoginButton --> Validate
        Validate -->|Valid| ValidCase
            ValidCase --> EndFork
        Validate -->|Invalid| InvalidCase
            InvalidCase --> LoginScreen
    EndFork --> End
```

## Register
```mermaid
flowchart LR
    Start@{ shape: circle }
    End@{ shape: double-circle }
    Fork@{ shape: fork, label: "Fork or Join" }
    EndFork@{ shape: join, label: "Fork or Join" }
    LoginScreenButton(User presses<br/>the login feature)
    LoginScreen(System displays<br/>the login screen)
    RegisterScreen(System displays<br/>the register screen)
    RegisterScreenButton(User presses<br/>the register feature)
    BackButton(User presses<br/>back button)
    EnterAccount(User enters<br/>account information)
    RegisterButton(User presses<br/>the register button)
    Validate{System<br/>validates<br/>account}
    ValidCase(System displays<br/>the home screen)
    InvalidCase(System displays<br/>an error message)

    Start --> LoginScreenButton
    LoginScreenButton --> LoginScreen
    LoginScreen --> RegisterScreenButton
    RegisterScreenButton --> RegisterScreen
    RegisterScreen --> Fork
    Fork --> BackButton
        BackButton --> EndFork
    Fork --> EnterAccount
        EnterAccount --> RegisterButton
        RegisterButton --> Validate
        Validate -->|Valid| ValidCase
            ValidCase --> EndFork
        Validate -->|Invalid| InvalidCase
            InvalidCase --> RegisterScreen
    EndFork --> End
```

## Personal account management
```mermaid
flowchart LR
    Start@{ shape: circle }
    End@{ shape: double-circle }
    Fork@{ shape: fork, label: "Fork or Join" }
    EndFork@{ shape: join, label: "Fork or Join" }
    ManageAccountScreenButton(User presses the manage account feature)
    ManageAccountScreen(System displays<br/>the manage account screen)
    BackButton(User presses<br/>back button)
    EditAccountButton(User presses<br/>the edit account button)
    EditAccount(User edit account)
    SaveButton(User presses<br/>the save button)
    Validate{System<br/>validates<br/>account}
    InvalidCase(System displays<br/>an error message)

    Start --> ManageAccountScreenButton
    ManageAccountScreenButton --> ManageAccountScreen
    ManageAccountScreen --> Fork
    Fork --> BackButton
        BackButton --> EndFork
    Fork --> EditAccountButton
        EditAccountButton --> EditAccount
        EditAccount --> SaveButton
        SaveButton --> Validate
        Validate -->|Valid| EndFork
        Validate -->|Invalid| InvalidCase
            InvalidCase --> ManageAccountScreen
    EndFork --> End
```

## View detailed content
```mermaid
flowchart LR
    Start@{ shape: circle }
    End@{ shape: double-circle }
    Fork@{ shape: fork, label: "Fork or Join" }
    EndFork@{ shape: join, label: "Fork or Join" }
    DetailScreen(System displays<br/>the detail content)
    BackButton(User presses<br/>back button)
    ViewContent(Users view content)

    Start --> DetailScreen
    DetailScreen --> Fork
    Fork --> BackButton
        BackButton --> EndFork
    Fork --> ViewContent
        ViewContent --> EndFork
    EndFork --> End
```

## Movie review
```mermaid
flowchart LR
    Start@{ shape: circle }
    End@{ shape: double-circle }
    Fork@{ shape: fork, label: "Fork or Join" }
    EndFork@{ shape: join, label: "Fork or Join" }
    BackButton(User presses<br/>back button)
    AddReview(User add<br/>movie reviews)
    SaveButton(User presses<br/>the save button)
    UpdateReview(System updates<br/>user's review)

    Start --> Fork
    Fork --> BackButton
        BackButton --> EndFork
    Fork --> AddReview
        AddReview --> SaveButton
        SaveButton --> UpdateReview
        UpdateReview --> EndFork
    EndFork --> End
```

## Search content
```mermaid
flowchart LR
    Start@{ shape: circle }
    End@{ shape: double-circle }
    SearchScreenButton(User presses<br/>the search feature)
    SearchScreen(System displays<br/>the search screen)
    EnterSearchContent(User enters<br/>search content)
    SearchState{System<br/>search}
    SuccessCase(System returns<br/>search results.)
    FailCase(System returns<br/>a 'not found' message)
    Merge{ }

    Start --> SearchScreenButton
    SearchScreenButton --> SearchScreen
    SearchScreen --> EnterSearchContent
    EnterSearchContent --> SearchState
    SearchState -->|Success| SuccessCase
        SuccessCase --> Merge
    SearchState -->|Fail| FailCase
        FailCase --> Merge
    Merge --> End
```

## View popular movie
```mermaid
flowchart LR
    Start@{ shape: circle }
    End@{ shape: double-circle }
    PopularScreen(System displays<br/>the popular movies)
    ViewContent(Users view content)
    BackButton(User presses<br/>back button)

    Start --> PopularScreen
    PopularScreen --> ViewContent
    ViewContent --> BackButton
    BackButton --> End
```

## View genre list
```mermaid
flowchart LR
    Start@{ shape: circle }
    End@{ shape: double-circle }
    GenreScreen(System displays<br/>the movie genres)
    ViewContent(Users view content)
    BackButton(User presses<br/>back button)

    Start --> GenreScreen
    GenreScreen --> ViewContent
    ViewContent --> BackButton
    BackButton --> End
```

## Remove movie from favorites list
```mermaid
flowchart LR
    Start@{ shape: circle }
    End@{ shape: double-circle }
    Fork@{ shape: fork, label: "Fork or Join" }
    EndFork@{ shape: join, label: "Fork or Join" }
    ManageFavoriteScreenButton(User presses the<br/>manage favorite feature)
    ManageFavoriteScreen(System displays the<br/>manage favorite screen)
    BackButton(User presses<br/>back button)
    DeleteButton(User presses<br/>delete button)
    DeleteState{System<br/>deletes<br/>favorite}
    SuccessCase(System reloads<br/>favorite screen)

    Start --> ManageFavoriteScreenButton
    ManageFavoriteScreenButton --> ManageFavoriteScreen
    ManageFavoriteScreen --> Fork
    Fork --> BackButton
        BackButton --> EndFork
    Fork --> DeleteButton
        DeleteButton --> DeleteState
        DeleteState -->|Success| SuccessCase
            SuccessCase --> EndFork
        DeleteState -->|Fail| ManageFavoriteScreen
    EndFork --> End
```

## Remove movie from watchlist
```mermaid
flowchart LR
    Start@{ shape: circle }
    End@{ shape: double-circle }
    Fork@{ shape: fork, label: "Fork or Join" }
    EndFork@{ shape: join, label: "Fork or Join" }
    ManageWatchlistScreenButton(User presses the watchlist<br/>management feature)
    ManageWatchlistScreen(System displays the watchlist management screen)
    BackButton(User presses<br/>back button)
    DeleteButton(User presses<br/>delete button)
    DeleteState{System deletes<br/>movies from<br/>watchlist}
    SuccessCase(System reloads<br/>watchlist screen)

    Start --> ManageWatchlistScreenButton
    ManageWatchlistScreenButton --> ManageWatchlistScreen
    ManageWatchlistScreen --> Fork
    Fork --> BackButton
        BackButton --> EndFork
    Fork --> DeleteButton
        DeleteButton --> DeleteState
        DeleteState -->|Success| SuccessCase
            SuccessCase --> EndFork
        DeleteState -->|Fail| ManageWatchlistScreen
    EndFork --> End
```
