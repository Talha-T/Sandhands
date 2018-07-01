# Sandhands
Expressive Javascript Sanitation, Zero Dependencies.

[Documentation](https://l1lith.github.io/Sandhands/)

## Example Usage
```
import {sanitize, valid, details} from 'sandhands'

valid(12, String) // returns false
sanitize(12, String) // throws error with message "Invalid Type"
details(12, String) // returns ["Invalid Type"]
```
