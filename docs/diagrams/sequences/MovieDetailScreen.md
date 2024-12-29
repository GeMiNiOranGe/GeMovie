## MovieDetailScreen
```mermaid
sequenceDiagram
    autonumber
    box View movie detail
        actor User
        participant MainScreen as MovieDetailScreen
        participant MainService as MovieService
        participant GenreDetailScreen
        participant Web Browser
        participant CollectionDetailScreen
        participant PersonDetailScreen
        participant ReviewDetailScreen
        participant CompanyDetailScreen
    end

    activate MainScreen
        MainScreen->>+MainScreen: render()
        MainScreen-->>-User: Show loading screen

        MainScreen->>+MainScreen: componentDidMount()
            MainScreen->>+MainService: getDetailAsync(movieId)
            MainService-->>-MainScreen: return movie

            MainScreen->>+MainScreen: setState({ movie })
            deactivate MainScreen
        deactivate MainScreen

        MainScreen->>+MainScreen: render()
        MainScreen-->>-User: Show movie details
    deactivate MainScreen

    par Go back to previous screen
        User->>+MainScreen: Press back button
            MainScreen->>+MainScreen: componentWillUnmount()
            MainScreen-->>-User: Show previous screen
        deactivate MainScreen
    and Play trailer
        User->>+MainScreen: Press on "Play trailer" button
            MainScreen->>+MainScreen: toggleModal()
            MainScreen-->>-User: Show movie trailer modal
        deactivate MainScreen
    and Open genre detail screen
        User->>+MainScreen: Press on genre chip
            MainScreen->>+GenreDetailScreen: Navigate to GenreDetailScreen
            deactivate GenreDetailScreen
        deactivate MainScreen
    and Open external link
        User->>+MainScreen: Press any button<br/>in the external links section
            MainScreen->>+Web Browser: Navigate to web browser
            deactivate Web Browser
        deactivate MainScreen
    and Open collection detail screen
        User->>+MainScreen: Press on "belong to collection" panel
            MainScreen->>+CollectionDetailScreen: Navigate to CollectionDetailScreen
            deactivate CollectionDetailScreen
        deactivate MainScreen
    and Open cast detail screen
        User->>+MainScreen: Press on cast card
            MainScreen->>+PersonDetailScreen: Navigate to PersonDetailScreen
            deactivate PersonDetailScreen
        deactivate MainScreen
    and Open movie detail screen
        User->>+MainScreen: Press on movie card<br/>in recommendation section
            create participant NewMainScreen as MovieDetailScreen
            MainScreen->>NewMainScreen: <<create>>
        deactivate MainScreen
    and Open review detail screen
        User->>+MainScreen: Press on review card
            MainScreen->>+ReviewDetailScreen: Navigate to ReviewDetailScreen
            deactivate ReviewDetailScreen
        deactivate MainScreen
    and Open company detail screen
        User->>+MainScreen: Press on company card
            MainScreen->>+CompanyDetailScreen: Navigate to CompanyDetailScreen
            deactivate CompanyDetailScreen
        deactivate MainScreen
    end
```
