# Creating Responsive Sidedrawer

## 'rsf' 

is the command to generate boiler plate

## Notes

Created responsive mobile design using the side drawer functional component

Positioned side drawer at higher z index so that it is above the backdrop

Look over classes in CSS because of issues with adding inline styling earlier


## Accessing State
 Because of asnych, do not access state directly, better to use previous state like below:

```  sideDrawerToggleHandler = () => {
    this.setState((prevState) =>{
      return {showSideDrawer: !prevState.showSideDrawer}
    })
  }
```