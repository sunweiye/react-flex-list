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
- filtersFieldsMap: The mapping of filters to property in the item data. It can be a string for single value mapping or
an object for single or multi value(s) mapping. The object has the following properties:
  - hasMultiValues: boolean value, default is false. It defines if the field is a multi value field
  - name: string, define the mapped property name. If it is not set, the filter name will be used. 

  The supported mapping types:
  - Default mapping: By default, the filter name will be used as the property name for searching
  - Single value mapping: Use the filter name as key and the the property name as value. Fox example `"categories": "mainCategory"` will
  check the property `mainCategory` by filtering of `categories`.
  - Multi value mapping: If the property is a multi value array, the mapping must be configured as an object, which has 
  the `hasMultiValues` key.
  - Nested property mapping: The nested object is also supported. An arrow operator `->` should used for the nested object
  property, for example, `"categories": "mainCategory->id"` will use `id` property value in `mainCategory` for the filtering.
  
