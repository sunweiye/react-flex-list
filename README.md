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
  


- type: standard, async
- listData -> new name: data
- listDataItemPreprocessor -> new name: itemPreprocessor
- beforeSearch: Callback to work the form data for searching
- searchTextInFields (old: searchTextFields): support nested object search: 'prizes[]->motivation', 'prizes[]->affiliations[]->name'
- filtersFieldsMap: can be set at the form key (prizes[]->category) or in this props (category: "prizes[]->category") 
- beforeSearch: Deal with the form data
- afterSearch: Deal with the result
- initializationRender: The content that is shown on initialization
(- initialSearch: Removed, use formdata)
- itemRender (Old: renderItem)
- beforeRenderList (Old: onListRender): Deal the list data before rendering
- afterInitialized: Called after the data and the database is prepared
- initializationRender: Content to be shown before the list is initialized
- sortFieldName: The field name in the search form, whose name and value will be used for sorting.
- listContainerSettings
- renderOrder


- Remove "filtersVisibilityOnSearch"

- searchForm: By default does not show the form
    - schema
    - disabled
    - formData
    

Tips:
- in the formData is suggested to have all fields that have default value, this will avoid call the search method twice


!!! The data shown in the list are always based on the search operation. so that the first render, reset actions are also search. Therefore beforeSearch and afterSearch will also be called


Standard List will not support props changing of ListData, because it is designed for a stable list. If the list data should be changed
during the life cycle, you should use async list. 



asyncList: The list that load data from given async loader
simpleList: You have full control on the list. The list simple render the items
