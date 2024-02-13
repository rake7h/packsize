# Packsize: Monorepo Package Size Stats Tool

## Feature

Packsize offers first-class support for monorepos, providing CLI commands to generate size statistics for all packages within the workspace. It also includes a diff checker to compare size changes between snapshots.

This tool is specifically designed for monorepos, allowing easy monitoring of package sizes across the entire workspace before publishing it.

## Usage

### Installation

```bash
yarn add packsize-cli
```


#### Creating Packsize Configuration

Create a `packsize.config.json` file at the root of your project:

```json
{
 "workspaces":  [
      "packages/*",  
      "helpers/*",  
      "other workspaces",  
      "..."  
   ]  
}
```
### CLI

Add the following commands to the `scripts` section of your root `package.json`:
```json
"scripts": { 
 "packsize:init": "packsize init", 
 "packsize:diff": "packsize diff", 
 "packsize:clean": "packsize clean" 
}
```



|Command | Description | 
|--|--| 
| init |Generates the packsize stats snap file for all packages specified in `packsize.config.json`. | 
| diff | Compares the current snapshot with the previous one to identify size differences. |
| clean | Removes all snapshot files from the workspaces. |

