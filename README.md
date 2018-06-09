# react-flex-list 

**A React component to render a flexible list with search and pagination.**
The react-flex-list provide an integrated solution for list 

## Related packages
- react-jsonschema-form
- react-paginate
- alasql

## Demo & Development server
`
npm start
`
A development server with support of hot loader will be started at [http://localhost:8080/](http://localhost:8080/)

## How to use it
### Configurations
- filtersFieldsMap: The mapping of filters to property in the item data. Fox example `"categories": "mainCategory"` will
 check the property `mainCategory` by filtering of `categories`. The property of type object or array is also
 supported, an arrow operator `->` should used for the object property, for example, `"categories": "mainCategory->id"`
 will use `id` property value in `mainCategory` for the filtering. 
