# Use Case: Search Content

**Overview**: As a user, I want to search for movies, TV series, people, companies, networks, etc.

**Actors**: User

**Type**: Primary

**Purpose**: The user wants to search for content.

**Preconditions**: None.

**Postconditions**: The user can view search results and access content details.

## Main flow:
| Actor Action | System Response |
|:-------------|:----------------|
| 1. The user selects the search feature. ||
|| 2. The system displays the search screen. |
| 3. The user enters a search query. ||
|| 4. The system processes the search. |
|| 5. The system returns relevant search results. |

## Alternative flows:
None.

## Exception flows:
### Handling search failures:

4a. The system fails to find matching content.

5a. The system displays a message: "No content found."

_The Use Case returns to step 2._
