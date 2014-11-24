# zero-author #

## Usage ##

Add dependency to your module package.json file like:

```
{
	"name" : "YOUR_MODULE_NAME",
	"zero" : {
		"dependencies" : {
			"author" : "^0.0.1"
		}
	}
}
```

This module will automatically read relier modules's declaration of model, and add author information before creation of model which has property of "isNode:true". 

