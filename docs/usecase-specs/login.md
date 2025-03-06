# Use Case: Login

**Overview**: As a user, I want to log in to use the services.

**Actors**: User

**Type**: Primary

**Purpose**: The user wants to log in to the application.

**Preconditions**: A user account has been created.

**Postconditions**:
- Login Successful:
    + The user successfully logs in to the application.
    + The system redirects the user to main screen.
- Login Failed:
    + The user remains on the login page with an error message displayed.

## Main flow:
| Actor Action | System Response |
|:-------------|:----------------|
| 1. The user selects the login feature. ||
|| 2. The system displays the login screen. |
| 3. The user enters account information. ||
| 4. The user clicks the "login" button. ||
|| 5. The system successfully authenticates the account. |
|| 6. The system displays the home screen. |

## Alternative flows:
None.

## Exception flows:
### Re-enter account information when authentication fails:

5a. The system fails to authenticate the account.

5a1. The system displays an error message.

_The Use Case returns to step 2_

### Exiting the login screen:

3b. The user selects the command to exit the login screen.

_The Use Case stops._
