# Use Case: Personal Account Management

**Overview**: As a user, I want to edit my account information.

**Actors**: User

**Type**: Primary

**Purpose**: The user wants to edit their account information.

**Preconditions**: The user is logged into the system.

**Postconditions**: None.

## Main flow:
| Actor Action | System Response |
|:-------------|:----------------|
| 1. The user selects the personal account management feature. ||
|| 2. The system displays the user account screen. |
| 3. The user clicks the "Edit" button. ||
| 4. The user edits their account information. ||
| 5. The user clicks the "Save" button. ||
|| 6. The system successfully updates the account information. |

## Alternative flows:
None.

## Exception flows:
### Displaying the user account screen when authentication fails:

6a. The system fails to authenticate the account.

6a1. The system displays an error message.

_The Use Case returns to step 2._

### Exiting the account screen:

3b. The user selects the command to exit the account screen.

_The Use Case stops._
