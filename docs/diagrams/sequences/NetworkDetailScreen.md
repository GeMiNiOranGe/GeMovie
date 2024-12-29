## NetworkDetailScreen
```mermaid
sequenceDiagram
    autonumber
    box View network detail
        actor User
        participant MainScreen as NetworkDetailScreen
        participant MainService as NetworkService
        participant VideoDiscoveryService
        participant Web Browser
        participant TvShowDetailScreen
    end

    activate MainScreen
        MainScreen->>+MainScreen: render()
        MainScreen-->>-User: Show loading screen

        MainScreen->>+MainScreen: componentDidMount()
            MainScreen->>+MainService: getDetailAsync(networkId)
            MainService-->>-MainScreen: return network

            MainScreen->>+VideoDiscoveryService: getTvShowByNetworkAsync(networkId)
            VideoDiscoveryService-->>-MainScreen: return tvShows

            MainScreen->>+MainScreen: setState({ network, tvShows })
            deactivate MainScreen
        deactivate MainScreen

        MainScreen->>+MainScreen: render()
        MainScreen-->>-User: Show network details
    deactivate MainScreen

    par Go back to previous screen
        User->>+MainScreen: Press back button
            MainScreen->>+MainScreen: componentWillUnmount()
            MainScreen-->>-User: Show previous screen
        deactivate MainScreen
    and Open external link
        User->>+MainScreen: Press any button<br/>in the external links section
            MainScreen->>+Web Browser: Navigate to web browser
            deactivate Web Browser
        deactivate MainScreen
    and Open tv series detail screen
        User->>+MainScreen: Press on tv series card
            MainScreen->>+TvShowDetailScreen: Navigate to TvShowDetailScreen
            deactivate TvShowDetailScreen
        deactivate MainScreen
    end
```
