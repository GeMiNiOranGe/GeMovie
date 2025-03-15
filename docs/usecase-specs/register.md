# Use Case: Register

**Overview**: As a user, I want to create a new account to use the services.

**Actors**: User

**Type**: Primary

**Purpose**: The user wants to register an account.

**Preconditions**:
- The user does not have an account.
- The user wants to create another account.

**Postconditions**:
- Registration Successful:
  - The user has successfully created a new account.
  - The system redirects the user to the main screen.
- Registration Failed:
  - The user remains on the registration page with an error message displayed.

## Main flow:
| Actor Action | System Response |
|:-------------|:----------------|
| 1. The user selects the registration feature. ||
|| 2. The system displays the registration screen. |
| 3. The user selects "Create a new account." ||
|| 4. The system displays the registration screen. |
| 5. The user enters new account information. ||
| 6. The user clicks the "Register" button. ||
|| 7. The system successfully creates the account. |
|| 8. The system displays the home screen. |

## Alternative flows:
None.

## Exception flows:
### Re-enter account information when registration fails:

7a. The system fails to create the account.

7a1. The system displays an error message.

_The Use Case returns to step 4._

### Exiting the registration screen:

5b. The user selects the command to exit the registration screen.

_The Use Case stops._
