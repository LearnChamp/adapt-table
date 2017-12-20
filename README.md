# adapt-table 
A presentation component that displays a table. Each table cell can contain text and / or a graphic. For better mobile support, the table can have a fixed width. Users can pan the table horizontally. 

![adapt-table](https://github.com/LearnChamp/sharedAssets/blob/master/assets/adapt-table.gif?raw=true)   

## Installation
To install the component with the [Adapt CLI](https://github.com/adaptlearning/adapt-cli), run the following from the command line:  
`adapt install adapt-table`

Alternatively, this component can also be installed by adding the following line of code to the *adapt.json* file:  
`"adapt-table": "*"`  
Then running the command:  
`adapt install`  
(This second method will reinstall all plug-ins listed in *adapt.json*.)  

Use the [Plug-in Manager](https://github.com/adaptlearning/adapt_authoring/wiki/Plugin-Manager) to use this component in the Adapt authoring tool.

## Settings Overview
A properly formatted JSON is available in *example.json*
  
### Row / Column as headings
Use the `_rowHeaderIndexes` and `_colHeaderIndexes` attributes to set a row or column as a heading. Multiple indexes must be seperated with `,`.
```json
"_rowHeaderIndexes": "0,4",
"_colHeaderIndexes": "0",
```

### Table min width
You may define a min width for the table in pixel.   
`_minWidth`    

### Rows
Each row can have a css class and a list of cells.  

#### Cells

##### column / row span 
Wrapps html [colspan](https://www.w3schools.com/tags/att_td_colspan.asp) and [rowspan](https://www.w3schools.com/tags/att_td_rowspan.asp) attribute.  

##### text / graphic 
Text and or graphic content of the table cell. 

### Fixed colum width 
**Example:** Set's the second column to 200 pixel.
```json
{
    "_column": 1,
    "_width": 200
}
```

## Limitations
No Accessibility support.  

----------------------------
**Author / maintainer:** [LearnChamp](https://github.com/LearnChamp)  
**Cross-platform coverage:** Chrome, Chrome for Android, Firefox (ESR + latest version), Edge 12, IE 11, Safari iOS 9+10, Safari OS X 9+10, Opera    
